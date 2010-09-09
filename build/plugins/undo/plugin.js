/**
 * undo,redo manager for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("undo", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        arrayCompare = KE.Utils.arrayCompare,
        UA = S.UA,
        Event = S.Event;
    if (!KE.UndoManager) {
        (function() {
            /**
             * 当前编辑区域状�?，包括html与�?择区�?
             * @param editor
             */
            function Snapshot(editor) {
                var contents = editor._getRawData(),selection = contents && editor.getSelection();
                //内容html
                this.contents = contents;
                //选择区域书签标志
                this.bookmarks = selection && selection.createBookmarks2(true);
            }


            S.augment(Snapshot, {
                /**
                 * 编辑状�?间是否相�?
                 * @param otherImage
                 */
                equals:function(otherImage) {
                    var thisContents = this.contents,
                        otherContents = otherImage.contents;
                    if (thisContents != otherContents)
                        return false;
                    var bookmarksA = this.bookmarks,
                        bookmarksB = otherImage.bookmarks;

                    if (bookmarksA || bookmarksB) {
                        if (!bookmarksA || !bookmarksB || bookmarksA.length != bookmarksB.length)
                            return false;

                        for (var i = 0; i < bookmarksA.length; i++) {
                            var bookmarkA = bookmarksA[ i ],
                                bookmarkB = bookmarksB[ i ];

                            if (
                                bookmarkA.startOffset != bookmarkB.startOffset ||
                                    bookmarkA.endOffset != bookmarkB.endOffset ||
                                    !arrayCompare(bookmarkA.start, bookmarkB.start) ||
                                    !arrayCompare(bookmarkA.end, bookmarkB.end)) {
                                return false;
                            }
                        }
                    }

                    return true;
                }
            });


            /**
             * 键盘输入做延迟处�?
             * @param s
             * @param fn
             * @param scope
             */
            function BufferTimer(s, fn, scope) {
                this.s = s;
                this.fn = fn;
                this.scope = scope || window;
                this.bufferTimer = null;
            }

            S.augment(BufferTimer, {
                run:function() {
                    if (this.bufferTimer) {
                        clearTimeout(this.bufferTimer);
                        this.bufferTimer = null;
                    }
                    var self = this;

                    this.bufferTimer = setTimeout(function() {
                        self.fn.call(self.scope);
                    }, this.s);
                }
            });
            var LIMIT = 30;


            /**
             * 通过编辑器的save与restore事件，编辑器实例的历史栈管理，与键盘监控
             * @param editor
             */
            function UndoManager(editor) {
                //redo undo history stack
                /**
                 * 编辑器状态历史保�?
                 */
                this.history = [];
                this.index = 0;
                this.editor = editor;
                this.bufferTimer = new BufferTimer(500, this.save, this);
                this._init();
            }

            var editingKeyCodes = { /*Backspace*/ 8:1, /*Delete*/ 46:1 },
                modifierKeyCodes = { /*Shift*/ 16:1, /*Ctrl*/ 17:1, /*Alt*/ 18:1 },
                navigationKeyCodes = { 37:1, 38:1, 39:1, 40:1 },// Arrows: L, T, R, B
                zKeyCode = 90,
                yKeyCode = 89;


            S.augment(UndoManager, {
                /**
                 * 监控键盘输入，buffer处理
                 */
                _keyMonitor:function() {
                    var self = this,editor = self.editor,doc = editor.document;
                    Event.on(doc, "keydown", function(ev) {
                        var keycode = ev.keyCode;
                        if (keycode in navigationKeyCodes
                            || keycode in modifierKeyCodes
                            )
                            return;
                        //ctrl+z，撤�?
                        if (keycode === zKeyCode && (ev.ctrlKey || ev.metaKey)) {
                            editor.fire("restore", {d:-1});
                            ev.halt();
                            return;
                        }
                        //ctrl+y，重�?
                        if (keycode === yKeyCode && (ev.ctrlKey || ev.metaKey)) {
                            editor.fire("restore", {d:1});
                            ev.halt();
                            return;
                        }
                        editor.fire("save", {buffer:1});
                    });
                },

                _init:function() {
                    var self = this,editor = self.editor;
                    //外部通过editor触发save|restore,管理器捕获事件处�?
                    editor.on("save", function(ev) {
                        if (ev.buffer)
                        //键盘操作�?��缓存
                            self.bufferTimer.run();
                        else {
                            //其他立即save
                            self.save();
                        }
                    });
                    editor.on("restore", this.restore, this);
                    self._keyMonitor();
                    //先save�?��,why??
                    //self.save();
                },

                /**
                 * 保存历史
                 */
                save:function() {
                    //前面的历史抛�?
                    if (this.history.length > this.index + 1)
                        this.history.splice(this.index + 1, this.history.length - this.index - 1);

                    var self = this,
                        editor = self.editor,
                        last = self.history.length > 0 ? self.history[self.history.length - 1] : null,
                        current = new Snapshot(self.editor);

                    if (!last || !last.equals(current)) {
                        if (self.history.length === LIMIT) {
                            self.history.shift();
                        }
                        self.history.push(current);
                        this.index = self.history.length - 1;
                        editor.fire("afterSave", {history:self.history,index:this.index});
                    }
                },

                /**
                 *
                 * @param ev
                 * ev.d �?.向前撤销 �?1.向后重做
                 */
                restore:function(ev) {
                    var d = ev.d,self = this,editor = self.editor,
                        snapshot = self.history.length > 0 ? self.history[this.index + d] : null;
                    if (snapshot) {
                        editor._setRawData(snapshot.contents);
                        if (snapshot.bookmarks)
                            self.editor.getSelection().selectBookmarks(snapshot.bookmarks);
                        else if (UA.ie) {
                            // IE BUG: If I don't set the selection to *somewhere* after setting
                            // document contents, then IE would create an empty paragraph at the bottom
                            // the next time the document is modified.
                            var $range = this.editor.document.body.createTextRange();
                            $range.collapse(true);
                            $range.select();
                        }
                        this.index += d;
                        editor.fire("afterRestore", {
                            history:self.history,
                            index:this.index
                        });
                        editor.notifySelectionChange();
                    }
                }
            });


            var TripleButton = KE.TripleButton,RedoMap = {
                "redo":1,
                "undo":-1
            };

            /**
             * 工具栏重做与撤销的ui功能
             * @param editor
             * @param text
             */
            function RestoreUI(editor, text, title, contentCls) {
                var self = this;
                this.editor = editor;
                self.title = title;
                this.text = text;
                this.contentCls = contentCls;
                this._init();
            }

            S.augment(RestoreUI, {
                _init:function() {
                    var self = this,editor = self.editor;
                    self.el = new TripleButton({
                        contentCls:self.contentCls,
                        //text:self.text,
                        title:self.title,
                        container:editor.toolBarDiv
                    });
                    this.el.set("state", TripleButton.DISABLED);
                    /**
                     * save,restore完，更新工具栏状�?
                     */
                    editor.on("afterSave", this._respond, this);
                    editor.on("afterRestore", this._respond, this);

                    /**
                     * 触发重做或撤�?��作，都是restore，方向不�?
                     */
                    self.el.on("offClick", function() {
                        editor.fire("restore", {
                            d:RedoMap[self.text]
                        });
                    });
                },

                _respond:function(ev) {
                    var self = this,history = ev.history,
                        index = ev.index;
                    self.updateUI(history, index);
                },

                updateUI:function(history, index) {
                    if (this.text == "undo") {
                        if (index > 0 && history.length > 0) {
                            this.el.set("state", TripleButton.OFF);
                        } else {
                            this.el.set("state", TripleButton.DISABLED);
                        }
                    } else if (this.text == "redo") {
                        if (index < history.length - 1) {
                            this.el.set("state", TripleButton.OFF);
                        } else {
                            this.el.set("state", TripleButton.DISABLED);
                        }
                    }
                }
            });
            KE.UndoManager = UndoManager;
            KE.RestoreUI = RestoreUI;
        })();
    }

    editor.addPlugin(function() {

        /**
         * 编辑器历史中央管�?
         */
        new KE.UndoManager(editor);

        /**
         * 撤销工具栏按�?
         */
        new KE.RestoreUI(editor, "undo", "撤销", "ke-toolbar-undo");
        /**
         * 重做工具栏按�?
         */
        new KE.RestoreUI(editor, "redo", "重做", "ke-toolbar-redo");
    });


});

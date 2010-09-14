/**
 * simple overlay for kissy editor using lazyRun
 * @author yiminghe@gmail.com
 * @refer http://yiminghe.javaeye.com/blog/734867
 */
KISSY.Editor.add("overlay", function() {
    // 每次实例都要载入!
    //console.log("overlay loaded!");
    var KE = KISSY.Editor,
        S = KISSY,
        UA = S.UA,
        focusManager = KE.focusManager,
        Node = S.Node,
        Event = S.Event,
        DOM = S.DOM,
        mask ,
        mask_iframe,
        d_iframe,
        dialogMarkUp = "<div class='ke-dialog' " +
            "style='width:" +
            "@width@" +
            "'>" +
            "<div class='ke-hd'>" +
            "<span class='ke-hd-title'>" +
            "@title@" +
            "</span>"
            + "<span class='ke-hd-x'>" +
            "<a class='ke-close' href='#'>X</a>" +
            "</span>"
            + "</div>" +
            "<div class='ke-bd'>" +
            "</div>" +
            "<div class='ke-ft'>" +
            "</div>" +
            "</div>",
        focusMarkup = "<a " +
            "href='#' " +
            "class='ke-focus' " +
            "style='" +
            "width:0;" +
            "height:0;" +
            "margin:0;" +
            "padding:0;" +
            "overflow:hidden;" +
            "outline:none;" +
            "font-size:0;'" +
            "></a>",
        noVisibleStyle = {
            "left":"-9999px",
            top:"-9999px"
        };
    //全局的不要重写
    if (KE.SimpleOverlay) return;

    function Overlay() {
        var self = this;
        Overlay.superclass.constructor.apply(self, arguments);
        self._init();
    }


    Overlay.init = function() {
        var body = document.body,maskStyle = {
            "width": "100%",
            "height": DOM.docHeight() + "px",
            "opacity": 0.4
        };
        S.mix(maskStyle, noVisibleStyle);

        /**
         * 遮罩层
         */
        mask = new Node("<div class=\"ke-mask\">&nbsp;</div>").appendTo(body);
        mask.css(maskStyle);


        if (UA.ie && UA.ie == 6) {
            /**
             * 窗口垫片-shim
             */
            d_iframe = new Node("<" + "iframe class='ke-dialog-iframe'" +
                "></iframe>").appendTo(body);
            /**
             * 遮罩层垫片
             */
            mask_iframe = new Node("<" + "iframe class='ke-mask'" +
                "></iframe>").appendTo(body);
            S.all([mask_iframe[0],d_iframe[0]]).css(maskStyle);
        }
        Overlay.init = null;
    };


    Overlay.ATTRS = {
        title:{value:""},
        width:{value:"450px"},
        visible:{value:false},
        //帮你管理焦点
        focusMgr:{value:true},
        mask:{value:false},
        draggable:{value:true}
    };

    S.extend(Overlay, S.Base, {
        _init:function() {
            var self = this;
            self._createEl();
            var el = self.el;

            /**
             * 窗口显示与隐藏
             */
            self.on("afterVisibleChange", function(ev) {
                var v = ev.newVal;
                if (v) {
                    if (typeof v == "boolean") {
                        self.center();
                    } else el.offset(v);
                    self.fire("show");
                } else {
                    el.css(noVisibleStyle);
                    self.fire("hide");
                }
            });


            /**
             * 关联编辑器焦点保留与复原
             */
            if (self.get("focusMgr")) {
                self._initFocusNotice();
                self.on("afterVisibleChange", self._editorFocusMg, self);
            }


            /**
             * 键盘快捷键注册
             */
            self.on("afterVisibleChange", function(ev) {
                var v = ev.newVal;
                if (v) {
                    self._register();
                } else {
                    self._unregister();
                }
            });


            if (UA.ie === 6) {
                /**
                 * ie6 窗口垫片同步
                 */
                self.on("show", function() {
                    var bw = el.width(),
                        bh = el.height();
                    d_iframe.css({
                        width: bw + "px",
                        height: bh + "px"
                    });
                    d_iframe.css(el.offset());
                });
                self.on("hide", function() {
                    d_iframe.css(noVisibleStyle);
                });
            }

            if (self.get("mask")) {
                /**
                 * 遮罩层与ie6遮罩垫片同步
                 */
                self.on("show", function() {
                    S.all([mask[0],mask_iframe && mask_iframe[0]]).css({"left":"0px","top":"0px"});
                });
                self.on("hide", function() {
                    S.all([mask[0],mask_iframe && mask_iframe[0]]).css(noVisibleStyle);
                });
            }

        },
        _register:function() {
            var self = this;
            Event.on(document, "keydown", self._keydown, self);
            //mask click support
            if (mask) {
                mask.on("click", self.hide, self);
            }
        },
        //esc keydown support
        _keydown:function(ev) {
            //esc
            if (ev.keyCode == 27) {
                this.hide();
                //停止默认行为，例如取消对象选中
                ev.halt();
            }
        },
        _unregister:function() {
            var self = this;
            Event.remove(document, "keydown", self._keydown, self);
            if (mask) {
                mask.detach("click", self.hide, self);
            }
        },
        _createEl:function() {
            //just manage container
            var self = this,el = self.get("el");
            if (!el) {
                //also gen html
                el = new Node(dialogMarkUp.replace(/@width@/, self.get("width")).replace(/@title@/,
                    self.get("title"))).appendTo(document.body);
                var head = el.one(".ke-hd"),id = S.guid("ke-overlay-head-");
                self.body = el.one(".ke-bd");
                self.foot = el.one(".ke-ft");
                self._close = el.one(".ke-close");
                self._title = head.one("h1");
                self._close.on("click", function(ev) {
                    ev.preventDefault();
                    self.hide();
                });


                /**
                 *  是否支持标题头拖放
                 */
                if (self.get("draggable")) {
                    head[0].id = id;
                    var drag = new KE.Drag({
                        node:el,
                        handlers:{
                            id:head
                        }
                    });
                    if (UA.ie === 6) {
                        drag.on("move", function() {
                            d_iframe.offset(el.offset());
                        });
                    }
                }
            }

            self.set("el", el);
            //expose shortcut
            self.el = el;
            //初始状态隐藏
            el.css(noVisibleStyle);
        },

        center:function() {
            var el = this.el,
                bw = el.width(),
                bh = el.height(),
                vw = DOM.viewportWidth(),
                vh = DOM.viewportHeight(),
                bl = (vw - bw) / 2 + DOM.scrollLeft(),
                bt = (vh - bh) / 2 + DOM.scrollTop();
            if ((bt - DOM.scrollTop()) > 200) bt -= 150;
            el.css({
                left: bl + "px",
                top: bt + "px"
            });
        },

        _prepareShow:function() {
            Overlay.init();
        },

        _getFocusEl:function() {
            var self = this;
            if (self._focusEl) {
                return self._focusEl;
            }
            //焦点管理，显示时用a获得焦点
            self._focusEl = new Node(focusMarkup).appendTo(self.el);
            return self._focusEl;
        },

        _initFocusNotice:function() {
            var self = this,f = self._getFocusEl();
            f.on("focus", function() {
                self.fire("focus");
            });
            f.on("blur", function() {
                self.fire("blur");
            });
        },
        
        /**
         * 焦点管理，弹出前记住当前的焦点所在editor
         * 隐藏好重新focus当前的editor
         */
        _editorFocusMg:function(ev) {
            var self = this,
                editor = self._focusEditor,
                v = ev.newVal;
            //将要出现
            if (v) {
                //保存当前焦点editor
                self._focusEditor = focusManager.currentInstance();
                editor = self._focusEditor;
                //聚焦到当前窗口
                self._getFocusEl()[0].focus();
                var input = self.el.one("input");
                if (input) {
                    setTimeout(function() {
                        //ie 不可聚焦会错哦 disabled ?
                        try {
                            input[0].focus();
                            input[0].select();
                        } catch(e) {
                        }
                        //必须延迟！选中第一个input
                    }, 0);
                } else {
                    /*
                     * IE BUG: If the initial focus went into a non-text element (e.g. button),
                     * then IE would still leave the caret inside the editing area.
                     */
                    if (UA.ie && editor) {
                        var $selection = editor.document.selection,
                            $range = $selection.createRange();
                        if ($range) {
                            if (
                            //修改ckeditor，如果单纯选择文字就不用管了
                            //$range.parentElement && $range.parentElement().ownerDocument == editor.document
                            //||
                            //缩放图片那个框在ie下会突出浮动层来
                                $range.item && $range.item(0).ownerDocument == editor.document) {
                                var $myRange = document.body.createTextRange();
                                $myRange.moveToElementText(self.el._4e_first()[0]);
                                $myRange.collapse(true);
                                $myRange.select();
                            }
                        }
                    }
                }

            }
            //将要隐藏
            else {
                editor && editor.focus();
            }
        },
        _realShow : function(v) {
            this.set("visible", v || true);
        },
        show:function(v) {
            this._prepareShow(v);
        },
        hide:function() {
            this.set("visible", false);
        }});
    KE.Utils.lazyRun(Overlay.prototype, "_prepareShow", "_realShow");

    KE.SimpleOverlay = Overlay;
});

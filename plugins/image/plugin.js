/**
 * insert image for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("image", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        Node = S.Node,
        DOM = S.DOM,
        Event = S.Event,
        TYPE_IMG = 'image',
        BubbleView = KE.BubbleView,
        Overlay = KE.SimpleOverlay;
    //!TODO 需要重构，flashsupport ,image 类似，再抽离？
    if (!KE.ImageInserter) {
        (function() {

            var checkImg = function (lastElement) {
                return lastElement._4e_ascendant(function(node) {
                    return node._4e_name() === 'img' && (!/(^|\s+)ke_/.test(node[0].className));
                }, true);
            },
                labelStyle = "<label><span style='color:#0066CC;font-weight:bold;'>";

            function ImageInserter(cfg) {
                ImageInserter.superclass.constructor.call(this, cfg);
                this._init();
            }

            var TripleButton = KE.TripleButton,
                bodyHtml = "<div>" +
                    "<p>" +
                    labelStyle + "图片网址： " +
                    "</span><input class='ke-img-url' style='width:230px' value='http://'/></label>" +
                    "</p>" +
                    "<p style='margin:5px 0'>" +
                    labelStyle + "高度： " +
                    "</span><input class='ke-img-height' style='width:90px' value='自动'/> px </label> &nbsp;" +
                    labelStyle + "宽度： " +
                    "</span><input class='ke-img-width' style='width:90px' value='自动'/> px </label>" +
                    "</p>" +
                    "<p>" +
                    labelStyle + "对齐： " +
                    "</span><select class='ke-img-align'>" +
                    "<option value=''>无</option>" +
                    "<option value='left'>左对齐</option>" +
                    "<option value='right'>右对齐</option>" +
                    "</select></label>" +
                    "</p>" +
                    "</div>",
                footHtml = "<button class='ke-img-insert'>确定</button> <button class='ke-img-cancel'>取消</button>";

            ImageInserter.ATTRS = {
                editor:{}
            };
            var contextMenu = {
                "图片属性":function(editor) {
                    var selection = editor.getSelection(),
                        startElement = selection && selection.getStartElement(),
                        flash = checkImg(startElement),
                        flashUI = editor._toolbars[TYPE_IMG];
                    if (flash) {
                        flashUI.show(null, flash);
                    }
                }
            };
            S.extend(ImageInserter, S.Base, {
                _init:function() {
                    var self = this,
                        editor = self.get("editor"),
                        toolBarDiv = editor.toolBarDiv,
                        myContexts = {};
                    self.editor = editor;
                    self.el = new TripleButton({
                        contentCls:"ke-toolbar-image",
                        title:"图片属性",
                        container:toolBarDiv
                    });
                    self.el.on("offClick", self.show, self);
                    Event.on(editor.document, "dblclick", self._dblclick, self);
                    KE.Utils.lazyRun(self, "_prepare", "_real");
                    editor._toolbars = editor._toolbars || {};
                    editor._toolbars[TYPE_IMG] = self;
                    if (contextMenu) {
                        for (var f in contextMenu) {
                            (function(f) {
                                myContexts[f] = function() {
                                    contextMenu[f](editor);
                                }
                            })(f);
                        }
                    }
                    KE.ContextMenu.register(editor.document, {
                        rules:[checkImg],
                        width:"120px",
                        funcs:myContexts
                    });


                    BubbleView.attach({
                        pluginName:TYPE_IMG,
                        pluginInstance:self
                    });

                },
                _dblclick:function(ev) {
                    var self = this,t = new Node(ev.target);
                    if (checkImg(t)) {
                        self.show(null, t);
                        ev.halt();
                    }
                },
                _prepare:function() {
                    var self = this,editor = self.get("editor");
                    self.d = new Overlay({
                        title:"图片属性",
                        mask:true,
                        width:"350px"
                    });
                    var d = self.d;
                    d.body.html(bodyHtml);
                    d.foot.html(footHtml);
                    self.content = d.el;
                    var content = self.content;
                    var cancel = content.one(".ke-img-cancel"),ok = content.one(".ke-img-insert");
                    self.imgUrl = content.one(".ke-img-url");
                    self.imgHeight = content.one(".ke-img-height");
                    self.imgWidth = content.one(".ke-img-width");
                    self.imgAlign = content.one(".ke-img-align");
                    cancel.on("click", function(ev) {
                        self.d.hide();
                        ev.halt();
                    });

                    ok.on("click", function() {
                        self._insert();
                    });
                },
                _updateTip:function(tipurl, a) {
                    tipurl.html(a.attr("src"));
                    tipurl.attr("href", a.attr("src"));
                },

                _real:function() {
                    this.d.show();
                },
                _insert:function() {
                    var self = this,
                        editor = self.get("editor"),
                        url = self.imgUrl.val();
                    if (!url) return;
                    var height = parseInt(self.imgHeight.val()),
                        width = parseInt(self.imgWidth.val()),
                        align = self.imgAlign.val(),
                        style = '';

                    if (height) {
                        style += "height:" + height + "px;";
                    }
                    if (width) {
                        style += "width:" + width + "px;";
                    }
                    if (align) {
                        style += "float:" + align + ";";
                    }
                    if (style) {
                        style = " style='" + style + "' ";
                    }
                    var img = new Node("<img " +
                        style +
                        "src='" + url + "' alt='' />", null, editor.document);
                    img = editor.insertElement(img, (height || width) ? null : function(el) {
                        el.on("load", function() {
                            el.detach();
                            el.css({
                                width:el.width() + "px",
                                height:el.height() + "px"
                            });
                        });
                    });
                    if (self._selectedEl) {
                        editor.getSelection().selectElement(img);
                    }
                    self.d.hide();
                    editor.notifySelectionChange();
                },
                _updateD:function(_selectedEl) {
                    var self = this;
                    self._selectedEl = _selectedEl;
                    if (_selectedEl) {
                        self.imgUrl.val(_selectedEl.attr("src"));
                        self.imgHeight.val(_selectedEl.height());
                        self.imgWidth.val(_selectedEl.width());
                        self.imgAlign.val(_selectedEl.css("float"))
                    }
                },
                show:function(ev, _selectedEl) {
                    var self = this;
                    self._prepare();
                    self._updateD(_selectedEl);
                }
            });
            KE.ImageInserter = ImageInserter;


            var tipHtml = ' '
                + ' <a class="ke-bubbleview-url" target="_blank" href="#"></a> - '
                + '    <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span> - '
                + '    <span class="ke-bubbleview-link ke-bubbleview-remove">删除</span>'
                + '';

            (function(pluginName, label, checkFlash) {

                BubbleView.register({
                    pluginName:pluginName,
                    func:checkFlash,
                    init:function() {
                        var bubble = this,
                            el = bubble.el;
                        el.html(label + tipHtml);
                        var tipurl = el.one(".ke-bubbleview-url"),
                            tipchange = el.one(".ke-bubbleview-change"),
                            tipremove = el.one(".ke-bubbleview-remove");
                        //ie focus not lose
                        tipchange._4e_unselectable();
                        tipurl._4e_unselectable();
                        tipremove._4e_unselectable();
                        tipchange.on("click", function(ev) {
                            bubble._plugin.show(null, bubble._selectedEl);
                            ev.halt();
                        });
                        tipremove.on("click", function(ev) {
                            var flash = bubble._plugin;
                            bubble._selectedEl._4e_remove();
                            flash.editor.notifySelectionChange();
                            ev.halt();
                        });
                        /*
                         位置变化
                         */
                        bubble.on("afterVisibleChange", function(ev) {
                            var v = ev.newVal,a = bubble._selectedEl,
                                flash = bubble._plugin;
                            if (!v || !a)return;
                            flash._updateTip(tipurl, a);
                        });
                    }
                });
            })(TYPE_IMG, "图片网址： ", checkImg);
        })();
    }

    editor.addPlugin(function() {
        new KE.ImageInserter({
            editor:editor
        });

    });

});
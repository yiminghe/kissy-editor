/**
 * flash base for all flash-based plugin
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("flashsupport", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        Event = S.Event,
        ContextMenu = KE.ContextMenu,
        Node = S.Node,
        BubbleView = KE.BubbleView,
        TripleButton = KE.TripleButton,
        Overlay = KE.SimpleOverlay,
        dataProcessor = editor.htmlDataProcessor,
        CLS_FLASH = 'ke_flash',
        TYPE_FLASH = 'flash',
        getFlashUrl = KE.Utils.getFlashUrl,
        dataFilter = dataProcessor && dataProcessor.dataFilter,
        TIP = "请输入如 http://www.xxx.com/xxx.swf";


    if (!KE.Flash) {

        (function() {
            var flashFilenameRegex = /\.swf(?:$|\?)/i,
                bodyHtml = "<p><label>地址�?" +
                    "<input class='ke-flash-url' style='width:280px' value='"
                    + TIP
                    + "'/></label></p>" +
                    "<p style='margin:5px 0'><label>宽度�?" +
                    "<input class='ke-flash-width' style='width:110px' /></label>" +
                    "&nbsp;&nbsp;<label>高度�?input class='ke-flash-height' " +
                    "style='width:110px' /></label></p>" +
                    "<p style='margin:5px 0'><label>对齐�?" +
                    "<select class='ke-flash-align'>" +
                    "<option value=''>�?/option>" +
                    "<option value='left'>左对�?/option>" +
                    "<option value='right'>右对�?/option>" +
                    "</select>" +
                    "<p>",

                footHtml = "<button class='ke-flash-ok'>确定</button> " +
                    "<button class='ke-flash-cancel'>取消</button>";

            /**
             * �?��基于 flash 的插件基类，使用 template 模式抽象
             * @param editor
             */
            function Flash(editor) {
                var self = this;
                self.editor = editor;
                self._init();
            }

            Flash.isFlashEmbed = function (element) {
                var attributes = element.attributes;
                return (
                    attributes.type == 'application/x-shockwave-flash'
                        ||
                        flashFilenameRegex.test(attributes.src || '')
                    );
            };

            S.augment(Flash, {

                /**
                 * 配置信息，用于子类覆�?
                 * @override
                 */
                _config:function() {
                    var self = this;
                    self._cls = CLS_FLASH;
                    self._type = TYPE_FLASH;
                    self._title = "Flash属�?";
                    self._bodyHtml = bodyHtml;
                    self._footHtml = footHtml;
                    self._contentCls = "ke-toolbar-flash";
                    self._tip = "插入Flash";
                    self._contextMenu = contextMenu;
                    self._flashRules = ["img." + CLS_FLASH];
                },
                _init:function() {
                    this._config();
                    var self = this,
                        editor = self.editor,
                        myContexts = {},
                        contextMenu = self._contextMenu;

                    //注册属于编辑器的功能实例
                    editor._toolbars = editor._toolbars || {};
                    editor._toolbars[self._type] = self;

                    //生成编辑器工具按�?
                    self.el = new TripleButton({
                        container:editor.toolBarDiv,
                        contentCls:self._contentCls,
                        title:self._tip
                    });
                    self.el.on("click", self.show, this);


                    //右键功能关联到编辑器实例
                    if (contextMenu) {
                        for (var f in contextMenu) {
                            (function(f) {
                                myContexts[f] = function() {
                                    contextMenu[f](editor);
                                }
                            })(f);
                        }
                    }
                    //注册右键，contextmenu时检�?
                    ContextMenu.register(editor.document, {
                        rules:self._flashRules,
                        width:"120px",
                        funcs:myContexts
                    });


                    //注册泡泡，selectionChange时检�?
                    BubbleView.attach({
                        pluginName:self._type,
                        pluginInstance:self
                    });

                    //注册双击，双击时�?��
                    Event.on(editor.document, "dblclick", self._dbclick, self);
                    KE.Utils.lazyRun(this, "_prepareShow", "_realShow");
                },

                /**
                 * 子类覆盖，如何从flash url得到合�?的应用表示地�?
                 * @override
                 * @param r flash 元素
                 */
                _getFlashUrl:function(r) {
                    return getFlashUrl(r);
                },
                /**
                 * 更新泡泡弹出的界面，子类覆盖
                 * @override
                 * @param tipurl
                 * @param selectedFlash
                 */
                _updateTip:function(tipurl, selectedFlash) {
                    var self = this,
                        editor = self.editor,
                        r = editor.restoreRealElement(selectedFlash);
                    tipurl.html(self._getFlashUrl(r));
                    tipurl.attr("href", self._getFlashUrl(r));
                },

                //根据图片标志触发本插件应�?
                _dbclick:function(ev) {
                    var self = this,t = new Node(ev.target);
                    if (t._4e_name() === "img" && t.hasClass(self._cls)) {
                        self.show(null, t);
                        ev.halt();
                    }
                },

                //建立弹出窗口
                _prepareShow:function() {
                    var self = this,
                        d = new Overlay({
                            title:self._title,
                            width:"350px",
                            mask:true
                        });
                    d.body.html(self._bodyHtml);
                    d.foot.html(self._footHtml);
                    self.d = d;
                    self._initD();
                },
                _realShow:function() {
                    //显示前就要内容搞�?
                    this._updateD();
                    this.d.show();
                },

                /**
                 * 触发前初始化窗口 field，子类覆�?
                 * @override
                 */
                _updateD:function() {
                    var self = this,
                        editor = self.editor,
                        f = self.selectedFlash;
                    if (f) {
                        var r = editor.restoreRealElement(f);
                        if (r.attr("width")) {
                            self.dWidth.val(parseInt(r.attr("width")));
                        }
                        if (r.attr("height")) {
                            self.dHeight.val(parseInt(r.attr("height")));
                        }
                        self.dAlign.val(r.attr("align"));
                        self.dUrl.val(getFlashUrl(r));
                    } else {
                        self.dUrl.val(TIP);
                        self.dWidth.val("");
                        self.dHeight.val("");
                        self.dAlign.val("");
                    }
                },
                show:function(ev, _selectedEl) {
                    var self = this;
                    self.selectedFlash = _selectedEl;
                    self._prepareShow();
                },


                /**
                 * 映射窗口field，子类覆�?
                 * @override
                 */
                _initD:function() {
                    var self = this,editor = self.editor,d = self.d;
                    self.dHeight = d.el.one(".ke-flash-height");
                    self.dWidth = d.el.one(".ke-flash-width");
                    self.dUrl = d.el.one(".ke-flash-url");
                    self.dAlign = d.el.one(".ke-flash-align");
                    var action = d.el.one(".ke-flash-ok"),
                        cancel = d.el.one(".ke-flash-cancel");
                    action.on("click", self._gen, self);
                    cancel.on("click", function() {
                        self.d.hide();
                    });
                },

                /**
                 * 应用子类覆盖，提�?flash 元素的相关信�?
                 * @override
                 */
                _getDInfo:function() {
                    var self = this;
                    return {
                        url:  self.dUrl.val(),
                        attrs:{
                            width:self.dWidth.val(),
                            height:self.dHeight.val(),
                            align:self.dAlign.val()
                        }
                    };
                },
                /**
                 * 真正产生 flash 元素
                 */
                _gen: function() {
                    var self = this,
                        editor = self.editor,
                        dinfo = self._getDInfo(),
                        url = dinfo && dinfo.url,
                        attrs = dinfo && dinfo.attrs,
                        attrs_str = " ";
                    if (!S.trim(url)) return;
                    if (attrs) {
                        for (var a in attrs) {
                            attrs_str += a + "='" + attrs[a] + "' ";
                        }
                    }
                    var outerHTML = '<object ' +
                        attrs_str +
                        ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' +
                        ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0">' +
                        '<param name="quality" value="high" />' +
                        '<param name="movie" value="' + url + '" />' +
                        '<embed ' +
                        attrs_str +
                        'pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
                        'quality="high" ' +
                        ' src="' + url + '" ' +
                        ' type="application/x-shockwave-flash"/>' +
                        '</object>',
                        real = new Node(outerHTML, null, editor.document),
                        substitute = editor.createFakeElement ?
                            editor.createFakeElement(real, self._cls, self._type, true, outerHTML, attrs) :
                            real;
                    substitute = editor.insertElement(substitute);
                    //如果是修改，就再选中
                    if (self.selectedFlash) {
                        editor.getSelection().selectElement(substitute);
                    }
                    self.d.hide();
                }
            });

            KE.Flash = Flash;

            /**
             * tip初始化，�?��共享�?��tip
             */
            var tipHtml = ' '
                + ' <a class="ke-bubbleview-url" target="_blank" href="#"></a> - '
                + '    <span class="ke-bubbleview-link ke-bubbleview-change">编辑</span> - '
                + '    <span class="ke-bubbleview-link ke-bubbleview-remove">删除</span>'
                + '';

            /**
             * 泡泡判断是否选择元素符合
             * @param lastElement
             */
            function checkFlash(lastElement) {
                return lastElement._4e_ascendant(function(node) {
                    return node._4e_name() === 'img' && (!!node.hasClass(CLS_FLASH));
                }, true);
            }

            /**
             * 注册�?��泡泡
             * @param pluginName
             * @param label
             * @param checkFlash
             */
            Flash.registerBubble = function(pluginName, label, checkFlash) {

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
                            //回调show，传入�?中元�?
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
                         位置变化，在显示前就设置内容，防止ie6 iframe遮罩不能正确大小
                         */
                        bubble.on("beforeVisibleChange", function(ev) {
                            var v = ev.newVal,a = bubble._selectedEl,
                                flash = bubble._plugin;
                            if (!v || !a)return;
                            flash._updateTip(tipurl, a);
                        });
                    }
                });
            };


            Flash.registerBubble("flash", "Flash 网址�?", checkFlash);
            Flash.checkFlash = checkFlash;

            //右键功能列表
            var contextMenu = {
                "Flash属�?":function(editor) {
                    var selection = editor.getSelection(),
                        startElement = selection && selection.getStartElement(),
                        flash = checkFlash(startElement),
                        flashUI = editor._toolbars[TYPE_FLASH];
                    if (flash) {
                        flashUI.show(null, flash);
                    }
                }
            };

            Flash.CLS_FLASH = CLS_FLASH;
            Flash.TYPE_FLASH = TYPE_FLASH;
        })();
    }

    dataFilter && dataFilter.addRules({
        elements : {
            'object' : function(element) {
                var attributes = element.attributes,i,
                    classId = attributes['classid'] && String(attributes['classid']).toLowerCase();
                if (!classId) {
                    // Look for the inner <embed>
                    for (i = 0; i < element.children.length; i++) {
                        if (element.children[ i ].name == 'embed') {
                            if (!KE.Flash.isFlashEmbed(element.children[ i ]))
                                return null;
                            return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true);
                        }
                    }
                    return null;
                }
                return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true);
            },

            'embed' : function(element) {
                if (!KE.Flash.isFlashEmbed(element))
                    return null;
                return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true);
            }
        }}, 5);
});

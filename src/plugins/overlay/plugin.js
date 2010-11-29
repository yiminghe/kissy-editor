/**
 * KISSY Overlay
 * @author 玉伯<lifesinger@gmail.com>, 承玉<yiminghe@gmail.com>,乔花<qiaohua@taobao.com>
 */
KISSY.add("overlay", function(S) {

    var Base = S.Base,
        UA = S.UA;


    var Overlay = Base.create([S.Ext.Box,
        S.Ext.ContentBox,
        S.Ext.Position,
        S.Ext.Loading,
        //ie6 支持,select bug
        UA.ie == 6 ? S.Ext.Shim : null,
        S.Ext.Align,
        S.Ext.Mask], {

        init:function() {
            S.log("Overlay init");
            var self = this;
            self.on("bindUI", self._bindUIOverlay, self);
            self.on("renderUI", self._renderUIOverlay, self);
            self.on("syncUI", self._syncUIOverlay, self);
        },

        _renderUIOverlay:function() {
            S.log("_renderUIOverlay");
            this.get("el").addClass("ks-overlay");
        },

        _syncUIOverlay:function() {
            S.log("_syncUIOverlay");
        },
        /**
         * bindUI
         * 注册dom事件以及属性事件
         * @override
         */
        _bindUIOverlay: function() {
            S.log("_bindUIOverlay");
        },

        /**
         * 删除自己, mask 删不了
         */
        destructor: function() {
            S.log("overlay destructor");
        }

    }, {
        ATTRS:{
            elOrder:0
        }
    });
    S.Overlay = Overlay;

}, {
    requires: ["core"]
});

/**
 * 2010-11-09 2010-11-10 承玉<yiminghe@gmail.com>重构，attribute-base-Overlay ，采用 Base.create
 *
 * TODO:
 *  - effect
 */
/**
 * KISSY.Dialog
 * @creator  承玉<yiminghe@gmail.com>, 乔花<qiaohua@taobao.com>
 */
KISSY.add('dialog', function(S) {

    S.Dialog = S.Base.create(S.Overlay,
        [S.Ext.StdMod,
            S.Ext.Close,
            S.Ext.Drag,
            S.Ext.Constrain], {
        init:function() {
            S.log("dialog init");
            var self = this;
            self.on("renderUI", self._rendUIDialog, self);
            self.on("bindUI", self._bindUIDialog, self);
            self.on("syncUI", self._syncUIDialog, self);
        },

        _rendUIDialog:function() {
            S.log("_rendUIDialog");
            var self = this;
            self.get("el").addClass("ks-dialog");
            //设置值，drag-ext 绑定时用到
            self.set("handlers", [self.get("header")]);
        },
        _bindUIDialog:function() {
            S.log("_bindUIDialog");
        },
        _syncUIDialog:function() {
            S.log("_syncUIDialog");
        },
        destructor:function() {
            S.log("Dialog destructor");
        }
    });


}, { host: 'overlay' });

/**
 * 2010-11-10 承玉<yiminghe@gmail.com>重构，使用扩展类
 */



KISSY.Editor.add("ext-focus", function() {
    var S = KISSY,
        UA = S.UA,
        KE = S.Editor,
        focusManager = KE.focusManager;
    KE.namespace("Ext");

    function FocusExt() {
        S.log("FocusExt init");
        var self = this;
        self.on("renderUI", self._renderUIFocusExt, self);
        self.on("bindUI", self._bindUIFocusExt, self);
        self.on("syncUI", self._syncUIFocusExt, self);
    }

    FocusExt.ATTRS = {
        focus4e:{
            value:true
        }
    };

    FocusExt.prototype = {
        _uiSetFocus4e:function(v) {
            var self = this;
            if (v) {
                self.on("show", self._show4FocusExt, self);
                self.on("hide", self._hide4FocusExt, self);
            } else {
                self.detach("show", self._show4FocusExt, self);
                self.detach("hide", self._hide4FocusExt, self);
            }
        },
        _syncUIFocusExt:function() {
            S.log("_syncUIFocusExt");
        },
        _renderUIFocusExt:function() {
            S.log("_renderUIFocusExt");
        },
        _bindUIFocusExt:function() {
            var self = this;
            self._focus4e = new S.Node("<a " +
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
                "></a>").appendTo(self.get("el"));
        },
        _show4FocusExt:function() {
            var self = this;
            //保存当前焦点editor
            self._focusEditor = focusManager.currentInstance();
            var editor = self._focusEditor;
            /*
             * IE BUG: If the initial focus went into a non-text element (e.g. button,image),
             * then IE would still leave the caret inside the editing area.
             */
            //聚焦到当前窗口
            //使得编辑器失去焦点，促使ie保存当前选择区域（位置）
            //chrome 需要下面两句
            window.focus();
            document.body.focus();

            //firefox 需要下面一句
            self._focus4e[0].focus();

            if (UA.ie && editor) {
                var $selection = editor.document.selection,
                    $range = $selection.createRange();
                if ($range) {
                    if (
                    //修改ckeditor，如果单纯选择文字就不用管了
                    //$range.parentElement && $range.parentElement().ownerDocument == editor.document
                    //||
                    //缩放图片那个框在ie下会突出浮动层来
                        $range.item
                            && $range.item(0).ownerDocument == editor.document) {
                        var $myRange = document.body.createTextRange();
                        $myRange.moveToElementText(self.get("el")._4e_first()[0]);
                        $myRange.collapse(true);
                        $myRange.select();
                    }
                }
            }


        },
        _hide4FocusExt:function() {
            var editor = this._focusEditor;
            editor && editor.focus();
        }
    };
    KE.Ext.Focus = FocusExt;

}, {
    host:"overlay"
});/**
 * custom overlay  for kissy editor
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("overlay", function() {

    var S = KISSY,
        KE = S.Editor;
    if (KE.Overlay) return;
    /**
     * 2010-11-18 重构，使用 S.Ext 以及 Base 组件周期
     */
    var Overlay4E = S.Base.create(S.Overlay, [KE.Ext.Focus], {
        init:function() {
            S.log("Overlay4E init");
            var self = this;
            //必须等 sync ，等所有状态都同步好再进行 preventFocus
            self.on("syncUI", self._syncUIOverlay4E, self);
        },
        _syncUIOverlay4E:function() {
            S.log("_syncUIOverlay4E");
            var self = this;
            //编辑器 overlay 中的全部点击都不会使得失去焦点
            KE.Utils.preventFocus(self.get("contentEl"));
        }
    }, {
        ATTRS:{
            //指定zIndex默认值
            "zIndex":{value:KE.baseZIndex(KE.zIndexManager.OVERLAY)}
        }
    });
    var Dialog4E = S.Base.create(S.Dialog, [KE.Ext.Focus], {
        show:function() {
            //在 show 之前调用
            this.center();
            var y = this.get("y");
            //居中有点偏下
            if (y - S.DOM.scrollTop() > 200) {
                y = S.DOM.scrollTop() + 200;
                this.set("y", y);
            }
            Dialog4E.superclass.show.call(this);
        }
    }, {
        ATTRS:{
            constrain:{value:true},
            //指定zIndex默认值
            "zIndex":{value:KE.baseZIndex(KE.zIndexManager.OVERLAY)}
        }
    });

    KE.Overlay = Overlay4E;
    KE.Dialog = Dialog4E;


    var globalMask;

    KE.Overlay.loading = function() {
        if (!globalMask) {
            globalMask = new KE.Overlay({
                x:0,
                focus4e:false,
                width:"100%",
                y:0,
                //指定全局 loading zIndex 值
                "zIndex":KE.baseZIndex(KE.zIndexManager.LOADING),
                elCls:"ke-global-loading"
            });
        }
        globalMask.set("height", S.DOM.docHeight());
        globalMask.show();
        globalMask.loading();
    };

    KE.Overlay.unloading = function() {
        globalMask && globalMask.hide();
    };
});
/**
 * align extension
 * @author:承玉<yiminghe@gmail.com>,乔花<qiaohua@taobao.com>
 */
KISSY.add("ext-align", function(S) {
    S.namespace("Ext");
    var DOM = S.DOM,Node = S.Node;

    function AlignExt() {
        S.log("align init");
        var self = this;
        self.on("bindUI", self._bindUIAlign, self);
        self.on("renderUI", self._renderUIAlign, self);
        self.on("syncUI", self._syncUIAlign, self);
    }

    S.mix(AlignExt, {
        TL: 'tl',
        TC: 'tc',
        TR: 'tr',
        CL: 'cl',
        CC: 'cc',
        CR: 'cr',
        BL: 'bl',
        BC: 'bc',
        BR: 'br'
    });


    AlignExt.ATTRS = {
        align:{
            /*
             value:{
             node: null,         // 参考元素, falsy 值为可视区域, 'trigger' 为触发元素, 其他为指定元素
             points: [AlignExt.CC, AlignExt.CC], // ['tr', 'tl'] 表示 overlay 的 tl 与参考节点的 tr 对齐
             offset: [0, 0]      // 有效值为 [n, m]
             }*/
        }
    };


    /**
     * 获取 node 上的 align 对齐点 相对于页面的坐标
     * @param {?Element} node
     * @param align
     */
    function _getAlignOffset(node, align) {
        var V = align.charAt(0),
            H = align.charAt(1),
            offset, w, h, x, y;

        if (node) {
            node = new Node(node);
            offset = node.offset();
            w = node[0].offsetWidth;
            h = node[0].offsetHeight;
        } else {
            offset = { left: DOM.scrollLeft(), top: DOM.scrollTop() };
            w = DOM.viewportWidth();
            h = DOM.viewportHeight();
        }

        x = offset.left;
        y = offset.top;

        if (V === 'c') {
            y += h / 2;
        } else if (V === 'b') {
            y += h;
        }

        if (H === 'c') {
            x += w / 2;
        } else if (H === 'r') {
            x += w;
        }

        return { left: x, top: y };
    }

    AlignExt.prototype = {
        _bindUIAlign:function() {
            S.log("_bindUIAlign");
        },
        _renderUIAlign:function() {
            S.log("_renderUIAlign");
        },
        _syncUIAlign:function() {
            S.log("_syncUIAlign");
        },
        _uiSetAlign:function(v) {
            S.log("_uiSetAlign");
            if (S.isPlainObject(v)) {
                this.align(v.node, v.points, v.offset);
            }
        },
        /**
         * 对齐 Overlay 到 node 的 points 点, 偏移 offset 处
         * @param {Element=} node 参照元素, 可取配置选项中的设置, 也可是一元素
         * @param {Array.<string>} points 对齐方式
         * @param {Array.<number>} offset 偏移
         */
        align: function(node, points, offset) {
            var self = this,
                xy,
                diff,
                p1,
                el = self.get("el"),
                p2;

            xy = DOM.offset(el);
            // p1 是 node 上 points[0] 的 offset
            // p2 是 overlay 上 points[1] 的 offset
            p1 = _getAlignOffset(node, points[0]);
            p2 = _getAlignOffset(el, points[1]);
            diff = [p2.left - p1.left, p2.top - p1.top];

            self.set("xy", [xy.left - diff[0] + (+offset[0]),
                xy.top - diff[1] + (+offset[1])]);
        },



        /**
         * 居中显示到可视区域, 一次性居中
         */
        center: function(node) {
            this.set("align", {
                node:node,
                points:[AlignExt.CC, AlignExt.CC],
                offset:[0,0]
            });
        },

        __destructor:function() {
            S.log("align __destructor");
        }
    };

    S.Ext.Align = AlignExt;

});/**
 * basic box support for component
 * @author:yiminghe@gmail.com
 */
KISSY.add("ext-box", function(S) {
    S.namespace("Ext");

    var doc = document,Node = S.Node;

    function BoxExt() {
        S.log("box init");
        var self = this;
        self.on("renderUI", self._renderUIBoxExt, self);
        self.on("syncUI", self._syncUIBoxExt, self);
        self.on("bindUI", self._bindUIBoxExt, self);

    }

    BoxExt.ATTRS = {
        el: {
            //容器元素
            setter:function(v) {
                if (S.isString(v))
                    return S.one(v);
            }
        },
        elCls: {
            // 容器的 class           
        },
        elStyle:{
            //容器的行内样式
        },
        width: {
            // 宽度           
        },
        height: {
            // 高度
        },

        html: {
            // 内容, 默认为 undefined, 不设置
            value: false
        }
    };

    BoxExt.HTML_PARSER = {
        el:function(srcNode) {
            return srcNode;
        }
    };

    BoxExt.prototype = {
        _syncUIBoxExt:function() {
            S.log("_syncUIBoxExt");
        },
        _bindUIBoxExt:function() {
            S.log("_bindUIBoxExt");
        },
        _renderUIBoxExt:function() {
            S.log("_renderUIBoxExt");
            var self = this,
                render = self.get("render") || S.one(doc.body),
                el = self.get("el");
            render = new Node(render);
            if (!el) {
                el = new Node("<div>");
                render.prepend(el);
                self.set("el", el);
            }
        },

        _uiSetElCls:function(cls) {
            S.log("_uiSetElCls");
            if (cls) {
                this.get("el").addClass(cls);
            }
        },

        _uiSetElStyle:function(style) {
            S.log("_uiSetElStyle");
            if (style) {
                this.get("el").css(style);
            }
        },

        _uiSetWidth:function(w) {
            S.log("_uiSetWidth");
            var self = this;
            if (w) {
                self.get("el").width(w);
            }
        },

        _uiSetHeight:function(h) {
            S.log("_uiSetHeight");
            var self = this;
            if (h) {
                self.get("el").height(h);
            }
        },

        _uiSetHtml:function(c) {
            S.log("_uiSetHtml");
            if (c !== false){
                this.get("el").html(c);
            }

        },

        __destructor:function() {
            S.log("box __destructor");
            var el = this.get("el");
            if (el) {
                el.detach();
                el.remove();
            }
        }
    };

    S.Ext.Box = BoxExt;
});/**
 * close extension for kissy dialog
 * @author:yiminghe@gmail.com
 */
KISSY.add("ext-overlay-close", function(S) {
    S.namespace("Ext");
    var CLS_PREFIX = 'ks-ext-',Node = S.Node;

    function CloseExt() {
        S.log("close init");
        var self = this;
        self.on("renderUI", self._rendUICloseExt, self);
        self.on("bindUI", self._bindUICloseExt, self);
        self.on("syncUI", self._syncUICloseExt, self);
    }

    CloseExt.ATTRS = {
        closable: {             // 是否需要关闭按钮
            value: true
        },
        closeBtn:{}
    };

    CloseExt.HTML_PARSER = {
        closeBtn:"." + CLS_PREFIX + 'close'
    };

    CloseExt.prototype = {
        _syncUICloseExt:function() {
            S.log("_syncUICloseExt");
        },
        _uiSetClosable:function(v) {
            S.log("_uiSetClosable");
            var self = this,
                closeBtn = self.get("closeBtn");
            if (closeBtn) {
                if (v) {
                    closeBtn.show();
                } else {
                    closeBtn.hide();
                }
            }
        },
        _rendUICloseExt:function() {
            S.log("_rendUICloseExt");
            var self = this,
                closeBtn = self.get("closeBtn"),
                el = self.get("contentEl");

            if (!closeBtn &&
                el) {
                closeBtn = new Node("<a " +
                    "href='#' " +
                    "class='" + CLS_PREFIX + "close" + "'>" +
                    "<span class='" +
                    CLS_PREFIX + "close-x" +
                    "'>X</span>" +
                    "</a>")
                    .appendTo(el);
                self.set("closeBtn", closeBtn);
            }
        },
        _bindUICloseExt:function() {
            S.log("_bindUICloseExt");
            var self = this,
                closeBtn = self.get("closeBtn");
            closeBtn && closeBtn.on("click", function(ev) {
                self.hide();
                ev.halt();
            });
        },

        __destructor:function() {
            S.log("close-ext __destructor");
            var self = this,
                closeBtn = self.get("closeBtn");
            closeBtn && closeBtn.detach();
        }
    };
    S.Ext.Close = CloseExt;

});KISSY.add("ext-constrain", function(S) {
    S.namespace("Ext");

    var DOM = S.DOM,
        Node = S.Node;

    function ConstrainExt() {
        S.log("constrain init");
        var self = this;
        self.on("bindUI", self._bindUIConstrain, self);
        self.on("renderUI", self._renderUIConstrain, self);
        self.on("syncUI", self._syncUIConstrain, self);
    }

    ConstrainExt.ATTRS = {
        constrain:{
            //不限制
            //true:viewport限制
            //node:限制在节点范围
            value:false
        }
    };

    /**
     * 获取受限区域的宽高, 位置
     * @return {Object | undefined} {left: 0, top: 0, maxLeft: 100, maxTop: 100}
     */
    function _getConstrainRegion(constrain) {
        var ret = undefined;
        if (!constrain) return ret;
        var el = this.get("el");
        if (constrain !== true) {
            constrain = new Node(constrain);
            ret = constrain.offset();
            S.mix(ret, {
                maxLeft: ret.left + constrain[0].offsetWidth - el[0].offsetWidth,
                maxTop: ret.top + constrain[0].offsetHeight - el[0].offsetHeight
            });
        }
        // 没有指定 constrain, 表示受限于可视区域
        else {
            ret = { left: DOM.scrollLeft(), top: DOM.scrollTop() };

            S.mix(ret, {
                maxLeft: ret.left + DOM.viewportWidth() - el[0].offsetWidth,
                maxTop: ret.top + DOM.viewportHeight() - el[0].offsetHeight
            });
        }
        return ret;
    }

    ConstrainExt.prototype = {
        _bindUIConstrain:function() {
            S.log("_bindUIConstrain");
            var self = this;
            self.on("beforeXChange", function(ev) {
                var v = ev.newVal,
                    _ConstrainExtRegion = _getConstrainRegion.call(
                        self, self.get("constrain"));
                if (!_ConstrainExtRegion) return;
                if (v >= _ConstrainExtRegion.maxLeft || v <= _ConstrainExtRegion.left) return false;
            });

            self.on("beforeYChange", function(ev) {
                var v = ev.newVal,
                    _ConstrainExtRegion = _getConstrainRegion.call(
                        self, self.get("constrain"));
                if (!_ConstrainExtRegion) return;
                if (v >= _ConstrainExtRegion.maxTop || v <= _ConstrainExtRegion.top) return false;
            });
        },
        _renderUIConstrain:function() {
            S.log("_renderUIConstrain");

        },
        _syncUIConstrain:function() {
            S.log("_syncUIConstrain");
        },

        _uiSetConstrain:function(v) {
            S.log("_uiSetConstrain");
            //this._ConstrainExtRegion = _getConstrainRegion.call(this, v);
        },

        __destructor:function() {
            S.log("constrain-ext __destructor");
        }

    };


    S.Ext.Constrain = ConstrainExt;

});/**
 * 里层包裹层定义，适合mask以及shim
 * @author:yiminghe@gmail.com
 */
KISSY.add("ext-contentbox", function(S) {

    S.namespace("Ext");
    var Node = S.Node;

    function ContentBox() {
         S.log("contentbox init");
        var self = this;
        self.on("renderUI", self._renderUIContentBox, self);
        self.on("syncUI", self._syncUIContentBox, self);
        self.on("bindUI", self._bindUIContentBox, self);
    }

    ContentBox.ATTRS = {
        //内容容器节点
        contentEl:{},
        //层内容
        content:{}
    };


    ContentBox.HTML_PARSER = {
        contentEl:".ks-contentbox"
    };

    ContentBox.prototype = {
        _syncUIContentBox:function() {
            S.log("_syncUIContentBox");
        },
        _bindUIContentBox:function() {
            S.log("_bindUIContentBox");
        },
        _renderUIContentBox:function() {
            S.log("_renderUIContentBox");
            var self = this,
                contentEl = self.get("contentEl"),
                el = self.get("el");
            if (!contentEl) {
                contentEl = new Node("<div class='ks-contentbox'>").appendTo(el);
                self.set("contentEl", contentEl);
            }
        },

        _uiSetContent:function(c) {
            S.log("_uiSetContent");
            if (c !== undefined) {
                this.get("contentEl").html(c);
            }
        },

        __destructor:function(){
            S.log("contentbox __destructor");
        }
    };

    S.Ext.ContentBox = ContentBox;
});/**
 * drag extension for position
 * @author:yiminghe@gmail.com
 */
KISSY.add("ext-drag", function(S) {
    S.namespace('Ext');
    function DragExt() {
         S.log("drag init");
        var self = this;
        self.on("bindUI", self._bindUIDragExt, self);
        self.on("renderUI", self._renderUIDragExt, self);
        self.on("syncUIUI", self._syncUIDragExt, self);
    }

    DragExt.ATTRS = {
        handlers:{value:[]},
        draggable:{value:true}
    };

    DragExt.prototype = {

        _uiSetHanlders:function(v) {
            S.log("_uiSetHanlders");
            if (v && v.length > 0)
                this.__drag.set("handlers", v);
        },

        _syncUIDragExt:function() {
            S.log("_syncUIDragExt");
        },

        _renderUIDragExt:function() {
            S.log("_renderUIDragExt");
        },

        _bindUIDragExt:function() {
            S.log("_bindUIDragExt");
            var self = this,el = self.get("el");
            self.__drag = new S.Draggable({
                node:el,
                handlers:self.get("handlers")
            });
        },

        _uiSetDraggable:function(v) {
            S.log("_uiSetDraggable");
            var self = this,d = self.__drag;
            if (v) {
                d.on("drag", self._dragExtAction, self);
            } else {
                d.detach("drag");
            }
        },

        _dragExtAction:function(offset) {
            this.set("xy", [offset.left,offset.top])
        },
        /**
         *
         */
        __destructor:function() {
            S.log("DragExt __destructor");
            var d = this.__drag;
            d&&d.destroy();
        }

    };

    S.Ext.Drag = DragExt;

});/**
 * loading mask support for overlay
 * @author:yiminghe@gmail.com
 */
KISSY.add("ext-loading", function(S) {
    S.namespace("Ext");
    function LoadingExt() {
        S.log("LoadingExt init");
    }

    LoadingExt.prototype = {
        loading:function() {
            var self = this;
            if (!self._loadingExtEl) {
                self._loadingExtEl = new S.Node("<div " +
                    "class='ks-ext-loading'" +
                    " style='position: absolute;" +
                    "border: none;" +
                    "width: 100%;" +
                    "top: 0;" +
                    "left: 0;" +
                    "z-index: 99999;" +
                    "height:100%;" +
                    "*height: expression(this.parentNode.offsetHeight);" + "'>").appendTo(self.get("el"));
            }
            self._loadingExtEl.show();
        },

        unloading:function() {
            var lel = this._loadingExtEl;
            lel && lel.hide();
        }
    };

    S.Ext.Loading = LoadingExt;

});KISSY.add("ext-mask", function(S) {
    S.namespace("Ext");
    /**
     * 多 position 共享一个遮罩
     */
    var mask,
        UA = S.UA,
        num = 0;


    function initMask() {
        mask = new S.Node("<div class='ks-ext-mask'>").prependTo(document.body);
        mask.css({
            "position":"absolute",
            width:"100%",
            "height": S.DOM.docHeight()
        });
        if (UA.ie == 6) {
            mask.append("<iframe style='width:100%;" +
                "height:expression(this.parentNode.offsetHeight);" +
                "filter:alpha(opacity=0);" +
                "z-index:-1;'>");
        }
    }

    function MaskExt() {
        S.log("mask init");
        var self = this;
        self.on("bindUI", self._bindUIMask, self);
        self.on("renderUI", self._renderUIMask, self);
        self.on("syncUI", self._syncUIMask, self);
    }

    MaskExt.ATTRS = {
        mask:{
            value:false
        }
    };

    MaskExt.prototype = {
        _bindUIMask:function() {
            S.log("_bindUIMask");
        },

        _renderUIMask:function() {
            S.log("_renderUIMask");
        },

        _syncUIMask:function() {
            S.log("_syncUIMask");
        },
        _uiSetMask:function(v) {
            S.log("_uiSetMask");
            var self = this;
            if (v) {
                self.on("show", self._maskExtShow, self);
                self.on("hide", self._maskExtHide, self);
            } else {
                self.detach("show", self._maskExtShow, self);
                self.detach("hide", self._maskExtHide, self);
            }
        },

        _maskExtShow:function() {
            if (!mask) {
                initMask();
            }
            mask.css({
                "z-index":this.get("zIndex") - 1
            });
            num++;
            mask.show();
        },

        _maskExtHide:function() {
            num--;
            if (num <= 0) num = 0;
            if (!num)
                mask && mask.hide();
        },

        __destructor:function() {
            S.log("mask __destructor");
        }

    };

    S.Ext.Mask = MaskExt;
});/**
 * position and visible extension，可定位的隐藏层
 * @author:yiminghe@gmail.com
 */
KISSY.add("ext-position", function(S) {
    S.namespace("Ext");

    var doc = document ,
        Event = S.Event,
        KEYDOWN = "keydown";

    function PositionExt() {
        S.log("position init");
        var self = this;
        self.on("bindUI", self._bindUIPosition, self);
        self.on("renderUI", self._renderUIPosition, self);
        self.on("syncUI", self._syncUIPosition, self);
    }

    PositionExt.ATTRS = {
        x: {
            // 水平方向绝对位置
        },
        y: {
            // 垂直方向绝对位置
        },
        xy: {
            // 相对 page 定位, 有效值为 [n, m], 为 null 时, 选 align 设置
            setter: function(v) {
                var self = this,
                    xy = S.makeArray(v);

                if (xy.length) {
                    xy[0] && self.set("x", xy[0]);
                    xy[1] && self.set("y", xy[1]);
                }
                return v;
            }
        },
        zIndex: {
            value: 9999
        },
        visible:{
            value:undefined
        }
    };


    PositionExt.prototype = {
        _syncUIPosition:function() {
            S.log("_syncUIPosition");
        },
        _renderUIPosition:function() {
            S.log("_renderUIPosition");
            this.get("el").addClass("ks-ext-position");
            this.get("el").css("display", "");
        },
        _bindUIPosition:function() {
            S.log("_bindUIPosition");
        },
        _uiSetZIndex:function(x) {
            S.log("_uiSetZIndex");
            if (x !== undefined)
                this.get("el").css("z-index", x);
        },
        _uiSetX:function(x) {
            S.log("_uiSetX");
            if (x !== undefined)
                this.get("el").offset({
                    left:x
                });
        },
        _uiSetY:function(y) {
            S.log("_uiSetY");
            if (y !== undefined)
                this.get("el").offset({
                    top:y
                });
        },
        _uiSetVisible:function(isVisible) {
            if (isVisible === undefined) return;
            S.log("_uiSetVisible");
            var self = this,
                el = self.get("el");
            el.css("visibility", isVisible ? "visible" : "hidden");
            self[isVisible ? "_bindKey" : "_unbindKey" ]();
            self.fire(isVisible ? "show" : "hide");
        },
        /**
         * 显示/隐藏时绑定的事件
         */
        _bindKey: function() {
            Event.on(doc, KEYDOWN, this._esc, this);
        },

        _unbindKey: function() {
            Event.remove(doc, KEYDOWN, this._esc, this);
        },

        _esc: function(e) {
            if (e.keyCode === 27) this.hide();
        },
        /**
         * 移动到绝对位置上, move(x, y) or move(x) or move([x, y])
         * @param {number|Array.<number>} x
         * @param {number=} y
         */
        move: function(x, y) {
            var self = this;
            if (S.isArray(x)) {
                y = x[1];
                x = x[0];
            }
            self.set("xy", [x,y]);
        },

        /**
         * 显示 Overlay
         */
        show: function() {
            this._firstShow();
        },

        /**
         * 第一次显示时, 需要构建 DOM, 设置位置
         */
        _firstShow: function() {
            var self = this;
            self.renderer();
            self._realShow();
            self._firstShow = self._realShow;
        },


        _realShow: function() {
            this.set("visible", true);
        },

        /**
         * 隐藏
         */
        hide: function() {
            this.set("visible", false);
        },

        __destructor:function() {
            S.log("position __destructor");
        }

    };

    S.Ext.Position = PositionExt;
});/**
 * shim for ie6 ,require box-ext
 * @author:yiminghe@gmail.com
 */
KISSY.add("ext-shim", function(S) {
    S.namespace("Ext");
    function ShimExt() {
        S.log("shim init");
        var self = this;
        self.on("renderUI", self._renderUIShimExt, self);
        self.on("bindUI", self._bindUIShimExt, self);
        self.on("syncUI", self._syncUIShimExt, self);
    }

    var Node = S.Node;
    ShimExt.prototype = {
        _syncUIShimExt:function() {
            S.log("_syncUIShimExt");
        },
        _bindUIShimExt:function() {
            S.log("_bindUIShimExt");
        },
        _renderUIShimExt:function() {
            S.log("_renderUIShimExt");
            var self = this,el = self.get("el");
            var shim = new Node("<iframe style='position: absolute;" +
                "border: none;" +
                "width: expression(this.parentNode.offsetWidth);" +
                "top: 0;" +
                "opacity: 0;" +
                "filter: alpha(opacity=0);" +
                "left: 0;" +
                "z-index: -1;" +
                "height: expression(this.parentNode.offsetHeight);" + "'>");
            el.prepend(shim);
        },

        __destructor:function() {
            S.log("shim __destructor");
        }
    };
    S.Ext.Shim = ShimExt;
});/**
 * support standard mod for component
 * @author: yiminghe@gmail.com
 */
KISSY.add("ext-stdmod", function(S) {

    S.namespace("Ext");
    var CLS_PREFIX = "ks-stdmod-",
        Node = S.Node;

    function StdMod() {
        S.log("stdmod init");
        var self = this;
        self.on("renderUI", self._renderUIStdMod, self);
        self.on("syncUI", self._syncUIStdMod, self);
        self.on("bindUI", self._bindUIStdMod, self);
    }

    StdMod.ATTRS = {
        header:{
        },
        body:{
        },
        footer:{
        },
        headerContent:{
            value:false
        },
        bodyContent:{
            value:false
        },
        footerContent:{
            value:false
        }
    };

    StdMod.HTML_PARSER = {
        header:"." + CLS_PREFIX + "header",
        body:"." + CLS_PREFIX + "body",
        footer:"." + CLS_PREFIX + "footer"
    };


    StdMod.prototype = {
        _bindUIStdMod:function() {
            S.log("_bindUIStdMod");
        },
        _syncUIStdMod:function() {
            S.log("_syncUIStdMod");
        },
        _setStdModContent:function(part, v) {
            if (v !== false) {
                if (S.isString(v)) {
                    this.get(part).html(v);
                } else {
                    this.get(part).html("");
                    this.get(part).append(v);
                }
            }
        },
        _uiSetBodyContent:function(v) {
            S.log("_uiSetBodyContent");
            this._setStdModContent("body", v);
        },
        _uiSetHeaderContent:function(v) {
            S.log("_uiSetHeaderContent");
            this._setStdModContent("header", v);
        },
        _uiSetFooterContent:function(v) {
            S.log("_uiSetFooterContent");
            this._setStdModContent("footer", v);
        },
        _renderUIStdMod:function() {
            S.log("_renderUIStdMod");
            var self = this,
                el = self.get("contentEl"),
                header = self.get("header"),
                body = self.get("body"),
                footer = self.get("footer"),
                headerContent = self.get("headerContent"),
                bodyContent = self.get("bodyContent"),
                footerContent = self.get("footerContent");
            if (!header) {
                header = new Node("<div class='" + CLS_PREFIX + "header'>").appendTo(el);
                self.set("header", header);
            }
            if (!body) {
                body = new Node("<div class='" + CLS_PREFIX + "body'>").appendTo(el);
                self.set("body", body);
            }
            if (!footer) {
                footer = new Node("<div class='" + CLS_PREFIX + "footer'>").appendTo(el);
                self.set("footer", footer);
            }
        },

        __destructor:function() {
            S.log("stdmod __destructor");
        }
    };


    S.Ext.StdMod = StdMod;

});/**
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
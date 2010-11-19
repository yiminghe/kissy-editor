/**
 * bubble or tip view for kissy editor
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("bubbleview", function() {
    var KE = KISSY.Editor,
        S = KISSY,
        Event = S.Event,
        DOM = S.DOM,
        Node = S.Node;

    if (KE.BubbleView) return;

    var BubbleView = S.Base.create(KE.Overlay, [], {
        init:function() {
            this.on("renderUI", this._renderUIBubbleView, this);
        },
        _renderUIBubbleView:function() {
            var el = this.get("el");
            el.addClass("ke-bubbleview-bubble");
        },
        show:function() {
            var self = this,
                a = self._selectedEl,
                xy = a._4e_getOffset(document);
            xy.top += a.height() + 5;
            BubbleView.superclass.show.call(self);
            self.set("xy", [xy.left,xy.top]);
        }
    }, {
        ATTRS:{
            focus4e:false,
            "zIndex":{value:KE.baseZIndex(KE.zIndexManager.BUBBLE_VIEW)}
        }
    });


    var holder = {};


    /**
     * 延迟化创建实例
     * @param cfg
     */
    BubbleView.attach = function(cfg) {
        var pluginInstance = cfg.pluginInstance,
            pluginName = cfg.pluginName,
            editor = pluginInstance.editor,
            h = holder[pluginName];
        if (!h) return;
        var func = h.cfg.func,
            bubble = holder[pluginName].bubble;
        //借鉴google doc tip提示显示
        editor.on("selectionChange", function(ev) {
            var elementPath = ev.path,
                elements = elementPath.elements,
                a,
                lastElement;
            if (elementPath && elements) {
                lastElement = elementPath.lastElement;
                if (!lastElement) return;
                a = func(lastElement);

                if (a) {
                    bubble = getInstance(pluginName);
                    bubble._selectedEl = a;
                    bubble._plugin = pluginInstance;
                    bubble.hide();
                    bubble.show();
                } else if (bubble) {
                    bubble._selectedEl = bubble._plugin = null;
                    bubble.hide();
                }
            }
        });

        Event.on(DOM._4e_getWin(editor.document), "scroll blur", function() {
            bubble && bubble.hide();
        });
        Event.on(document, "click", function() {
            bubble && bubble.hide();
        });
    };
    function getInstance(pluginName) {
        var h = holder[pluginName];
        if (!h.bubble) {
            h.bubble = new BubbleView();
            h.bubble.renderer();
            h.cfg.init && h.cfg.init.call(h.bubble);
        }
        return h.bubble;
    }


    BubbleView.register = function(cfg) {
        var pluginName = cfg.pluginName;
        holder[pluginName] = {
            cfg:cfg
        };
    };

    KE.BubbleView = BubbleView;
});
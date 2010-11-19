/**
 * color support for kissy editor
 * @author : yiminghe@gmail.com
 */
KISSY.Editor.add("colorsupport", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        Node = S.Node,
        Event = S.Event,
        Overlay = KE.Overlay,
        TripleButton = KE.TripleButton,
        DOM = S.DOM;
    if (KE.ColorSupport) return;

    DOM.addStyleSheet(".ke-color-panel a {" +
        "display: block;" +
        "color:black;" +
        "text-decoration: none;" +
        "}" +
        "" +
        ".ke-color-panel a:hover {" +
        "color:black;" +
        "text-decoration: none;" +
        "}" +
        ".ke-color-panel a:active {" +
        "color:black;" +
        "}" +

        ".ke-color-palette {" +
        "    margin: 5px 8px 8px;" +
        "}" +

        ".ke-color-palette table {" +
        "    border: 1px solid #666666;" +
        "    border-collapse: collapse;" +
        "}" +

        ".ke-color-palette td {" +
        "    border-right: 1px solid #666666;" +
        "    height: 18px;" +
        "    width: 18px;" +
        "}" +

        "a.ke-color-a {" +
        "    height: 18px;" +
        "    width: 18px;" +
        "}" +

        "a.ke-color-a:hover {" +
        "    border: 1px solid #ffffff;" +
        "    height: 16px;" +
        "    width: 16px;" +
        "}" +
        "a.ke-color-remove {" +
        "  padding:3px 8px;" +
        "  margin:2px 0 3px 0;" +
        "}" +
        "a.ke-color-remove:hover {" +
        "    background-color: #D6E9F8;" +
        "}", "ke-color-plugin");

    function padding2(str) {
        return ("0" + str).slice(str.length - 1, str.length + 1);
    }

    var rgbColorReg = /^rgb\((\d+),(\d+),(\d+)\)$/i;

    function normalColor(color) {
        color = S.trim(color);
        if (color.charAt(0) == "#") color = color.substring(1);
        //console.log(color);
        color = color.replace(/\s+/g, "");
        var str = "",simpleColorReg = /^[0-9a-f]{3,3}$/i;

        if (simpleColorReg.test(color)) {
            str = color.replace(/[0-9a-f]/ig, function(m) {
                return m + m;
            });
        } else {
            var m = color.match(rgbColorReg);
            if (m && m[0]) {
                for (var i = 1; i < 4; i++) {
                    str += padding2(parseInt(m[i]).toString(16));
                }
            } else {
                str = color;
            }
        }
        return "#" + str.toLowerCase();
    }

    var COLORS = [
        ["000", "444", "666", "999", "CCC", "EEE", "F3F3F3", "FFF"],
        ["F00", "F90", "FF0", "0F0", "0FF", "00F", "90F", "F0F"],
        [
            "F4CCCC", "FCE5CD", "FFF2CC", "D9EAD3", "D0E0E3", "CFE2F3", "D9D2E9", "EAD1DC",
            "EA9999", "F9CB9C", "FFE599", "B6D7A8", "A2C4C9", "9FC5E8", "B4A7D6", "D5A6BD",
            "E06666", "F6B26B", "FFD966", "93C47D", "76A5AF", "6FA8DC", "8E7CC3", "C27BAD",
            "CC0000", "E69138", "F1C232", "6AA84F", "45818E", "3D85C6", "674EA7", "A64D79",
            "990000", "B45F06", "BF9000", "38761D", "134F5C", "0B5394", "351C75", "741B47",
            "660000", "783F04", "7F6000", "274E13", "0C343D", "073763", "20124D", "4C1130"
        ]
    ],
        html = "<div class='ke-color-panel'>" +
            "<a class='ke-color-remove' " +
            "href=\"javascript:void('清除');\">" +
            "清除" +
            "</a>";
    for (var i = 0; i < 3; i++) {
        html += "<div class='ke-color-palette'><table>";
        var c = COLORS[i],l = c.length / 8;
        for (var k = 0; k < l; k++) {
            html += "<tr>";
            for (var j = 0; j < 8; j++) {
                var currentColor = normalColor(c[8 * k + j]);
                html += "<td>";
                html += "<a href='javascript:void(0);' " +
                    "class='ke-color-a' " +
                    "style='background-color:"
                    + currentColor
                    + "'" +
                    "></a>";
                html += "</td>";
            }
            html += "</tr>";
        }
        html += "</table></div>";
    }
    html += "" +
        "<div>" +
        "<a class='ke-button ke-color-others'>其他颜色</a>" +
        "</div>" +
        "</div>";

    function ColorSupport(cfg) {
        var self = this;
        ColorSupport.superclass.constructor.call(self, cfg);
        self._init();
    }

    ColorSupport.ATTRS = {
        editor:{},
        styles:{},
        contentCls:{},
        text:{}
    };
    S.extend(ColorSupport, S.Base, {
        _init:function() {
            var self = this,
                editor = self.get("editor"),
                toolBarDiv = editor.toolBarDiv,
                el = new TripleButton({
                    container:toolBarDiv,
                    title:self.get("title"),
                    contentCls:self.get("contentCls")
                });

            el.on("offClick onClick", self._showColors, self);
            self.el = el;
            KE.Utils.lazyRun(self, "_prepare", "_real");
            KE.Utils.sourceDisable(editor, self);
        },
        disable:function() {
            this.el.disable();
        },
        enable:function() {
            this.el.enable();
        },
        _hidePanel:function(ev) {
            var self = this,
                el = self.el.el,
                t = ev.target,
                colorWin = self.colorWin;
            //当前按钮点击无效
            if (el._4e_equals(t) || el.contains(t)) {
                return;
            }
            colorWin.hide();
        },
        _selectColor:function(ev) {
            ev.halt();
            var self = this,
                t = ev.target;
            if (DOM._4e_name(t) == "a" && !DOM.hasClass(t, "ke-button")) {
                t = new Node(t);
                self._applyColor(normalColor(t._4e_style("background-color")));
                self.colorWin.hide();
            }
        },
        _applyColor:function(c) {
            var self = this,
                editor = self.get("editor"),
                doc = editor.document,
                styles = self.get("styles");
            editor.fire("save");
            if (c)
                new KE.Style(styles, {
                    color:c
                }).apply(doc);
            else
            // Value 'inherit'  is treated as a wildcard,
            // which will match any value.
            //清除已设格式
                new KE.Style(styles, {
                    color:"inherit"
                }).remove(doc);
            editor.fire("save");
        },
        _prepare:function() {
            var self = this,
                doc = document,
                el = self.el,
                editor = self.get("editor"),
                colorPanel;
            self.colorWin = new Overlay({
                elCls:"ks-popup",
                content:html,
                focus4e:false,
                width:"170px",
                zIndex:editor.baseZIndex(KE.zIndexManager.POPUP_MENU)
            });

            var colorWin = self.colorWin;
            colorWin.renderer();
            colorPanel = colorWin.get("contentEl");
            colorPanel.on("click", self._selectColor, self);

            self.colorPanel = colorPanel;
            Event.on(doc, "click", self._hidePanel, self);
            Event.on(editor.document, "click", self._hidePanel, self);

            colorWin.on("show", el.bon, el);
            colorWin.on("hide", el.boff, el);
            var others = colorPanel.one(".ke-color-others");
            others.on("click", function(ev) {
                ev.halt();
                colorWin.hide();
                editor.useDialog("colorsupport/dialog", function(dialog) {
                    dialog.show(self);
                });
            });
        },
        _real:function() {
            var self = this,
                el = self.el.el,
                colorPanel = self.colorPanel,
                xy = el.offset();
            xy.top += el.height() + 5;
            if (xy.left + colorPanel.width() > DOM.viewportWidth() - 60) {
                xy.left = DOM.viewportWidth() - colorPanel.width() - 60;
            }
            self.colorWin.set("xy",[xy.left,xy.top]);
            self.colorWin.show();
        },
        _showColors:function(ev) {
            var self = this,
                colorWin = self.colorWin;
            if (colorWin && colorWin.get("visible")) {
                colorWin.hide();
            } else {
                self._prepare(ev);
            }
        }
    });
    KE.ColorSupport = ColorSupport;
});

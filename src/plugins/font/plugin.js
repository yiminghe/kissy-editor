/**
 * font formatting for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("font", function(editor) {

    function wrapFont(vs) {
        var v = [];
        for (var i = 0;
             i < vs.length;
             i++) {
            v.push({
                name:vs[i],
                value:vs[i]
            });
        }
        return v;
    }

    var S = KISSY,
        KE = S.Editor,
        KEStyle = KE.Style,
        TripleButton = KE.TripleButton,
        pluginConfig = editor.cfg.pluginConfig,
        Node = S.Node;

    var FONT_SIZES = pluginConfig["font-size"],item,name,attrs;

    if (FONT_SIZES !== false) {

        FONT_SIZES = FONT_SIZES || {};

        S.mix(FONT_SIZES, {
            items:wrapFont(["8px","10px","12px",
                "14px","18px","24px",
                "36px","48px","60px","72px","84px","96px"]),
            width:"55px"
        }, false);

        var FONT_SIZE_STYLES = {},
            FONT_SIZE_ITEMS = [],
            fontSize_style = {
                element        : 'span',
                styles        : { 'font-size' : '#(size)' },
                overrides    : [
                    { element : 'font', attributes : { 'size' : null } }
                ]
            };

        for (i = 0; i < FONT_SIZES.items.length; i++) {
            item = FONT_SIZES.items[i];
            name = item.name;
            attrs = item.attrs;
            var size = item.value;

            FONT_SIZE_STYLES[size] = new KEStyle(fontSize_style, {
                size:size
            });

            FONT_SIZE_ITEMS.push({
                name:name,
                value:size,
                attrs:attrs
            });
        }

        pluginConfig["font-size"] = FONT_SIZES;
    }


    /*
     FONT_SIZE_STYLES["inherit"] = new KEStyle(fontSize_style, {
     size:"inherit"
     });
     */

    var FONT_FAMILIES = pluginConfig["font-family"];

    if (FONT_FAMILIES !== false) {

        FONT_FAMILIES = FONT_FAMILIES || {};

        S.mix(FONT_FAMILIES, {
            items:[
                //ie 不认识中文？？？
                {name:"宋体",value:"SimSun"},
                {name:"黑体",value:"SimHei"},
                {name:"隶书",value:"LiSu"},
                {name:"楷体",value:"KaiTi_GB2312"},
                {name:"微软雅黑",value:"Microsoft YaHei"},
                {name:"Georgia",value:"Georgia"},
                {name:"Times New Roman",value:"Times New Roman"},
                {name:"Impact",value:"Impact"},
                {name:"Courier New",value:"Courier New"},
                {name:"Arial",value:"Arial"},
                {name:"Verdana",value:"Verdana"},
                {name:"Tahoma",value:"Tahoma"}
            ],
            width:"130px"
        }, false);


        var FONT_FAMILY_STYLES = {},
            FONT_FAMILY_ITEMS = [],
            fontFamily_style = {
                element        : 'span',
                styles        : { 'font-family' : '#(family)' },
                overrides    : [
                    { element : 'font', attributes : { 'face' : null } }
                ]
            },i;


        pluginConfig["font-family"] = FONT_FAMILIES;


        for (i = 0; i < FONT_FAMILIES.items.length; i++) {
            item = FONT_FAMILIES.items[i];
            name = item.name;
            attrs = item.attrs || {};
            var value = item.value;
            attrs.style = attrs.style || "";
            attrs.style += ";font-family:" + value;
            FONT_FAMILY_STYLES[value] = new KEStyle(fontFamily_style, {
                family:value
            });
            FONT_FAMILY_ITEMS.push({
                name:name,
                value:value,
                attrs:attrs
            });
        }
    }

    /*
     FONT_FAMILY_STYLES["inherit"] = new KEStyle(fontFamily_style, {
     family:"inherit"
     });*/

    if (!KE.FontSelect) {
        (function() {


            function Font(cfg) {
                var self = this;
                Font['superclass'].constructor.call(self, cfg);
                self._init();
            }

            Font.ATTRS = {
                title:{},
                html:{},
                styles:{},
                editor:{}
            };
            var Select = KE.Select;
            S.extend(Font, S.Base, {

                _init:function() {
                    var self = this,
                        editor = self.get("editor"),
                        toolBarDiv = editor.toolBarDiv,
                        html = self.get("html");
                    self.el = new Select({
                        container: toolBarDiv,
                        doc:editor.document,
                        width:self.get("width"),
                        popUpWidth:self.get("popUpWidth"),
                        title:self.get("title"),
                        items:self.get("html"),
                        showValue:self.get("showValue"),
                        menuContainer:new Node(document.body)
                    });

                    self.el.on("click", self._vChange, self);
                    editor.on("selectionChange", self._selectionChange, self);
                    KE.Utils.sourceDisable(editor, self);
                },
                disable:function() {
                    this.el.set("state", Select.DISABLED);
                },
                enable:function() {
                    this.el.set("state", Select.ENABLED);
                },

                _vChange:function(ev) {
                    var self = this,
                        editor = self.get("editor"),
                        v = ev.newVal,
                        pre = ev.prevVal,
                        styles = self.get("styles");
                    editor.focus();
                    editor.fire("save");
                    var style = styles[v];
                    if (v == pre) {
                        //清除,wildcard pls
                        //!TODO inherit 小问题，在中间点inherit
                        style.remove(editor.document);
                        self.el.set("value", "");
                    } else {
                        style.apply(editor.document);
                    }
                    editor.fire("save");
                },

                _selectionChange:function(ev) {
                    var self = this,
                        editor = self.get("editor"),
                        elementPath = ev.path,
                        elements = elementPath.elements,
                        styles = self.get("styles");
                    //S.log(ev);
                    // For each element into the elements path.
                    for (var i = 0, element; i < elements.length; i++) {
                        element = elements[i];
                        // Check if the element is removable by any of
                        // the styles.
                        for (var value in styles) {
                            if (styles[ value ].checkElementRemovable(element, true)) {
                                //S.log(value);
                                self.el.set("value", value);
                                return;
                            }
                        }
                    }
                    this.el.reset("value");
                }
            });
            KE.FontSelect = Font;
        })();
    }



        if (false !== pluginConfig["font-size"]) {
            new KE.FontSelect({
                editor:editor,
                title:"大小",
                width:"30px",
                showValue:true,
                popUpWidth:FONT_SIZES.width,
                styles:FONT_SIZE_STYLES,
                html:FONT_SIZE_ITEMS
            });
        }

        if (false !== pluginConfig["font-family"]) {
            new KE.FontSelect({
                editor:editor,
                title:"字体",
                width:"110px",
                popUpWidth:FONT_FAMILIES.width,
                styles:FONT_FAMILY_STYLES,
                html:FONT_FAMILY_ITEMS
            });
        }


        var singleFontTpl = {
            mode:KE.WYSIWYG_MODE,
            offClick:function() {
                var self = this,
                    editor = self.editor,
                    style = self.cfg.style;
                editor.fire("save");
                style.apply(editor.document);
                editor.fire("save");
                editor.notifySelectionChange();
                editor.focus();
            },
            onClick:function() {
                var self = this,
                    editor = self.editor,
                    style = self.cfg.style;
                editor.fire("save");
                style.remove(editor.document);
                editor.fire("save");
                editor.notifySelectionChange();
                editor.focus();
            },
            selectionChange:function(ev) {
                var self = this,
                    style = self.cfg.style,
                    btn = self.btn,
                    elementPath = ev.path;
                if (style.checkActive(elementPath)) {
                    btn.set("state", TripleButton.ON);
                } else {
                    btn.set("state", TripleButton.OFF);
                }
            }
        };

        if (false !== pluginConfig["font-bold"]) {
            editor.addButton("font-bold", S.mix({
                contentCls:"ke-toolbar-bold",
                title:"粗体 ",
                style:new KEStyle({
                    element        : 'strong',
                    overrides    : [
                        { element : 'b' },
                        {element        : 'span',
                            attributes         : { style:'font-weight: bold;' }}
                    ]
                })
            }, singleFontTpl));
        }

        if (false !== pluginConfig["font-italic"]) {
            editor.addButton("font-italic", S.mix({
                contentCls:"ke-toolbar-italic",
                title:"斜体 ",
                style:new KEStyle({
                    element        : 'em',
                    overrides    : [
                        { element : 'i' },
                        {element        : 'span',
                            attributes         : { style:'font-style: italic;' }}
                    ]
                })
            }, singleFontTpl));
        }

        if (false !== pluginConfig["font-underline"]) {
            editor.addButton("font-underline", S.mix({
                contentCls:"ke-toolbar-underline",
                title:"下划线 ",
                style:new KEStyle({
                    element        : 'u',
                    overrides    : [
                        {element        : 'span',
                            attributes         : { style:'text-decoration: underline;' }}
                    ]
                })
            }, singleFontTpl));
        }

        if (false !== pluginConfig["font-strikeThrough"]) {
            editor.addButton("font-underline", S.mix({
                contentCls:"ke-toolbar-strikeThrough",
                title:"删除线 ",
                style:new KEStyle({
                    element        : 'del',
                    overrides    : [
                        {element        : 'span',
                            attributes         : { style:'text-decoration: line-through;' }},
                        { element : 's' }
                    ]
                })
            }, singleFontTpl));
        }


});

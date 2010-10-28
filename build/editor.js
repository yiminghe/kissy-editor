/**
 * Constructor for kissy editor and module dependency definition
 * @author: yiminghe@gmail.com, lifesinger@gmail.com
 * @version: 2.0
 * @buildtime: 2010-10-28 20:48:57
 */
KISSY.add("editor", function(S, undefined) {
    var DOM = S.DOM;

    function Editor(textarea, cfg) {
        var self = this;

        if (!(self instanceof Editor)) {
            return new Editor(textarea, cfg);
        }

        if (S.isString(textarea)) {
            textarea = S.one(textarea);
        }
        textarea = DOM._4e_wrap(textarea);
        cfg = cfg || {};
        cfg.pluginConfig = cfg.pluginConfig || {};
        self.cfg = cfg;
        S.app(self, S.EventTarget);

        /**
         * templates,separator,image,separator ->
         * templates,separator,image,separator2
         * work around for 重复 attach
         * @param mods
         */
        function duplicateMods(mods) {
            var existMods = Editor.Env.mods;
            for (var i = 0; i < mods.length; i++) {
                var mod = mods[i],dup = false;
                for (var j = 0; j < i; j++) {
                    var mod2 = mods[j];
                    if (mod == mod2) {
                        dup = true;
                        break;
                    }
                }
                var existMod = existMods[mod];

                if (dup && existMod) {
                    var newMod = S.clone(existMod),newName = mod + "_" + i;
                    newMod.name = newName;
                    mods[i] = newName;
                    if (!existMods[newName]) {
                        existMods[newName] = newMod;
                    }
                }
            }
        }

        /**
         * 存在问题：
         * use 涉及动态加载时
         * 1.相同的模块名不会重复attach
         * 2.不同模块名相同js路径也不会重复attach
         * @param mods
         * @param callback
         */
        var BASIC = ["htmldataprocessor", "enterkey", "clipboard"],
            initial = false;
        self.use = function(mods, callback) {
            mods = mods.split(",");
            duplicateMods(mods);
            if (!initial) {
                for (var i = 0; i < BASIC.length; i++) {
                    var b = BASIC[i];
                    if (!S.inArray(b, mods)) {
                        mods.unshift(b);
                    }
                }
            }
            S.use.call(self, mods.join(","), function() {

                self.ready(function() {
                    callback && callback.call(self);
                    //也用在窗口按需加载，只有在初始化时才进行内容设置
                    if (!initial) {
                        self.setData(textarea.val());
                        //是否自动focus
                        if (cfg.focus) {
                            self.focus();
                        }
                        //否则清空选择区域
                        else {
                            var sel = self.getSelection();
                            sel && sel.removeAllRanges();
                        }
                        self.fire("save");
                        initial = true;
                    }
                });

            }, { order:  true, global:  Editor });
            return self;
        };
        self.init(textarea);
        return self;
    }

    S.app(Editor, S.EventTarget);
    Editor.Config.base = S.Config.base + "editor/";
    function debugUrl(url) {
        if (!debug) return  url.replace(/\.(js|css)/i, "-min.$1");
        if (debug === "dev") {
            return "../src/" + url;
        }
        return url;
    }

    var debug = S.Config.debug,
        core_mods = [
            "utils",
            "focusmanager",
            "definition",
            "dtd",
            "dom",
            "elementpath",
            "walker",
            "range",
            "domiterator",
            "selection",
            "styles",
            "htmlparser",
            "htmlparser-basicwriter",
            "htmlparser-comment",
            "htmlparser-element",
            "htmlparser-filter",
            "htmlparser-fragment",
            "htmlparser-htmlwriter",
            "htmlparser-text"
        ],
        plugin_mods = [
            "separator",
            "sourcearea/support",
            "tabs",
            "flashbridge",
            "flashutils",
            "clipboard",
            {
                name: "colorsupport",
                requires:["overlay"]
            },
            {
                name: "forecolor",
                requires:["colorsupport"]
            },
            {
                name: "bgcolor",
                requires:["colorsupport"]
            },
            {
                name: "elementpaths"
            },
            "enterkey",
            {
                name:"pagebreak",
                requires:["fakeobjects"]
            },
            {
                name:"fakeobjects",
                requires:["htmldataprocessor"]
            },
            {
                name:"draft",
                requires:["localStorage"]
            },
            {
                name:"flash",
                requires:["flash/support"]
            },
            {
                name:"flash/dialog"
            },
            {
                name: "flash/support",
                requires: ["flashutils","contextmenu",
                    "fakeobjects","bubbleview"]
            },
            {
                name:"font",
                requires:["select"]
            },
            "format",
            {
                name: "htmldataprocessor"
            },
            {
                name: "image",
                requires: ["contextmenu","bubbleview"]
            },
            {
                name:"image/dialog",
                requires:["tabs"]
            },
            "indent",
            "justify",
            {
                name:"link",
                requires: ["bubbleview"]
            },
            {
                name:"link/dialog"
            },
            "list",
            "maximize",
            {
                name:"music",
                requires:["flash/support"]
            },
            {
                name:"music/dialog",
                requires:["flash/dialog"]
            },
            "preview",
            "removeformat",
            {
                name: "smiley"
            },
            {
                name:"sourcearea",
                requires:["sourcearea/support"]
            },
            {
                name: "table",
                requires: ["contextmenu"]
            },
            {
                name: "table/dialog"
            },
            {
                name: "templates",
                requires: ["overlay"]
            },
            "undo",
            {
                name:"resize",
                requires:["dd"]
            }
        ],

        mis_mods = [
            {
                name:"localStorage",
                requires:["flashutils",
                    "flashbridge"]
            },
            {name:"button"},
            {name:"dd"},
            {name:"progressbar"},
            {
                name:"overlay",
                requires:["dd"]
            },
            {
                name: "contextmenu",
                requires: ["overlay"]
            },
            {
                name: "bubbleview",
                requires: ["overlay"]
            },
            {
                name: "select",
                requires: ["overlay"]
            }
        ],
        i, len, mod, name, requires,mods = {};
    for (i = 0,len = plugin_mods.length; i < len; i++) {
        mod = plugin_mods[i];
        if (S.isString(mod)) {
            mod = plugin_mods[i] = {
                name:mod
            };
        }
        requires = mod.requires || [];
        var basicMod = ["button"];
        if (mod.name.indexOf("/dialog") != -1) {
            basicMod.push("overlay");
        }
        mod.requires = requires.concat(basicMod);
    }
    plugin_mods = mis_mods.concat(plugin_mods);
    // ui modules
    // plugins modules
    for (i = 0,len = plugin_mods.length; i < len; i++) {
        mod = plugin_mods[i];
        name = mod.name;
        mods[name] = {
            attach: false,
            charset:"utf-8",
            requires: mod.requires,
            csspath: (mod.useCss ? debugUrl("plugins/" + name + "/plugin.css?t=" +
                encodeURIComponent("2010-10-28 20:48:57")+
                "") : undefined),
            path: debugUrl("plugins/" + name + "/plugin.js?t=" +
                encodeURIComponent("2010-10-28 20:48:57")+
                "")
        };
    }
    Editor.add(mods);
    S.Editor = Editor;
    S.log(core_mods);
});

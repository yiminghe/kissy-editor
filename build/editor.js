/**
 * Constructor for kissy editor and module dependency definition
 * @author: yiminghe@gmail.com, lifesinger@gmail.com
 * @version: 2.0
 * @buildtime: 2010-10-22 18:02:58
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
        var BASIC = ["htmldataprocessor", "enterkey", "clipboard"];
        self.use = function(mods, callback) {
            mods = mods.split(",");
            duplicateMods(mods);

            for (var i = 0; i < BASIC.length; i++) {
                var b = BASIC[i];
                if (!S.inArray(b, mods)) {
                    mods.unshift(b);
                }
            }

            S.use.call(self, mods.join(","), function() {

                self.ready(function() {
                    callback && callback.call(self);
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
                });

            }, { order:  true, global:  Editor });
            return self;
        };
        self.init(textarea);
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
        mods = {
            "htmlparser": {
                attach: false,
                path: debugUrl("plugins/htmldataprocessor/htmlparser/htmlparser.js")
            }
        },
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
            "styles"
        ],
        plugin_mods = [
            "separator",
            "sourceareasupport",
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
                requires:["flashsupport"]
            },
            {
                name: "flashsupport",
                requires: ["flashutils","contextmenu",
                    "fakeobjects","overlay","bubbleview"]
            },
            {
                name:"font",
                requires:["select"]
            },
            "format",
            {
                name: "htmldataprocessor",
                requires: ["htmlparser-text"]
            },
            {
                name: "image",
                requires: ["overlay","contextmenu","bubbleview","tabs"]
            },
            "indent",
            "justify",
            {
                name:"link",
                requires: ["bubbleview"]
            },
            "list",
            "maximize",
            {
                name:"music",
                requires:["flashsupport"]
            },
            "preview",
            "removeformat",
            {
                name: "smiley"
            },
            {
                name:"sourcearea",
                requires:["sourceareasupport"]
            },
            {
                name: "table",
                //useCss: true,
                requires: ["overlay",
                    "contextmenu"]
            },
            {
                name: "templates",
                requires: ["overlay"]//,
                //useCss: true
            },
            "undo",
            {
                name:"resize",
                requires:["dd"]
            }
        ],
        htmlparser_mods = [
            {
                name: "htmlparser-basicwriter",
                requires: ["htmlparser"]
            },
            {
                name: "htmlparser-element",
                requires: ["htmlparser-fragment"]
            },
            {
                name: "htmlparser-filter",
                requires: ["htmlparser-element"]
            },
            {
                name: "htmlparser-fragment",
                requires: ["htmlparser-htmlwriter"]
            },
            {
                name: "htmlparser-htmlwriter",
                requires: ["htmlparser-basicwriter"]
            },
            {
                name: "htmlparser-text",
                requires: ["htmlparser-comment"]
            }
            ,
            {
                name: "htmlparser-comment",
                requires: ["htmlparser-filter"]
            }
        ],
        mis_mods = [
            {
                name:"localStorage",
                requires:["flashutils","flashbridge"]
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
                requires: ["overlay"]   //,
                //useCss:true
            },
            {
                name: "bubbleview",
                requires: ["overlay"]   //,
                //useCss:true
            },
            {
                name: "select",
                requires: ["overlay"]   //,
                //useCss:true
            }
        ],
        i, len, mod, name, requires;
    for (i = 0,len = plugin_mods.length; i < len; i++) {
        mod = plugin_mods[i];
        if (S.isString(mod)) {
            mod = plugin_mods[i] = {
                name:mod
            };
        }
        mod.requires = mod.requires || [];
        mod.requires = mod.requires.concat(["button"]);
    }
    plugin_mods = mis_mods.concat(plugin_mods);
    // ui modules
    // plugins modules
    for (i = 0,len = plugin_mods.length; i < len; i++) {
        mod = plugin_mods[i];
        name = mod.name;
        mods[name] = {
            attach: false,
            requires: mod.requires,
            csspath: (mod.useCss ? debugUrl("plugins/" + name + "/plugin.css") : undefined),
            path: debugUrl("plugins/" + name + "/plugin.js")
        };
    }

    // htmlparser
    for (i = 0,len = htmlparser_mods.length; i < len; i++) {
        mod = htmlparser_mods[i];
        requires = undefined;

        if (!S.isString(mod)) {
            requires = mod.requires;
            mod = mod.name;
        }

        mods[mod] = {
            attach: false,
            requires: requires,
            path: debugUrl("plugins/htmldataprocessor/htmlparser/" + mod.substring(11) + ".js")
        };
    }
    for (i = 0,len = core_mods.length; i < len; i++) {
        mod = core_mods[i];
        mods[mod] = {
            host: "editor",
            requires: i > 0 ? core_mods[i - 1] : []
        };
    }
    Editor.add(mods);
    S.Editor = Editor;
});

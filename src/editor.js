/**
 * @preserve Constructor for kissy editor and module dependency definition
 *      thanks to CKSource's intelligent work on CKEditor
 * @author: yiminghe@gmail.com, lifesinger@gmail.com
 * @version: 2.1
 * @buildtime: @TIMESTAMP@
 */
KISSY.add("editor", function(S, undefined) {
    var DOM = S.DOM,
        TRUE = true,
        FALSE = false,
        NULL = null;

    /**
     * 初始化编辑器
     * @constructor
     * @param textarea {(string)} 将要替换的 textarea
     * @param cfg {Object} 编辑器配置
     * @return {Editor} 返回编辑器实例
     */
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
        cfg.pluginConfig = cfg["pluginConfig"] || {};
        self.cfg = cfg;
        //export for closure compiler
        cfg["pluginConfig"] = cfg.pluginConfig;
        self["cfg"] = cfg;
        S.app(self, S.EventTarget);

        /**
         * templates,separator,image,separator ->
         * templates,separator,image,separator2
         * work around for 重复 attach
         * @param mods {Array.<string>}
         */
        function duplicateMods(mods) {
            var existMods = Editor["Env"]["mods"];
            for (var i = 0; i < mods.length; i++) {
                var mod = mods[i],dup = FALSE;
                for (var j = 0; j < i; j++) {
                    var mod2 = mods[j];
                    if (mod == mod2) {
                        dup = TRUE;
                        break;
                    }
                }
                var existMod = existMods[mod];

                if (dup && existMod) {
                    var newMod = S.clone(existMod),
                        newName = mod + "_" + i;
                    newMod["name"] = newName;
                    mods[i] = newName;
                    if (!existMods[newName]) {
                        existMods[newName] = newMod;
                    }
                }
            }
        }


        var BASIC = ["htmldataprocessor", "enterkey", "clipboard"],
            initial = FALSE;
        /**
         * 存在问题：
         * use 涉及动态加载时
         * 1.相同的模块名不会重复 attach
         * 2.不同模块名相同 js 路径也不会重复 attach
         * @param mods {Array.<string>} ，模块名可以重复
         * @param callback {function()} ，插件载入后回调
         */
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
            //编辑器实例 use 时会进行编辑器 ui 操作而不单单是功能定义，必须 ready
            self.ready(function() {
                S.use.call(self, mods.join(","), function() {
                    callback && callback.call(self);
                    //也用在窗口按需加载，只有在初始化时才进行内容设置
                    if (!initial) {
                        self.setData(textarea.val());
                        //是否自动focus
                        if (cfg["focus"]) {
                            self.focus();
                        }
                        //否则清空选择区域
                        else {
                            var sel = self.getSelection();
                            sel && sel.removeAllRanges();
                        }
                        self.fire("save");
                        initial = TRUE;
                    }
                }, { "order":  TRUE, "global":  Editor });
            });

            return self;
        };
        self["use"] = self.use;
        self.init(textarea);
        return self;
    }

    S.app(Editor, S.EventTarget);
    Editor["Config"]["base"] = S["Config"]["base"] + "editor/";

    /**
     * 便于在开发环境与部署环境下切换
     * @param url {string}
     * @return {string} 对应环境的 url
     */
    function debugUrl(url) {
        var debug = S["Config"]["debug"],re;
        if (!debug) re = url.replace(/\.(js|css)/i, "-min.$1");
        else if (debug === "dev") {
            re = "../src/" + url;
        } else {
            re = url
        }
        if (re.indexOf("?") != -1) {
            re += "&";
        } else {
            re += "?";
        }
        re += "t=" + encodeURIComponent("@TIMESTAMP@");
        return  re;
    }

    //实例与实例模块间的依赖
    //类与类模块间的依赖
    //统一在这里
    //实例引入类模块，程序里分别写
    var debug = S["Config"]["debug"],

        plugin_mods = [
            "separator",
            "sourcearea/support",
            "tabs",
            "flashbridge",
            "flashutils",
            "clipboard",
            "colorsupport/dialog/colorpicker",
            {
                "name": "colorsupport"
            },
            "color/dialog",
            "color",
            "elementpaths",
            "enterkey",
            {
                "name":"pagebreak",
                "requires":["fakeobjects"]
            },
            {
                "name":"fakeobjects",
                "requires":["htmldataprocessor"]
            },
            "draft",
            {
                "name":"draft/support",
                "requires":["localstorage"]
            },
            {
                "name":"flash",
                "requires":["fakeobjects"]
            },
            "flash/dialog",
            "flash/dialog/support",
            {
                "name": "flash/support",
                "requires": ["flashutils","contextmenu",
                    "bubbleview"]
            },
            {
                "name":"font",
                "requires":["select"]
            },
            "format",
            "htmldataprocessor",
            {
                "name": "image"
            },
            {
                "name":"image/dialog",
                "requires":["tabs"]
            },
            "indent",
            "indent/support",
            "justify",
            {
                "name":"link"
            },
            "link/dialog",
            "list/support",
            "list",
            "maximize",
            "maximize/support",
            {
                "name":"music/support",
                "requires":["flash/support"]
            },
            {
                "name":"music",
                "requires":["fakeobjects"]
            },
            "music/dialog",
            {
                "name":"music/dialog/support",
                "requires":["flash/dialog/support"]
            },
            "preview",
            "removeformat",
            "smiley",
            {
                name:"smiley/support"
            },
            {
                "name":"sourcearea",
                "requires":["sourcearea/support"]
            },
            {
                "name": "table"
            },
            {
                "name": "table/support",
                "requires": ["contextmenu"]
            },
            "table/dialog",
            {
                "name": "templates"
            },
            "undo",
            {
                "name":"resize"
            }
        ],

        mis_mods = [
            {
                "name":"localstorage",
                "requires":["flashutils",
                    "flashbridge"]
            },
            {
                "name":"button"
            },
            "progressbar",
            //编辑器自己的 overlay，需要use
            "overlay",
            {
                "name": "contextmenu",
                requires:["overlay"]
            },
            {
                "name": "bubbleview",
                requires:["overlay"]
            },
            {
                "name": "select",
                requires:["overlay"]
            }
        ],
        i,len,

        mod,
        name,requires,mods = {};

    for (i = 0,len = plugin_mods.length; i < len; i++) {
        mod = plugin_mods[i];
        if (S.isString(mod)) {
            mod = plugin_mods[i] = {
                //强制转型，防止compiler报错
                "name":(mod + ""),
                //强制转型，防止compiler报错
                "requires":NULL
            };
        }
        requires = mod["requires"] || [];
        var basicMod = ["button"];

        mod["requires"] = requires.concat(basicMod);
    }
    plugin_mods = mis_mods.concat(plugin_mods);
    // ui modules
    // plugins modules
    for (i = 0,len = plugin_mods.length; i < len; i++) {
        mod = plugin_mods[i];
        name = mod["name"] || mod;
        mods[name] = {
            "attach": FALSE,
            "charset":"utf-8",
            "requires": mod["requires"],
            "csspath": (mod['useCss'] ? debugUrl("plugins/" + name + "/plugin.css") : undefined),
            "path": debugUrl("plugins/" + name + "/plugin.js")
        };
    }

    Editor.add(mods);
    /**
     * @constructor
     */
    S.Editor = Editor;
    /**
     * @constructor
     */
    S["Editor"] = Editor;
    //S.log(core_mods);
});
/**
 * 目标：分离，解耦，模块化，去除重复代码
 * 分裂为三个部分
 * 1.纯粹 UI 模块 ：overlay,bubbleview
 * 2.编辑器功能模块 : TableUI
 * 3.编辑器attach功能模块 : table
 */

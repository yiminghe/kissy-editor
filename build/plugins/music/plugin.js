/**
 * insert music for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("music", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        Flash = KE.Flash,
        CLS_MUSIC = "ke_music",
        TYPE_MUSIC = 'music',
        MUSIC_PLAYER = "niftyplayer.swf",
        getFlashUrl = KE.Utils.getFlashUrl,
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter,
        TIP = "请输入如 http://xxx.com/xx.mp3";


    function music(src) {
        return src.indexOf(MUSIC_PLAYER) != -1;
    }

    dataFilter && dataFilter.addRules({
        elements : {
            'object' : function(element) {
                var attributes = element.attributes,i,
                    classId = attributes['classid'] &&
                        String(attributes['classid']).toLowerCase();
                if (!classId) {
                    // Look for the inner <embed>
                    for (i = 0; i < element.children.length; i++) {
                        if (element.children[ i ].name == 'embed') {
                            if (!Flash.isFlashEmbed(element.children[ i ]))
                                return null;
                            if (music(element.children[ i ].attributes.src)) {
                                return dataProcessor.createFakeParserElement(element, CLS_MUSIC, TYPE_MUSIC, true);
                            }

                        }
                    }
                    return null;
                }

                for (i = 0; i < element.children.length; i++) {
                    var c = element.children[ i ];
                    if (c.name == 'param' && c.attributes.name == "movie") {
                        if (music(c.attributes.value)) {
                            return dataProcessor.createFakeParserElement(element, CLS_MUSIC, TYPE_MUSIC, true);
                        }
                    }
                }

            },

            'embed' : function(element) {
                if (!Flash.isFlashEmbed(element))
                    return null;
                if (music(element.attributes.src)) {
                    return dataProcessor.createFakeParserElement(element, CLS_MUSIC, TYPE_MUSIC, true);
                }

            }
            //4 �?flash 的优先级 5 高！
        }}, 4);

    //重构，和flash结合起来，抽�?
    if (!KE.MusicInserter) {
        (function() {
            var MUSIC_PLAYER_CODE = KE.Config.base + 'plugins/music/niftyplayer.swf?file=#(music)"',
                bodyHtml = "" +
                    "<p>" +
                    "<label><span style='color:#0066CC;font-weight:bold;'>音乐网址�?" +
                    "</span><input class='ke-music-url' style='width:230px' " +
                    "value='"
                    + TIP
                    + "'/></label>" +
                    "</p>" +
                    "<p style='margin:5px 0'><label>�?nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;齐： " +
                    "<select class='ke-music-align'>" +
                    "<option value=''>�?/option>" +
                    "<option value='left'>左对�?/option>" +
                    "<option value='right'>右对�?/option>" +
                    "</select>" +
                    "<p>",
                footHtml = "<button class='ke-music-ok'>确定</button> " +
                    "<button class='ke-music-cancel'>取消</button>",
                music_reg = /#\(music\)/g,
                flashRules = ["img." + CLS_MUSIC];

            function MusicInserter(editor) {
                MusicInserter.superclass.constructor.apply(this, arguments);
            }

            function checkMusic(lastElement) {
                return lastElement._4e_ascendant(function(node) {
                    return node._4e_name() === 'img' && (!!node.hasClass(CLS_MUSIC));
                }, true);
            }


            S.extend(MusicInserter, Flash, {
                _config:function() {
                    var self = this,
                        editor = self.editor;
                    self._cls = CLS_MUSIC;
                    self._type = TYPE_MUSIC;
                    self._title = "音乐属�?";
                    self._bodyHtml = bodyHtml;
                    self._footHtml = footHtml;
                    self._contentCls = "ke-toolbar-music";
                    self._tip = "插入音乐";
                    self._contextMenu = contextMenu;
                    self._flashRules = flashRules;
                },
                _initD:function() {
                    var self = this,
                        editor = self.editor,
                        d = self.d;
                    self.dUrl = d.el.one(".ke-music-url");
                    self.dAlign = d.el.one(".ke-music-align");
                    var action = d.el.one(".ke-music-ok"),
                        cancel = d.el.one(".ke-music-cancel");
                    action.on("click", self._gen, self);
                    cancel.on("click", function() {
                        self.d.hide();
                    });
                },

                _getDInfo:function() {
                    var self = this;
                    return {
                        url:  MUSIC_PLAYER_CODE.replace(music_reg, self.dUrl.val()),
                        attrs:{
                            width:165,
                            height:37,
                            align:self.dAlign.val()
                        }
                    };
                },

                _getFlashUrl:function(r) {
                    return   getMusicUrl(getFlashUrl(r));
                },
                _updateD:function() {
                    var self = this,
                        editor = self.editor,
                        f = self.selectedFlash;
                    if (f) {
                        var r = editor.restoreRealElement(f);
                        self.dUrl.val(self._getFlashUrl(r));
                        self.dAlign.val(f.attr("align"));
                    } else {
                        self.dUrl.val(TIP);
                        self.dAlign.val("");
                    }
                }
            });
            function getMusicUrl(url) {
                return url.replace(/^.+niftyplayer\.swf\?file=/, "");
            }

            Flash.registerBubble("music", "音乐网址�?", checkMusic);
            KE.MusicInserter = MusicInserter;
            var contextMenu = {
                "音乐属�?":function(editor) {
                    var selection = editor.getSelection(),
                        startElement = selection && selection.getStartElement(),
                        flash = startElement && checkMusic(startElement),
                        flashUI = editor._toolbars[TYPE_MUSIC];
                    if (flash) {
                        flashUI.show(null, flash);
                    }
                }
            };
        })();
    }


    editor.addPlugin(function() {
        new KE.MusicInserter(editor);
    });

});
/**
 * insert music for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("music", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        DOM = S.DOM,
        UA = S.UA,
        Event = S.Event,
        Flash = KE.Flash,
        CLS_MUSIC = "ke_music",
        TYPE_MUSIC = 'music',
        MUSIC_PLAYER = "niftyplayer.swf",
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter;


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
            //4 比 flash 的优先级 5 高！
        }}, 4);

    //重构，和flash结合起来，抽象
    if (!KE.MusicInserter) {
        (function() {
            var flashRules = ["img." + CLS_MUSIC];

            function MusicInserter(editor) {
                MusicInserter.superclass.constructor.apply(this, arguments);
                //只能ie能用？，目前只有firefox,ie支持图片缩放
                var disableObjectResizing = editor.cfg.disableObjectResizing;
                if (!disableObjectResizing) {
                    Event.on(editor.document.body, UA.ie ? 'resizestart' : 'resize', function(evt) {
                        //console.log(evt.target);
                        if (DOM.hasClass(evt.target, CLS_MUSIC))
                            evt.preventDefault();
                    });
                }
            }

            function checkMusic(node) {
                return node._4e_name() === 'img' && (!!node.hasClass(CLS_MUSIC)) && node;
            }


            S.extend(MusicInserter, Flash, {
                _config:function() {
                    var self = this,
                        editor = self.editor;
                    self._cls = CLS_MUSIC;
                    self._type = TYPE_MUSIC;
                    self._contentCls = "ke-toolbar-music";
                    self._tip = "插入音乐";
                    self._contextMenu = contextMenu;
                    self._flashRules = flashRules;
                }
            });


            Flash.registerBubble("music", "音乐网址： ", checkMusic);
            KE.MusicInserter = MusicInserter;
            var contextMenu = {
                "音乐属性":function(editor) {
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
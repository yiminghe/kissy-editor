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

        MUSIC_PLAYER = "niftyplayer.swf",
        dataProcessor = editor.htmlDataProcessor,
        dataFilter = dataProcessor && dataProcessor.dataFilter;


    function music(src) {
        return src.indexOf(MUSIC_PLAYER) != -1;
    }

    var CLS_MUSIC = "ke_music",
        TYPE_MUSIC = 'music';

    editor.ready(function() {
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
                                if (!KE.Utils.isFlashEmbed(element.children[ i ]))
                                    return null;
                                if (music(element.children[ i ].attributes.src)) {
                                    return dataProcessor.createFakeParserElement(element,
                                        CLS_MUSIC, TYPE_MUSIC, true);
                                }
                            }
                        }
                        return null;
                    }
                    for (i = 0; i < element.children.length; i++) {
                        var c = element.children[ i ];
                        if (c.name == 'param' && c.attributes.name == "movie") {
                            if (music(c.attributes.value)) {
                                return dataProcessor.createFakeParserElement(element,
                                    CLS_MUSIC, TYPE_MUSIC, true);
                            }
                        }
                    }

                },
                'embed' : function(element) {
                    if (!KE.Utils.isFlashEmbed(element))
                        return null;
                    if (music(element.attributes.src)) {
                        return dataProcessor.createFakeParserElement(element,
                            CLS_MUSIC, TYPE_MUSIC, true);
                    }
                }
                //4 比 flash 的优先级 5 高！
            }}, 4);

        KE.use("music/support", function() {
            var MusicInserter = KE.MusicInserter;
            new MusicInserter(editor);
        });
    });


});
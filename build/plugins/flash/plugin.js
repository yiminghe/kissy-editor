KISSY.Editor.add("flash", function(editor) {
    editor.ready(function() {
        var S = KISSY,
            KE = S.Editor,
            CLS_FLASH = 'ke_flash',
            TYPE_FLASH = 'flash',
            dataProcessor = editor.htmlDataProcessor,
            pluginConfig = editor.cfg.pluginConfig,
            dataFilter = dataProcessor && dataProcessor.dataFilter;

        dataFilter && dataFilter.addRules({
            elements : {
                'object' : function(element) {
                    var attributes = element.attributes,i,
                        classId = attributes['classid'] && String(attributes['classid']).toLowerCase();
                    if (!classId) {
                        // Look for the inner <embed>
                        for (i = 0; i < element.children.length; i++) {
                            if (element.children[ i ].name == 'embed') {
                                if (!KE.Utils.isFlashEmbed(element.children[ i ]))
                                    return null;
                                return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true);
                            }
                        }
                        return null;
                    }
                    return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true);
                },

                'embed' : function(element) {
                    if (!KE.Utils.isFlashEmbed(element))
                        return null;
                    return dataProcessor.createFakeParserElement(element, CLS_FLASH, TYPE_FLASH, true);
                }
            }}, 5);

        KE.use("flash/support", function() {
            var Flash = KE.Flash,
                CLS_FLASH = Flash.CLS_FLASH;
            var TYPE_FLASH = Flash.TYPE_FLASH;

            /**
             * 注册添加 flash 的命令
             */
            editor.addCommand("insertFlash", {
                exec:function(editor) {
                    var args = S.makeArray(arguments);
                    return KE.Flash.Insert.apply(null, args);
                }
            });


            if (!pluginConfig["flash"] ||
                pluginConfig["flash"].btn !== false)
                new Flash(editor);
        });

    });
});

KISSY.Editor.add("color", function(editor) {
    var S = KISSY,
        KE = S.Editor;


        var pluginConfig = editor.cfg.pluginConfig;
        if (false !== pluginConfig["forecolor"]) {
            (function() {
                var COLOR_STYLES = {
                    element        : 'span',
                    styles        : { 'color' : '#(color)' },
                    overrides    : [
                        { element : 'font', attributes : { 'color' : null } }
                    ]
                },
                    context = editor.addButton("color", {
                        styles:COLOR_STYLES,
                        mode:KE.WYSIWYG_MODE,
                        title:"文本颜色",
                        loading:true,
                        contentCls:"ke-toolbar-color"
                    });
                /**
                 * 注意：use 可同时在模块以及实例上 use
                 */
                KE.use("colorsupport", function() {
                    context.reload(KE.ColorSupport);
                });
            })();
        }
        if (false !== pluginConfig["bgcolor"]) {
            (function() {
                var colorButton_backStyle = {
                    element        : 'span',
                    styles        : { 'background-color' : '#(color)' }
                };
                var context = editor.addButton("color", {
                    styles:colorButton_backStyle,
                    title:"背景颜色",
                    mode:KE.WYSIWYG_MODE,
                    loading:true,
                    contentCls:"ke-toolbar-bgcolor"
                });
                KE.use("colorsupport", function() {
                    context.reload(KE.ColorSupport);
                });
            })();
        }
});
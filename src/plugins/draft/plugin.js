/**
 * draft support for kissy editor
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("draft", function(editor) {
    var S = KISSY,KE = S.Editor;
    editor.ready(function() {
        KE.use("draft/support", function() {
            KE.storeReady(function() {
                new KE.Draft(editor);
            });
        });
    });
});
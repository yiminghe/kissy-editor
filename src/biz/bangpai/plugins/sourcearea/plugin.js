/**
 * bangpai source editor for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("bangpai-sourcearea", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        Node = S.Node,
        UA = S.UA;
    //firefox 3.5 不支持，有bug
    if (UA.gecko < 1.92) return;
    KE.use("bangpai-sourcearea/support", function() {
        new KE.BangPaiSourceArea(editor);
    });
},
{
    attach:false
});

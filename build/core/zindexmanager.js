/**
 * 集中管理各个z-index
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("zindex", function() {
    var S = KISSY,KE = S.Editor;

    if (KE.zIndexManager) return;

    /**
     * z-index manager
     *@enum {number}
     */
    KE.zIndexManager = {
        BUBBLE_VIEW:(1100),
        POPUP_MENU:(1200),
        //拖动垫片要最最高
        DD_PG: (99999),
        MAXIMIZE:(900),
        OVERLAY:(9999),
        LOADING:(11000),
        LOADING_CANCEL:12000,
        SELECT:(1200)
    };


    /**
     * 获得全局最大值
     */
    KE.baseZIndex = function(z) {
        var r = z,instances = KE.getInstances();
        for (var i in instances) {
            if (!instances.hasOwnProperty(i)) return;
            var instance = instances[i];
            r = Math.max(r, instance.baseZIndex(z));
        }
        return r;
    };

    KE["baseZIndex"] = KE.baseZIndex;
    KE["zIndexManager"] = KE.zIndexManager;
});
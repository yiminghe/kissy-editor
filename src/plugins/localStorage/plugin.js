/**
 * localStorage support for ie<8
 * @author:yiminghe@gmail.com
 */
KISSY.Editor.add("localStorage", function() {
    var S = KISSY,
        KE = S.Editor,STORE;
    STORE = KE.STORE = "localStorage";
    if (!KE.storeReady) {
        KE.storeReady = function(run) {
            KE.on("storeReady", run);
        };
        function rewrite() {
            KE.storeReady = function(run) {
                run();
            };
            KE.detach("storeReady");
        }

        KE.on("storeReady", rewrite);
    }
    function complete() {
        KE.fire("storeReady");
    }

    //原生或者已经定义过立即返回
    if (window[STORE]) {
        //原生的立即可用
        if (!window[STORE]._ke) {
            complete();
        }
        return;
    }

    var Node = S.Node,
        UA = S.UA,
        movie = KE.Config.base + KE.Utils.debugUrl("plugins/localStorage/swfstore.swf")
        ,flash,name = "ke-localstorage-";

    function init() {
        flash = KE.Utils.flash.createSWFRuntime(movie, {
            attrs:{
                allowScriptAccess:'always',
                allowNetworking:'all',
                scale:'noScale'
            },
            flashVars:{
                allowedDomain : location.hostname,
                shareData: true,
                YUISwfId:S.guid(name),
                YUIBridgeCallback:STORE + ".ready",
                browser: name,
                useCompression: true
            }
        });
    }

    window[STORE] = {
        _ke:1,
        getItem:function(key) {
            return flash.getValueOf(key);
        },
        setItem:function(key, data) {
            return flash.setItem(key, data);
        },
        removeItem:function(key) {
            return flash.removeItem(key);
        },
        //非原生，等待flash通知
        ready:function(id, event) {
            if (event.type == "contentReady") {
                complete();
                this.ready = function() {
                };
            }
        }
    };
    init();
});
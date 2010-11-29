KISSY.Editor.add("bangpai-video/support", function() {
    var S = KISSY,KE = S.Editor,Flash = KE.Flash,
        CLS_VIDEO = "ke_video",
        TYPE_VIDEO = "bangpai-video";

    var flashRules = ["img." + CLS_VIDEO];

    function BangPaiVideo(editor) {
        BangPaiVideo.superclass.constructor.apply(this, arguments);
    }

    BangPaiVideo.CLS_VIDEO = CLS_VIDEO;
    BangPaiVideo.TYPE_VIDEO = TYPE_VIDEO;

    S.extend(BangPaiVideo, Flash, {
        _config:function() {
            var self = this,
                editor = self.editor,
                cfg = editor.cfg.pluginConfig;
            self._cls = CLS_VIDEO;
            self._type = TYPE_VIDEO;
            self._contentCls = "ke-toolbar-video";
            self._tip = "插入视频";
            self._contextMenu = contextMenu;
            self._flashRules = flashRules;
        }
    });

    function checkVideo(node) {
        return node._4e_name() === 'img' && (!!node.hasClass(CLS_VIDEO)) && node;
    }

    Flash.registerBubble("bangpai-video", "视频链接： ", checkVideo);
    KE.BangPaiVideo = BangPaiVideo;
    var contextMenu = {
        "视频属性":function(cmd) {
            var editor = cmd.editor,
                selection = editor.getSelection(),
                startElement = selection && selection.getStartElement(),
                flash = startElement && checkVideo(startElement);
            if (flash) {
                cmd.show(null, flash);
            }
        }
    };

    KE.add({
        "bangpai-video/dialog":{
            attach: false,
            charset:"utf-8",
            requires:["flash/dialog"],
            path:KE.Utils.debugUrl(
                "biz/bangpai/plugins/video/" +
                    "dialog/plugin.js")
        }
    });

}, {
    attach:false,
    requires:["flash/support"]
});
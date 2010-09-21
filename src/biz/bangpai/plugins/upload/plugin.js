KISSY.Editor.add("bangpai-upload", function(editor) {
    var S = KISSY,KE = S.Editor;

    if (KE.BangPaiUpload) return;
    (function() {

        function BangPaiUpload(editor) {
            this.editor = editor;
            this._init();
        }

        var holder = [],movie = KE.Config.base + KE.Utils.debugUrl("biz/bangpai/" +
            "plugins/upload/uploader.swf"),
            Node = S.Node,
            name = "ke-bangpai-upload";

        S.augment(BangPaiUpload, S.EventTarget, {
            _init:function() {
                var self = this,
                    editor = self.editor,
                    bangpaiCfg = editor.cfg["pluginConfig"]["bangpai-upload"],
                    holderEl = bangpaiCfg.holder,

                    bangpaiUploaderHolder = S.isString(holderEl) ? S.one(holderEl) : holderEl,
                    flashHolder = new Node("<div style='position:relative'>").appendTo(bangpaiUploaderHolder),
                    btn = new Node("<button disabled='disabled'>选择文件</button>")
                        .appendTo(flashHolder),

                    boffset = btn.offset(),
                    flashHolderOffset = flashHolder.offset(),
                    flashPos = new Node("<div style='" +
                        ("position:absolute;" +
                            "top:"
                            + (flashHolderOffset.top - boffset.top) +
                            "px;" +
                            "left:"
                            + (flashHolderOffset.left - boffset.left) + "px;" +
                            "width:" + btn.width() + "px;" +
                            "height:" + btn.height() + "px;" +
                            "z-index:9999;")
                        + "'>").appendTo(flashHolder),
                    list = new Node("<table>").appendTo(bangpaiUploaderHolder),
                    up = new Node("<p><button>开始上传</button></p>")
                        .appendTo(bangpaiUploaderHolder),
                    fid = S.guid(name);
                list = new Node("<tbody>").appendTo(list);
                holder[fid] = self;
                self.btn = btn;
                self.up = up;
                self.on("contentReady", self._ready, self);
                var flash = KE.Utils.flash.createSWFRuntime(movie, {
                    holder:flashPos,
                    attrs:{
                        allowScriptAccess:'always',
                        allowNetworking:'all',
                        scale:'noScale',
                        width:btn.width() ,
                        height:btn.height()
                    },
                    flashVars:{
                        allowedDomain : location.hostname,
                        shareData: true,
                        swfID:fid,
                        jsEntry:"KISSY.Editor.BangPaiUpload.EventHandler",
                        browser: name,
                        useCompression: true,
                        hand:true,
                        btn:true
                    }
                });
                self.flash = flash;
                self._list = list;
                self.on("select", self._onSelect, self);
            },
            _onSelect:function(ev) {
                var self = this,
                    list = self._list,
                    files = ev.files;
                if (files) {
                    for (var i = 0; i < files.length; i++) {
                        var f = files[i];
                        //console.log(f);
                        new Node("<tr>"
                            + "<td>"
                            + f.name
                            + "</td>"
                            + "<td>"
                            + f.name
                            + "</td>"
                            + "</tr>").appendTo(list);
                    }
                }
            },

            _ready:function() {
                var self = this,
                    flash = self.flash,
                    btn = self.btn;
                btn[0].disabled = false;
                flash.browse(false, [
                    {desc:"图片文件( png,jpg,jpeg,gif )",ext:"*.jpeg;*.jpg;*.png;*.gif"}
                ]);
            },
            _eventHandler:function(event) {
                var self = this,
                    type = event.type;
                if (type === 'log') {
                    S.log(event.message);
                } else if (type) {
                    self.fire(type, event);
                }
            }
        });
        BangPaiUpload.EventHandler = function(fid, event) {
            holder[fid]._eventHandler.call(holder[fid], event);
        };
        KE.BangPaiUpload = BangPaiUpload;
    })();
    editor.addPlugin(function() {
        new KE.BangPaiUpload(editor);
    });
},
{
    attach:false,
    requires : ["flashutils"]
});
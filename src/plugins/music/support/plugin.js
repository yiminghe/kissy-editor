KISSY.Editor.add("music/support", function() {
    var S = KISSY,
        KE = S.Editor,
        Event = S.Event,
        DOM = S.DOM,
        Flash = KE.Flash,
        UA = S.UA;
    var CLS_MUSIC = "ke_music",
        TYPE_MUSIC = 'music';
    var flashRules = ["img." + CLS_MUSIC];

    function MusicInserter(editor) {
        MusicInserter.superclass.constructor.apply(this, arguments);
        //只能ie能用？，目前只有firefox,ie支持图片缩放
        var disableObjectResizing = editor.cfg.disableObjectResizing;
        if (!disableObjectResizing) {
            Event.on(editor.document.body, UA.ie ? 'resizestart' : 'resize',
                function(evt) {
                    if (DOM.hasClass(evt.target, CLS_MUSIC))
                        evt.preventDefault();
                });
        }
    }

    function checkMusic(node) {
        return node._4e_name() === 'img'
            && (!!node.hasClass(CLS_MUSIC))
            && node;
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
        "音乐属性":function(cmd) {
            var editor = cmd.editor,
                selection = editor.getSelection(),
                startElement = selection && selection.getStartElement(),
                flash = startElement && checkMusic(startElement);
            if (flash) {
                cmd.show(null, flash);
            }
        }
    };
});
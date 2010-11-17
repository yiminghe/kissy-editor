/**
 * smiley icon from wangwang for kissy editor
 * @author: yiminghe@gmail.com
 */
KISSY.Editor.add("smiley", function(editor) {
    var KE = KISSY.Editor,
        S = KISSY,
        DOM = S.DOM,
        Event = S.Event,
        Node = S.Node,
        Overlay = KE.SimpleOverlay,
        TripleButton = KE.TripleButton;
    if (!KE.Smiley) {
        (function() {

            DOM.addStyleSheet('.ke-smiley-sprite {'
                + ' background: url("http://a.tbcdn.cn/sys/wangwang/smiley/sprite.png") no-repeat scroll -1px 0 transparent;'
                + ' height: 235px;'
                + ' width: 288px;'
                + ' margin: 5px;'
                + 'zoom: 1;'
                + ' overflow: hidden;'
                + '}'
                + '.ke-smiley-sprite a {'
                + '   width: 24px;'
                + 'height: 24px;'
                + ' border: 1px solid white;'
                + ' float: left;'
                + '}'
                + '.ke-smiley-sprite a:hover {'
                + ' border: 1px solid #808080;'
                + '}'
                , "smiley");

            var smiley_markup = "<div class='ke-smiley-sprite'>";

            for (var i = 0; i <= 98; i++) {
                smiley_markup += "<a href='#' data-icon='http://a.tbcdn.cn/sys/wangwang/smiley/48x48/" + i + ".gif'></a>"
            }

            smiley_markup += "</div>";

            function Smiley(editor) {
                this.editor = editor;
                this._init();
            }

            S.augment(Smiley, {
                _init:function() {
                    var self = this,editor = self.editor;
                    self.el = new TripleButton({
                        //text:"smiley",
                        contentCls:"ke-toolbar-smiley",
                        title:"插入表情",
                        container:editor.toolBarDiv
                    });
                    self.el.on("offClick onClick", this._show, this);
                    KE.Utils.lazyRun(this, "_prepare", "_real");
                    KE.Utils.sourceDisable(editor, self);
                },
                disable:function() {
                    this.el.set("state", TripleButton.DISABLED);
                },
                enable:function() {
                    this.el.set("state", TripleButton.OFF);
                },
                _hidePanel:function(ev) {
                    var self = this,
                        el = self.el.el,
                        t = ev.target,
                        smileyWin = self.smileyWin;
                    //当前按钮点击无效
                    if (el._4e_equals(t) || el._4e_contains(t)) {
                        return;
                    }
                    smileyWin.hide();
                },
                _selectSmiley:function(ev) {
                    ev.halt();
                    var self = this,editor = self.editor;
                    var t = ev.target,icon;
                    if (DOM._4e_name(t) == "a" && (icon = DOM.attr(t, "data-icon"))) {
                        var img = new Node("<img " +
                            "class='ke_smiley'" +
                            "alt='' src='" + icon + "'/>", null, editor.document);
                        editor.insertElement(img);
                        this.smileyWin.hide();
                    }
                },
                _prepare:function() {
                    var self = this,
                        el = self.el,
                        editor = self.editor;
                    self.smileyPanel = new Node(smiley_markup);
                    self.smileyWin = new Overlay({
                        el:self.smileyPanel,
                        width:"297px",
                        zIndex:editor.baseZIndex(KE.zIndexManager.POPUP_MENU),
                        focusMgr:false,
                        mask:false
                    });
                    var smileyWin = self.smileyWin;
                    smileyWin.on("show", el.bon, el);
                    smileyWin.on("hide", el.boff, el);
                    self.smileyPanel.on("click", self._selectSmiley, self);
                    Event.on(document, "click", self._hidePanel, self);
                    Event.on(editor.document, "click", self._hidePanel, self);
                },
                _real:function() {
                    var xy = this.el.el.offset();
                    xy.top += this.el.el.height() + 5;
                    if (xy.left + this.smileyPanel.width() > DOM.viewportWidth() - 60) {
                        xy.left = DOM.viewportWidth() - this.smileyPanel.width() - 60;
                    }
                    this.smileyWin.show(xy);
                },
                _show:function(ev) {
                    var self = this,
                        smileyWin = self.smileyWin;
                    if (smileyWin && smileyWin.get("visible")) {
                        smileyWin.hide();
                    } else {
                        self._prepare(ev);
                    }
                }
            });
            KE.Smiley = Smiley;
        })();
    }
    editor.addPlugin(function() {
        new KE.Smiley(editor);
    });
});

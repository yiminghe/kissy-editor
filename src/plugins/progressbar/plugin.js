KISSY.Editor.add("progressbar", function() {
    var S = KISSY,KE = S.Editor;
    if (KE.ProgressBar) return;

    (function() {
        var DOM = S.DOM;
        DOM.addStyleSheet("" +
            "" +
            ".ke-progressbar {" +
            "border:1px solid #8F8F73;" +
            "}" +
            "" +
            ".ke-progressbar-inner {" +
            "background-color:#FF8C00;" +
            "height:100%;" +
            "}" +
            "" +
            ".ke-progressbar-title {" +
            "width:50px;" +
            "left:50%;" +
            "position:absolute;" +
            "}" +
            "", "ke_progressbar");
        function ProgressBar() {
            ProgressBar.superclass.constructor.apply(this, arguments);
            this._init();
        }

        ProgressBar.ATTRS = {
            width:{},
            height:{},
            //0-100
            progress:{}
        };
        S.extend(ProgressBar, S.Base, {
            _init:function() {
                var self = this,el = new Node("<div" +
                    " class='ke-progressbar' " +
                    "style='width:" + self.get("width") + ";" +
                    "height:"
                    + self.get("height") + ";'" +
                    ">"),

                    p = new Node("<div class='ke-progressbar-inner'>").appendTo(el),
                    title = new Node("<span class='ke-progressbar-title'>").appendTo(el);
                self.el = el;
                self._title = title;
                self._p = p;

            },

            _progressChange:function(ev) {
                var self = this,v = ev.newVal;
                self._p.css("width", v + "%");
                self._title.html(v + "%");
            }
        });

    })();

});
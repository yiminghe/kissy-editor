KISSY.Editor.add("flashutils", function() {
    var S = KISSY,KE = S.Editor,flashUtils = KE.Utils.flash;
    if (flashUtils) return;
    var DOM = S.DOM,Node = S.Node;
    flashUtils = {
        getUrl: function (r) {
            var url = "",KEN = KE.NODE;
            if (r._4e_name() == "object") {
                var params = r[0].childNodes;
                for (var i = 0; i < params.length; i++) {
                    if (params[i].nodeType != KEN.NODE_ELEMENT)continue;
                    if ((DOM.attr(params[i], "name") || "").toLowerCase() == "movie") {
                        url = DOM.attr(params[i], "value");
                    } else if (DOM._4e_name(params[i]) == "embed") {
                        url = DOM.attr(params[i], "src");
                    } else if (DOM._4e_name(params[i]) == "object") {
                        url = DOM.attr(params[i], "data");
                    }
                }
            } else if (r._4e_name() == "embed") {
                url = r.attr("src");
            }
            return url;
        },
        createSWF:function(movie, attrs, doc) {
            doc = doc || document,attrs_str = "";
            if (attrs) {
                for (var a in attrs) {
                    attrs_str += a + "='" + attrs[a] + "' ";
                }
            }
            var outerHTML = '<object ' +
                attrs_str +
                ' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ' +
                '<param name="quality" value="high" />' +
                '<param name="movie" value="' + movie + '" />' +
                '<embed ' +
                attrs_str +
                'pluginspage="http://www.macromedia.com/go/getflashplayer" ' +
                'quality="high" ' +
                ' src="' + movie + '" ' +
                ' type="application/x-shockwave-flash"/>' +
                '</object>';
            return {
                el:new Node(outerHTML, null, doc),
                html:outerHTML
            };
        }

    };
    KE.Utils.flash = flashUtils;


});
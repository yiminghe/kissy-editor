KISSY.Editor.add("dom",function(p){function u(a){return a.replace(/-(\w)/g,function(b,c){return c.toUpperCase()})}var q=KISSY,j=q.DOM,o=q.UA,k=q.Node,t=p.Utils,v={abbr:1,acronym:1,address:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,"var":1};p.NODE={NODE_ELEMENT:1,NODE_TEXT:3,NODE_COMMENT:8,NODE_DOCUMENT_FRAGMENT:11};p.NODE=p.NODE;p.POSITION={POSITION_IDENTICAL:0,POSITION_DISCONNECTED:1,POSITION_FOLLOWING:2,
POSITION_PRECEDING:4,POSITION_IS_CONTAINED:8,POSITION_CONTAINS:16};p.POSITION=p.POSITION;var l=p.NODE,n=p.POSITION,w={block:1,"list-item":1,table:1,"table-row-group":1,"table-header-group":1,"table-footer-group":1,"table-row":1,"table-column-group":1,"table-column":1,"table-cell":1,"table-caption":1},x={hr:1},h=function(a){return a[0]||a},s=function(a){if(a&&!a[0])return new k(a);return a},g={_4e_wrap:s,_4e_unwrap:h,_4e_equals:function(a,b){if(!a&&!b)return true;if(!a||!b)return false;a=h(a);b=h(b);
return a===b},_4e_isBlockBoundary:function(a,b){a=s(a);var c=q.mix(q.mix({},x),b||{});return w[a.css("display")]||c[a._4e_name()]},_4e_getWin:function(a){return a&&"scrollTo"in a&&a.document?a:a&&a.nodeType===9?a.defaultView||a.parentWindow:false},_4e_index:function(a){a=h(a);for(var b=a.parentNode.childNodes,c=0;c<b.length;c++)if(b[c]===a)return c;return-1},_4e_first:function(a,b){a=h(a);var c=a.firstChild;if((c=c&&new k(c))&&b&&!b(c))c=c._4e_next(b);return c},_4e_move:function(a,b,c){a=h(a);j._4e_remove(a);
b=h(b);c?b.insertBefore(a,b.firstChild):b.appendChild(a)},_4e_name:function(a){a=h(a);var b=a.nodeName.toLowerCase();if(o.ie)if((a=a.scopeName)&&a!="HTML")b=a.toLowerCase()+":"+b;return b},_4e_isIdentical:function(a,b){if(a._4e_name()!=b._4e_name())return false;var c=a[0].attributes,d=b[0].attributes,e=c.length,f=d.length;if(e!=f)return false;for(var i=0;i<e;i++){var m=c[i],r=m.name;if(m.specified&&a.attr(r)!=b.attr(r))return false}if(t.ieEngine<8)for(i=0;i<f;i++){m=d[i];r=m.name;if(m.specified&&
a.attr(r)!=b.attr(r))return false}return true},_4e_isEmptyInlineRemoveable:function(a){a=h(a).childNodes;for(var b=0,c=a.length;b<c;b++){var d=a[b],e=d.nodeType;if(!(e==l.NODE_ELEMENT&&d.getAttribute("_ke_bookmark")))if(e==l.NODE_ELEMENT&&!g._4e_isEmptyInlineRemoveable(d)||e==l.NODE_TEXT&&q.trim(d.nodeValue))return false}return true},_4e_moveChildren:function(a,b,c){a=h(a);b=b[0]||b;if(a!=b)if(c)for(;c=a.lastChild;)b.insertBefore(a.removeChild(c),b.firstChild);else for(;c=a.firstChild;)b.appendChild(a.removeChild(c))},
_4e_mergeSiblings:function(){function a(b,c,d){if(c[0]&&c[0].nodeType==l.NODE_ELEMENT){for(var e=[];c.attr("_ke_bookmark")||c._4e_isEmptyInlineRemoveable();){e.push(c);c=d?new k(c[0].nextSibling):new k(c[0].previousSibling);if(!c[0]||c[0].nodeType!=l.NODE_ELEMENT)return}if(b._4e_isIdentical(c)){for(var f=d?b[0].lastChild:b[0].firstChild;e.length;)e.shift()._4e_move(b,!d);c._4e_moveChildren(b,!d);c._4e_remove();f[0]&&f[0].nodeType==l.NODE_ELEMENT&&f._4e_mergeSiblings()}}}return function(b){if(b[0])if(v[b._4e_name()]||
b._4e_name()=="a"){a(b,new k(b[0].nextSibling),true);a(b,new k(b[0].previousSibling))}}}(),_4e_unselectable:o.gecko?function(a){a=h(a);a.style.MozUserSelect="none"}:o.webkit?function(a){a=h(a);a.style.KhtmlUserSelect="none"}:function(a){a=h(a);if(o.ie||o.opera){var b,c=0;for(a.unselectable="on";b=a.all[c++];)switch(b.tagName.toLowerCase()){case "iframe":case "textarea":case "input":case "select":break;default:b.unselectable="on"}}},_4e_getOffset:function(a,b){a=h(a);var c,d=0;c=0;var e=a.ownerDocument.defaultView||
a.ownerDocument.parentWindow,f=a.ownerDocument,i=f.documentElement;b=b||f;if(a.getBoundingClientRect){if(a!==f.body&&i!==a){c=a.getBoundingClientRect();d=c.left+(b===f?j.scrollLeft(e):0);c=c.top+(b===f?j.scrollTop(e):0)}if(b)if(e!=(b.defaultView||b.parentWindow)&&e.frameElement){e=g._4e_getOffset(e.frameElement,b);d+=e.left;c+=e.top}}return{left:d,top:c}},_4e_getFrameDocument:function(a){return(a=h(a))&&a.contentWindow.document},_4e_splitText:function(a,b){a=h(a);var c=a.ownerDocument;if(!(!a||a.nodeType!=
l.NODE_TEXT)){if(o.ie&&b==a.nodeValue.length){var d=c.createTextNode("");j.insertAfter(d,a);return new k(d)}d=new k(a.splitText(b));if(c.documentMode){c=c.createTextNode("");j.insertAfter(c,d[0]);j._4e_remove(c)}return d}},_4e_parents:function(a,b){a=s(a);var c=[];do c[b?"push":"unshift"](a);while(a=a.parent());return c},_4e_clone:function(a,b,c){a=h(a);a=a.cloneNode(b);if(!c){var d=function(e){if(e.nodeType==l.NODE_ELEMENT){e.removeAttribute("id");e=e.childNodes;for(var f=0;f<e.length;f++)d(e[f])}};
d(a)}return new k(a)},_4e_nextSourceNode:function(a,b,c,d){a=h(a);if(d&&!d.call){var e=d[0]||d;d=function(i){i=i[0]||i;return i!==e}}b=!b&&a.firstChild;var f=new k(a);if(!b){if(a.nodeType==l.NODE_ELEMENT&&d&&d(a,true)===false)return null;b=a.nextSibling}for(;!b&&(f=f.parent());){if(d&&d(f,true)===false)return null;b=f[0].nextSibling}if(!b)return null;b=j._4e_wrap(b);if(d&&d(b)===false)return null;if(c&&c!=b[0].nodeType)return b._4e_nextSourceNode(false,c,d);return b},_4e_previousSourceNode:function(a,
b,c,d){a=h(a);if(d&&!d.call){var e=d[0]||d;d=function(i){i=i[0]||i;return i!==e}}b=!b&&a.lastChild;var f=new k(a);if(!b){if(a.nodeType==l.NODE_ELEMENT&&d&&d(a,true)===false)return null;b=a.previousSibling}for(;!b&&(f=f.parent());){if(d&&d(f,true)===false)return null;b=f[0].previousSibling}if(!b)return null;b=j._4e_wrap(b);if(d&&d(b)===false)return null;if(c&&b[0].nodeType!=c)return b._4e_previousSourceNode(false,c,d);return b},_4e_commonAncestor:function(a,b){if(a._4e_equals(b))return a;if(b[0].nodeType!=
l.NODE_TEXT&&b.contains(a))return b;var c=a[0].nodeType==l.NODE_TEXT?a.parent():a;do if(c[0].nodeType!=l.NODE_TEXT&&c.contains(b))return c;while(c=c.parent());return null},_4e_ascendant:function(a,b,c){a=h(a);if(!c)a=a.parentNode;if(b&&!q.isFunction(b)){var d=b;b=function(e){return e._4e_name()==d}}for(;a&&a.nodeType!=9;){if(!b||b(new k(a))===true)return new k(a);a=a.parentNode}return null},_4e_hasAttribute:t.ieEngine<9?function(a,b){a=h(a);var c=a.attributes[b];return!!(c&&c.specified)}:function(a,
b){a=h(a);return a.hasAttribute(b)},_4e_hasAttributes:t.ieEngine<9?function(a){a=h(a);for(var b=a.attributes,c=0;c<b.length;c++){var d=b[c];switch(d.name){case "class":if(a.getAttribute("class"))return true;break;default:if(d.specified)return true}}return false}:function(a){a=h(a);o.gecko&&a.removeAttribute("_moz_dirty");return a.hasAttributes()},_4e_position:function(a,b){var c=h(a),d=h(b);if(c.compareDocumentPosition)return c.compareDocumentPosition(d);if(c==d)return n.POSITION_IDENTICAL;if(c.nodeType==
l.NODE_ELEMENT&&d.nodeType==l.NODE_ELEMENT){if(c.contains){if(c.contains(d))return n.POSITION_CONTAINS+n.POSITION_PRECEDING;if(d.contains(c))return n.POSITION_IS_CONTAINED+n.POSITION_FOLLOWING}if("sourceIndex"in c)return c.sourceIndex<0||d.sourceIndex<0?n.POSITION_DISCONNECTED:c.sourceIndex<d.sourceIndex?n.POSITION_PRECEDING:n.POSITION_FOLLOWING}c=a._4e_address();d=b._4e_address();for(var e=Math.min(c.length,d.length),f=0;f<=e-1;f++)if(c[f]!=d[f]){if(f<e)return c[f]<d[f]?n.POSITION_PRECEDING:n.POSITION_FOLLOWING;
break}return c.length<d.length?n.POSITION_CONTAINS+n.POSITION_PRECEDING:n.POSITION_IS_CONTAINED+n.POSITION_FOLLOWING},_4e_address:function(a,b){a=h(a);for(var c=[],d=a.ownerDocument.documentElement,e=a;e&&e!=d;){var f=e.parentNode,i=-1;if(f){for(var m=0;m<f.childNodes.length;m++){var r=f.childNodes[m];if(!(b&&r.nodeType==3&&r.previousSibling&&r.previousSibling.nodeType==3)){i++;if(r==e)break}}c.unshift(i)}e=f}return c},_4e_breakParent:function(a,b){var c=new p.Range(a[0].ownerDocument);c.setStartAfter(a);
c.setEndAfter(b);var d=c.extractContents();c.insertNode(a._4e_remove());a[0].parentNode.insertBefore(d,a[0].nextSibling)},_4e_style:function(a,b,c){a=s(a);if(c!==undefined)return a.css(b,c);a=h(a);return a.style[u(b)]},_4e_remove:function(a,b){var c=h(a),d=c.parentNode;if(d){if(b)for(var e;e=c.firstChild;)d.insertBefore(c.removeChild(e),c);d.removeChild(c)}return a},_4e_trim:function(a){j._4e_ltrim(a);j._4e_rtrim(a)},_4e_ltrim:function(a){a=h(a);for(var b;b=a.firstChild;){if(b.nodeType==l.NODE_TEXT){var c=
t.ltrim(b.nodeValue),d=b.nodeValue.length;if(c){if(c.length<d){(new k(b))._4e_splitText(d-c.length);a.removeChild(a.firstChild)}}else{a.removeChild(b);continue}}break}},_4e_rtrim:function(a){a=h(a);for(var b;b=a.lastChild;){if(b.type==l.NODE_TEXT){var c=t.rtrim(b.nodeValue),d=b.nodeValue.length;if(c){if(c.length<d){(new k(b))._4e_splitText(c.length);a.removeChild(a.lastChild)}}else{a.removeChild(b);continue}}break}if(!o.ie&&!o.opera)(b=a.lastChild)&&b.nodeType==1&&b.nodeName.toLowerCase()=="br"&&
b.parentNode.removeChild(b)},_4e_appendBogus:function(a){a=h(a);for(var b=a.lastChild;b&&b.nodeType==l.NODE_TEXT&&!q.trim(b.nodeValue);)b=b.previousSibling;if(!b||b.nodeType==l.NODE_TEXT||j._4e_name(b)!=="br"){b=o.opera?a.ownerDocument.createTextNode(""):a.ownerDocument.createElement("br");o.gecko&&b.setAttribute("type","_moz");a.appendChild(b)}},_4e_previous:function(a,b){var c=h(a),d;do d=(c=c.previousSibling)&&new k(c);while(d&&b&&!b(d));return d},_4e_last:function(a,b){a=j._4e_wrap(a);var c=a[0].lastChild;
if((c=c&&new k(c))&&b&&!b(c))c=c._4e_previous(b);return c},_4e_next:function(a,b){var c=h(a),d;do d=(c=c.nextSibling)&&new k(c);while(d&&b&&!b(d));return d},_4e_outerHtml:function(a){a=h(a);if(a.outerHTML)return a.outerHTML.replace(/<\?[^>]*>/,"");var b=a.ownerDocument.createElement("div");b.appendChild(a.cloneNode(true));return b.innerHTML},_4e_setMarker:function(a,b,c,d){a=j._4e_wrap(a);var e=a.data("list_marker_id")||a.data("list_marker_id",q.guid()).data("list_marker_id"),f=a.data("list_marker_names")||
a.data("list_marker_names",{}).data("list_marker_names");b[e]=a;f[c]=1;return a.data(c,d)},_4e_clearMarkers:function(a,b,c){a=s(a);var d=a.data("list_marker_names"),e=a.data("list_marker_id"),f;for(f in d)a.removeData(f);a.removeData("list_marker_names");if(c){a.removeData("list_marker_id");delete b[e]}},_4e_copyAttributes:function(a,b,c){a=h(a);b=s(b);var d=a.attributes;c=c||{};for(var e=0;e<d.length;e++){var f=d[e],i=f.name.toLowerCase(),m;if(!(i in c))if(i=="checked"&&(m=j.attr(a,i)))b.attr(i,
m);else if(f.specified||o.ie&&f.value&&i=="value"){m=j.attr(a,i);if(m===null)m=f.nodeValue;b.attr(i,m)}}if(a.style.cssText!=="")b[0].style.cssText=a.style.cssText},_4e_isEditable:function(a){a=j._4e_name(a);var b=p.XHTML_DTD;return(a=!b.$nonEditable[a]&&(b[a]||b.span))&&a["#"]},_4e_scrollIntoView:function(a){a=s(a);var b=a[0].ownerDocument,c=j.scrollLeft(b),d=j.scrollTop(b),e=a.offset(),f=e.left;e=e.top;if(j.viewportHeight(b)+d<e||e<d||j.viewportWidth(b)+c<f||f<c)a.scrollIntoView(b)},_4e_getElementsByTagName:function(a,
b,c){a=h(a);if(!o.ie&&c)b=c+":"+b;c=[];a=a.getElementsByTagName(b);for(b=0;b<a.length;b++)c.push(new k(a[b]));return c}};q.DOM._4e_inject=function(a){q.mix(j,a);for(var b in a)a.hasOwnProperty(b)&&function(c){k.prototype[c]=function(){var d=[].slice.call(arguments,0);d.unshift(this);return a[c].apply(null,d)}}(b)};t.extern(g,{_4e_wrap:g._4e_wrap,_4e_unwrap:g._4e_unwrap,_4e_equals:g._4e_equals,_4e_isBlockBoundary:g._4e_isBlockBoundary,_4e_getWin:g._4e_getWin,_4e_index:g._4e_index,_4e_first:g._4e_first,
_4e_move:g._4e_move,_4e_name:g._4e_name,_4e_isIdentical:g._4e_isIdentical,_4e_isEmptyInlineRemoveable:g._4e_isEmptyInlineRemoveable,_4e_moveChildren:g._4e_moveChildren,_4e_mergeSiblings:g._4e_mergeSiblings,_4e_unselectable:g._4e_unselectable,_4e_getOffset:g._4e_getOffset,_4e_getFrameDocument:g._4e_getFrameDocument,_4e_splitText:g._4e_splitText,_4e_parents:g._4e_parents,_4e_clone:g._4e_clone,_4e_nextSourceNode:g._4e_nextSourceNode,_4e_previousSourceNode:g._4e_previousSourceNode,_4e_commonAncestor:g._4e_commonAncestor,
_4e_ascendant:g._4e_ascendant,_4e_hasAttribute:g._4e_hasAttribute,_4e_hasAttributes:g._4e_hasAttributes,_4e_position:g._4e_position,_4e_address:g._4e_address,_4e_breakParent:g._4e_breakParent,_4e_style:g._4e_style,_4e_remove:g._4e_remove,_4e_trim:g._4e_trim,_4e_ltrim:g._4e_ltrim,_4e_rtrim:g._4e_rtrim,_4e_appendBogus:g._4e_appendBogus,_4e_last:g._4e_last,_4e_previous:g._4e_previous,_4e_next:g._4e_next,_4e_outerHtml:g._4e_outerHtml,_4e_setMarker:g._4e_setMarker,_4e_clearMarkers:g._4e_clearMarkers,_4e_getUniqueId:g._4e_getUniqueId,
_4e_copyAttributes:g._4e_copyAttributes,_4e_isEditable:g._4e_isEditable,_4e_scrollIntoView:g._4e_scrollIntoView,_4e_getElementsByTagName:g._4e_getElementsByTagName});j._4e_inject(g)});

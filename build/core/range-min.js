KISSY.Editor.add("range",function(t){function z(a){this.endOffset=this.endContainer=this.startOffset=this.startContainer=null;this.collapsed=true;this.document=a}function I(a){var b=a[0].nodeType!=g.NODE_TEXT&&a._4e_name()in A.$removeEmpty,c=!s.trim(a[0].nodeValue);a=!!a.parent().attr("_ke_bookmark");return b||c||a}function E(a){return!J(a)&&!K(a)}function F(a){var b=false,c=u.bookmark(true);return function(e){if(c(e))return true;if(e[0].nodeType==g.NODE_TEXT){if(s.trim(e[0].nodeValue).length)return false}else if(e[0].nodeType==
g.NODE_ELEMENT)if(!L[e._4e_name()])if(!a&&!C.ie&&e._4e_name()=="br"&&!b)b=true;else return false;return true}}function M(a,b){function c(e){return e&&e.nodeName=="span"&&e.getAttribute("_ke_bookmark")}return function(e){var d,f;d=e&&!e.nodeName&&(f=e.parentNode)&&c(f);d=a?d:d||c(e);return b^d}}function N(a){return function(b){b=(b=b[0]||b)&&b.nodeType==g.NODE_TEXT&&!s.trim(b.nodeValue);return a^b}}t.RANGE={POSITION_AFTER_START:1,POSITION_BEFORE_END:2,POSITION_BEFORE_START:3,POSITION_AFTER_END:4,ENLARGE_ELEMENT:1,
ENLARGE_BLOCK_CONTENTS:2,ENLARGE_LIST_ITEM_CONTENTS:3,START:1,END:2,STARTEND:3,SHRINK_ELEMENT:1,SHRINK_TEXT:2};var s=KISSY,g=t.NODE,h=t.RANGE,O=t.POSITION,u=t.Walker,r=s.DOM,G=t.Utils.getByAddress,C=s.UA,A=t.XHTML_DTD,w=t.ElementPath,p=s.Node,H={area:1,base:1,br:1,col:1,hr:1,img:1,input:1,link:1,meta:1,param:1};z.prototype.toString=function(){var a=[];a.push((this.startContainer[0].id||this.startContainer[0].nodeName)+":"+this.startOffset);a.push((this.endContainer[0].id||this.endContainer[0].nodeName)+
":"+this.endOffset);return a.join("<br/>")};s.augment(z,{updateCollapsed:function(){this.collapsed=this.startContainer&&this.endContainer&&r._4e_equals(this.startContainer,this.endContainer)&&this.startOffset==this.endOffset},optimize:function(){var a=this.startContainer,b=this.startOffset;if(a[0].nodeType!=g.NODE_ELEMENT)if(b)b>=a[0].nodeValue.length&&this.setStartAfter(a);else this.setStartBefore(a);a=this.endContainer;b=this.endOffset;if(a[0].nodeType!=g.NODE_ELEMENT)if(b)b>=a[0].nodeValue.length&&
this.setEndAfter(a);else this.setEndBefore(a)},setStartAfter:function(a){this.setStart(a.parent(),a._4e_index()+1)},setStartBefore:function(a){this.setStart(a.parent(),a._4e_index())},setEndAfter:function(a){this.setEnd(a.parent(),a._4e_index()+1)},setEndBefore:function(a){this.setEnd(a.parent(),a._4e_index())},optimizeBookmark:function(){var a=this.startContainer,b=this.endContainer;a&&a._4e_name()=="span"&&a.attr("_ke_bookmark")&&this.setStartAt(a,h.POSITION_BEFORE_START);b&&b._4e_name()=="span"&&
b.attr("_ke_bookmark")&&this.setEndAt(b,h.POSITION_AFTER_END)},setStart:function(a,b){if(a[0].nodeType==g.NODE_ELEMENT&&H[a._4e_name()]){a=a.parent();b=a._4e_index()}this.startContainer=a;this.startOffset=b;if(!this.endContainer){this.endContainer=a;this.endOffset=b}this.updateCollapsed()},setEnd:function(a,b){if(a[0].nodeType==g.NODE_ELEMENT&&H[a._4e_name()]){a=a.parent();b=a._4e_index()+1}this.endContainer=a;this.endOffset=b;if(!this.startContainer){this.startContainer=a;this.startOffset=b}this.updateCollapsed()},
setStartAt:function(a,b){switch(b){case h.POSITION_AFTER_START:this.setStart(a,0);break;case h.POSITION_BEFORE_END:a[0].nodeType==g.NODE_TEXT?this.setStart(a,a[0].nodeValue.length):this.setStart(a,a[0].childNodes.length);break;case h.POSITION_BEFORE_START:this.setStartBefore(a);break;case h.POSITION_AFTER_END:this.setStartAfter(a)}this.updateCollapsed()},setEndAt:function(a,b){switch(b){case h.POSITION_AFTER_START:this.setEnd(a,0);break;case h.POSITION_BEFORE_END:a[0].nodeType==g.NODE_TEXT?this.setEnd(a,
a[0].nodeValue.length):this.setEnd(a,a[0].childNodes.length);break;case h.POSITION_BEFORE_START:this.setEndBefore(a);break;case h.POSITION_AFTER_END:this.setEndAfter(a)}this.updateCollapsed()},execContentsAction:function(a,b){var c=this.startContainer,e=this.endContainer,d=this.startOffset,f=this.endOffset,k,l=this.document,i;this.optimizeBookmark();if(e[0].nodeType==g.NODE_TEXT)e=e._4e_splitText(f);else if(e[0].childNodes.length>0)if(f>=e[0].childNodes.length){e=new p(e[0].appendChild(l.createTextNode("")));
i=true}else e=new p(e[0].childNodes[f]);if(c[0].nodeType==g.NODE_TEXT){c._4e_splitText(d);if(c._4e_equals(e))e=new p(c[0].nextSibling)}else if(d)if(d>=c[0].childNodes.length){k=new p(l.createTextNode(""));c.append(k);c=k;k=true}else c=new p(c[0].childNodes[d].previousSibling);else{k=new p(l.createTextNode(""));(d=c[0].firstChild)?r.insertBefore(k[0],d):c.append(k);c=k;k=true}d=c._4e_parents();f=e._4e_parents();var j,o,n;for(j=0;j<d.length;j++){o=d[j];n=f[j];if(!o._4e_equals(n))break}l=b;for(var m,
q,v,y=j;y<d.length;y++){m=d[y];if(l&&!m._4e_equals(c))q=l.appendChild(m._4e_clone()[0]);for(m=m[0].nextSibling;m;){if(r._4e_equals(f[y],m)||r._4e_equals(e,m))break;v=m.nextSibling;if(a==2)l.appendChild(m.cloneNode(true));else{m.parentNode.removeChild(m);a==1&&l.appendChild(m)}m=v}if(q)l=q}l=b;for(j=j;j<f.length;j++){m=f[j];if(a>0&&!m._4e_equals(e))q=l.appendChild(m._4e_clone()[0]);if(!d[j]||!m.parent()._4e_equals(d[j].parent()))for(m=m[0].previousSibling;m;){if(r._4e_equals(d[j],m)||r._4e_equals(c,
m))break;v=m.previousSibling;if(a==2)l.insertBefore(m.cloneNode(true),l.firstChild);else{r._4e_remove(m);a==1&&l.insertBefore(m,l.firstChild)}m=v}if(q)l=q}if(a==2){n=this.startContainer[0];if(n.nodeType==g.NODE_TEXT&&n.nextSibling&&n.nextSibling.nodeType==g.NODE_TEXT){n.data+=n.nextSibling.data;n.parentNode.removeChild(n.nextSibling)}n=this.endContainer[0];if(n.nodeType==g.NODE_TEXT&&n.nextSibling&&n.nextSibling.nodeType==g.NODE_TEXT){n.data+=n.nextSibling.data;n.parentNode.removeChild(n.nextSibling)}}else{if(o&&
n&&(!c.parent()._4e_equals(o.parent())||!e.parent()._4e_equals(n.parent()))){o=n._4e_index();k&&n.parent()._4e_equals(c.parent())&&o--;this.setStart(n.parent(),o)}this.collapse(true)}k&&c._4e_remove();i&&e[0].parentNode&&e._4e_remove()},collapse:function(a){if(a){this.endContainer=this.startContainer;this.endOffset=this.startOffset}else{this.startContainer=this.endContainer;this.startOffset=this.endOffset}this.collapsed=true},clone:function(){var a=new z(this.document);a.startContainer=this.startContainer;
a.startOffset=this.startOffset;a.endContainer=this.endContainer;a.endOffset=this.endOffset;a.collapsed=this.collapsed;return a},getEnclosedNode:function(){var a=this.clone();a.optimize();if(a.startContainer[0].nodeType!=g.NODE_ELEMENT||a.endContainer[0].nodeType!=g.NODE_ELEMENT)return null;var b=new t.Walker(a),c=M(true,undefined),e=N(true);a.evaluator=function(d){return e(d)&&c(d)};a=b.next();b.reset();b=b.previous();return a&&a._4e_equals(b)?a:null},shrink:function(a,b){if(!this.collapsed){a=a||
h.SHRINK_TEXT;var c=this.clone(),e=this.startContainer,d=this.endContainer,f=this.startOffset,k=this.endOffset,l=1,i=1;if(e&&e[0].nodeType==g.NODE_TEXT)if(f)if(f>=e[0].nodeValue.length)c.setStartAfter(e);else{c.setStartBefore(e);l=0}else c.setStartBefore(e);if(d&&d[0].nodeType==g.NODE_TEXT)if(k)if(k>=d[0].nodeValue.length)c.setEndAfter(d);else{c.setEndAfter(d);i=0}else c.setEndBefore(d);c=new u(c);c.evaluator=function(o){o=o[0]||o;return o.nodeType==(a==h.SHRINK_ELEMENT?g.NODE_ELEMENT:g.NODE_TEXT)};
var j;c.guard=function(o,n){o=o[0]||o;if(a==h.SHRINK_ELEMENT&&o.nodeType==g.NODE_TEXT)return false;if(n&&o==j)return false;if(!n&&o.nodeType==g.NODE_ELEMENT)j=o;return true};if(l)(e=c[a==h.SHRINK_ELEMENT?"lastForward":"next"]())&&this.setStartAt(e,b?h.POSITION_AFTER_START:h.POSITION_BEFORE_START);if(i){c.reset();(c=c[a==h.SHRINK_ELEMENT?"lastBackward":"previous"]())&&this.setEndAt(c,b?h.POSITION_BEFORE_END:h.POSITION_AFTER_END)}return!!(l||i)}},getTouchedStartNode:function(){var a=this.startContainer;
if(this.collapsed||a[0].nodeType!=g.NODE_ELEMENT)return a;return a.childNodes[this.startOffset]||a},createBookmark2:function(a){var b=this.startContainer,c=this.endContainer,e=this.startOffset,d=this.endOffset,f,k;if(!b||!c)return{start:0,end:0};if(a){if(b[0].nodeType==g.NODE_ELEMENT)if((f=new p(b[0].childNodes[e]))&&f[0]&&f[0].nodeType==g.NODE_TEXT&&e>0&&f[0].previousSibling.nodeType==g.NODE_TEXT){b=f;e=0}for(;b[0].nodeType==g.NODE_TEXT&&(k=b._4e_previous())&&k[0].nodeType==g.NODE_TEXT;){b=k;e+=
k[0].nodeValue.length}if(!this.collapsed){if(c[0].nodeType==g.NODE_ELEMENT)if((f=new p(c[0].childNodes[d]))&&f[0]&&f[0].nodeType==g.NODE_TEXT&&d>0&&f[0].previousSibling.nodeType==g.NODE_TEXT){c=f;d=0}for(;c[0].nodeType==g.NODE_TEXT&&(k=c._4e_previous())&&k[0].nodeType==g.NODE_TEXT;){c=k;d+=k[0].nodeValue.length}}}return{start:b._4e_address(a),end:this.collapsed?null:c._4e_address(a),startOffset:e,endOffset:d,normalized:a,is2:true}},createBookmark:function(a){var b,c,e,d;b=new p("<span>",null,this.document);
b.attr("_ke_bookmark",1);b.css("display","none");b.html("&nbsp;");if(a){e=s.guid("ke_bm_");b.attr("id",e+"S")}if(!this.collapsed){c=b._4e_clone();c.html("&nbsp;");a&&c.attr("id",e+"E");d=this.clone();d.collapse();d.insertNode(c)}d=this.clone();d.collapse(true);d.insertNode(b);if(c){this.setStartAfter(b);this.setEndBefore(c)}else this.moveToPosition(b,h.POSITION_AFTER_END);return{startNode:a?e+"S":b,endNode:a?e+"E":c,serializable:a}},moveToPosition:function(a,b){this.setStartAt(a,b);this.collapse(true)},
trim:function(a,b){var c=this.startContainer,e=this.startOffset,d=this.collapsed;if((!a||d)&&c[0]&&c[0].nodeType==g.NODE_TEXT){if(e)if(e>=c[0].nodeValue.length){e=c._4e_index()+1;c=c.parent()}else{var f=c._4e_splitText(e);e=c._4e_index()+1;c=c.parent();if(r._4e_equals(this.startContainer,this.endContainer))this.setEnd(f,this.endOffset-this.startOffset);else if(r._4e_equals(c,this.endContainer))this.endOffset+=1}else{e=c._4e_index();c=c.parent()}this.setStart(c,e);if(d){this.collapse(true);return}}c=
this.endContainer;e=this.endOffset;if(!(b||d)&&c[0]&&c[0].nodeType==g.NODE_TEXT){if(e){e>=c.nodeValue.length||c._4e_splitText(e);e=c._4e_index()+1}else e=c._4e_index();c=c.parent();this.setEnd(c,e)}},insertNode:function(a){this.optimizeBookmark();this.trim(false,true);var b=this.startContainer,c=b[0].childNodes[this.startOffset];this.optimizeBookmark();this.trim(false,true);c?r.insertBefore(a[0]||a,c):b[0].appendChild(a[0]||a);r._4e_equals(a.parent(),this.endContainer)&&this.endOffset++;this.setStartBefore(a)},
moveToBookmark:function(a){if(a.is2){var b=G(this.document,a.start,a.normalized),c=a.startOffset,e=a.end&&G(this.document,a.end,a.normalized);a=a.endOffset;this.setStart(b,c);e?this.setEnd(e,a):this.collapse(true)}else{b=(c=a.serializable)?s.one("#"+a.startNode,this.document):a.startNode;a=c?s.one("#"+a.endNode,this.document):a.endNode;this.setStartBefore(b);b._4e_remove();if(a&&a[0]){this.setEndBefore(a);a._4e_remove()}else this.collapse(true)}},getCommonAncestor:function(a,b){var c=this.startContainer,
e=this.endContainer;c=r._4e_equals(c,e)?a&&c[0].nodeType==g.NODE_ELEMENT&&this.startOffset==this.endOffset-1?new p(c[0].childNodes[this.startOffset]):c:c._4e_commonAncestor(e);return b&&c[0].nodeType==g.NODE_TEXT?c.parent():c},enlarge:function(a){switch(a){case h.ENLARGE_ELEMENT:if(this.collapsed)break;a=this.getCommonAncestor();var b=new p(this.document.body),c,e,d,f,k,l=false,i,j;i=this.startContainer;j=this.startOffset;if(i[0].nodeType==g.NODE_TEXT){if(j){i=!s.trim(i[0].nodeValue.substring(0,j)).length&&
i;l=!!i}if(i)if(!(f=i[0].previousSibling))d=i.parent()}else{if(j)f=i[0].childNodes[j-1]||i[0].lastChild;f||(d=i)}for(;d||f;){if(d&&!f){if(!k&&r._4e_equals(d,a))k=true;if(!b._4e_contains(d))break;if(!l||d.css("display")!="inline"){l=false;if(k)c=d;else this.setStartBefore(d)}f=d[0].previousSibling}for(;f;){i=false;if(f.nodeType==g.NODE_TEXT){j=f.nodeValue;if(/[^\s\ufeff]/.test(j))f=null;i=/[\s\ufeff]$/.test(j)}else if(f.offsetWidth>0&&!f.getAttribute("_ke_bookmark"))if(l&&A.$removeEmpty[f.nodeName.toLowerCase()]){j=
r.text(f);if(/[^\s\ufeff]/.test(j))f=null;else for(var o=f.all||f.getElementsByTagName("*"),n=0,m;m=o[n++];)if(!A.$removeEmpty[m.nodeName.toLowerCase()]){f=null;break}if(f)i=!!j.length}else f=null;if(i)if(l)if(k)c=d;else d&&this.setStartBefore(d);else l=true;if(f){i=f.previousSibling;if(!d&&!i){d=new p(f);f=null;break}f=i}else d=null}if(d)d=d.parent()}i=this.endContainer;j=this.endOffset;d=f=null;k=l=false;if(i[0].nodeType==g.NODE_TEXT){i=!s.trim(i[0].nodeValue.substring(j)).length&&i;l=!(i&&i[0].nodeValue.length);
if(i)if(!(f=i[0].nextSibling))d=i.parent()}else(f=i[0].childNodes[j])||(d=i);for(;d||f;){if(d&&!f){if(!k&&r._4e_equals(d,a))k=true;if(!b._4e_contains(d))break;if(!l||d.css("display")!="inline"){l=false;if(k)e=d;else d&&this.setEndAfter(d)}f=d[0].nextSibling}for(;f;){i=false;if(f.nodeType==g.NODE_TEXT){j=f.nodeValue;if(/[^\s\ufeff]/.test(j))f=null;i=/^[\s\ufeff]/.test(j)}else if(f.offsetWidth>0&&!f.getAttribute("_ke_bookmark"))if(l&&A.$removeEmpty[f.nodeName.toLowerCase()]){j=r.text(f);if(/[^\s\ufeff]/.test(j))f=
null;else{o=f.all||f.getElementsByTagName("*");for(n=0;m=o[n++];)if(!A.$removeEmpty[m.nodeName.toLowerCase()]){f=null;break}}if(f)i=!!j.length}else f=null;if(i)if(l)if(k)e=d;else this.setEndAfter(d);if(f){i=f.nextSibling;if(!d&&!i){d=new p(f);f=null;break}f=i}else d=null}if(d)d=d.parent()}if(c&&e){a=c._4e_contains(e)?e:c;this.setStartBefore(a);this.setEndAfter(a)}break;case h.ENLARGE_BLOCK_CONTENTS:case h.ENLARGE_LIST_ITEM_CONTENTS:d=new z(this.document);b=new p(this.document.body);d.setStartAt(b,
h.POSITION_AFTER_START);d.setEnd(this.startContainer,this.startOffset);d=new u(d);var q,v,y=u.blockBoundary(a==h.ENLARGE_LIST_ITEM_CONTENTS?{br:1}:null),D=function(x){var B=y(x);B||(q=x);return B};c=function(x){var B=D(x);if(!B&&x[0]&&x._4e_name()=="br")v=x;return B};d.guard=D;d=d.lastBackward();q=q||b;this.setStartAt(q,q._4e_name()!="br"&&(!d&&this.checkStartOfBlock()||d&&q._4e_contains(d))?h.POSITION_AFTER_START:h.POSITION_AFTER_END);d=this.clone();d.collapse();d.setEndAt(b,h.POSITION_BEFORE_END);
d=new u(d);d.guard=a==h.ENLARGE_LIST_ITEM_CONTENTS?c:D;q=null;d=d.lastForward();q=q||b;this.setEndAt(q,!d&&this.checkEndOfBlock()||d&&q._4e_contains(d)?h.POSITION_BEFORE_END:h.POSITION_BEFORE_START);v&&this.setEndAfter(v)}},checkStartOfBlock:function(){var a=this.startContainer,b=this.startOffset;if(b&&a[0].nodeType==g.NODE_TEXT)if(s.trim(a[0].nodeValue.substring(0,b)).length)return false;this.trim();a=new w(this.startContainer);b=this.clone();b.collapse(true);b.setStartAt(a.block||a.blockLimit,h.POSITION_AFTER_START);
a=new u(b);a.evaluator=F(true);return a.checkBackward()},checkEndOfBlock:function(){var a=this.endContainer,b=this.endOffset;if(a[0].nodeType==g.NODE_TEXT)if(s.trim(a[0].nodeValue.substring(b)).length)return false;this.trim();a=new w(this.endContainer);b=this.clone();b.collapse(false);b.setEndAt(a.block||a.blockLimit,h.POSITION_BEFORE_END);a=new u(b);a.evaluator=F(false);return a.checkForward()},deleteContents:function(){this.collapsed||this.execContentsAction(0)},extractContents:function(){var a=
this.document.createDocumentFragment();this.collapsed||this.execContentsAction(1,a);return a},checkBoundaryOfElement:function(a,b){var c=this.clone();c[b==h.START?"setStartAt":"setEndAt"](a,b==h.START?h.POSITION_AFTER_START:h.POSITION_BEFORE_END);c=new u(c);c.evaluator=I;return c[b==h.START?"checkBackward":"checkForward"]()},getBoundaryNodes:function(){var a=this.startContainer,b=this.endContainer,c=this.startOffset,e=this.endOffset,d;if(a[0].nodeType==g.NODE_ELEMENT){d=a[0].childNodes.length;if(d>
c)a=new p(a[0].childNodes[c]);else if(d<1)a=a._4e_previousSourceNode();else{for(a=a[0];a.lastChild;)a=a.lastChild;a=new p(a);a=a._4e_nextSourceNode()||a}}if(b[0].nodeType==g.NODE_ELEMENT){d=b[0].childNodes.length;if(d>e)b=(new p(b[0].childNodes[e]))._4e_previousSourceNode(true);else if(d<1)b=b._4e_previousSourceNode();else{for(b=b[0];b.lastChild;)b=b.lastChild;b=new p(b)}}if(a._4e_position(b)&O.POSITION_FOLLOWING)a=b;return{startNode:a,endNode:b}},fixBlock:function(a,b){var c=this.createBookmark(),
e=new p(this.document.createElement(b));this.collapse(a);this.enlarge(h.ENLARGE_BLOCK_CONTENTS);e[0].appendChild(this.extractContents());e._4e_trim();C.ie||e._4e_appendBogus();this.insertNode(e);this.moveToBookmark(c);return e},splitBlock:function(a){var b=new w(this.startContainer),c=new w(this.endContainer),e=b.block,d=c.block,f=null;if(!b.blockLimit._4e_equals(c.blockLimit))return null;if(a!="br"){if(!e){e=this.fixBlock(true,a);d=(new w(this.endContainer)).block}d||(d=this.fixBlock(false,a))}a=
e&&this.checkStartOfBlock();b=d&&this.checkEndOfBlock();this.deleteContents();if(e&&r._4e_equals(e,d))if(b){f=new w(this.startContainer);this.moveToPosition(d,h.POSITION_AFTER_END);d=null}else if(a){f=new w(this.startContainer);this.moveToPosition(e,h.POSITION_BEFORE_START);e=null}else{d=this.splitElement(e);!C.ie&&!s.inArray(e._4e_name(),["ul","ol"])&&e._4e_appendBogus()}return{previousBlock:e,nextBlock:d,wasStartOfBlock:a,wasEndOfBlock:b,elementPath:f}},splitElement:function(a){if(!this.collapsed)return null;
this.setEndAt(a,h.POSITION_BEFORE_END);var b=this.extractContents(),c=a._4e_clone(false);c[0].appendChild(b);c.insertAfter(a);this.moveToPosition(a,h.POSITION_AFTER_END);return c},moveToElementEditablePosition:function(a,b){var c,e=t.XHTML_DTD;if(e.$empty[a._4e_name()])return false;for(;a&&a[0].nodeType==g.NODE_ELEMENT;){if(c=a._4e_isEditable())this.moveToPosition(a,b?h.POSITION_BEFORE_END:h.POSITION_AFTER_START);else if(e.$inline[a._4e_name()]){this.moveToPosition(a,b?h.POSITION_AFTER_END:h.POSITION_BEFORE_START);
return true}if((a=e.$empty[a._4e_name()]?a[b?"_4e_previous":"_4e_next"](E):a[b?"_4e_last":"_4e_first"](E))&&a[0].nodeType==g.NODE_TEXT){this.moveToPosition(a,b?h.POSITION_AFTER_END:h.POSITION_BEFORE_START);return true}}return c},selectNodeContents:function(a){this.setStart(a,0);this.setEnd(a,a[0].nodeType==g.NODE_TEXT?a[0].nodeValue.length:a[0].childNodes.length)}});var L={abbr:1,acronym:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,
strong:1,sub:1,sup:1,tt:1,u:1,"var":1},J=new u.whitespaces,K=new u.bookmark;t.Range=z});

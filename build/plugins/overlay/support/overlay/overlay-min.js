KISSY.add("overlay",function(a){a.Overlay=a.UIBase.create([a.UIBase.Box,a.UIBase.ContentBox,a.UIBase.Position,a.UIBase.Loading,a.UA.ie==6?a.UIBase.Shim:null,a.UIBase.Align,a.UIBase.Mask],{initializer:function(){a.log("Overlay init")},renderUI:function(){a.log("_renderUIOverlay");this.get("el").addClass("ks-overlay")},syncUI:function(){a.log("_syncUIOverlay")},bindUI:function(){a.log("_bindUIOverlay")},destructor:function(){a.log("overlay destructor")}})},{requires:["core"]});

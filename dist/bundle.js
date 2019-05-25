!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.EventEmiter=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._events={}}return r(e,[{key:"on",value:function(e,t){return(this._events[e]||(this._events[e]=[])).push(t),this}},{key:"emit",value:function(e,t){return(this._events[e]||[]).forEach(function(e){return e(t)}),this}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Ajax=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0);t.Ajax=function(e){function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var i=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return i._items=null,i._url=e,i._eventName=n,r&&i.initEvent(),i}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.EventEmiter),r(t,[{key:"initEvent",value:function(){var e=this;setInterval(function(){try{e.get()}catch(e){console.log("Server isn't available")}},18e4)}},{key:"getItems",value:function(){return this._items}},{key:"get",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:void 0;fetch(this._url,{headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(n){e._items=n,e.emit(e._eventName,e._items),t&&t()}).catch(function(e){return console.error(e)})}},{key:"post",value:function(e){console.log("start sending data"),fetch(this._url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){return console.log("DATA",e)}).catch(function(e){return console.error(e)})}}]),t}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.renderMixin={find:function(e){return document.querySelector(e)},findAll:function(e){return document.querySelectorAll(e)},findId:function(e){return document.getElementById(e)},show:function(e){return e.classList.add("visible")},hide:function(e){return e.classList.remove("visible")}}},function(e,t,n){"use strict";var r=n(4),i=n(5),o=n(7),a=n(8);document.addEventListener("DOMContentLoaded",function(){console.log("DOM loaded"),new r.SidebarView,new i.BoardView,new o.GeneralView,new a.AddDataService})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SidebarView=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),o=n(1);t.SidebarView=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e._template=null,e._ajax=new o.Ajax("http://localhost:3006/sidebar","getSidebarList"),e.init(),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.EventEmiter),r(t,[{key:"init",value:function(){var e=this;this._ajax.on("getSidebarList",function(t){return e.renderSidebar(t)}),this._ajax.get()}},{key:"getTemplate",value:function(){document.getElementById("sidebar_list-template")&&(this._template=document.getElementById("sidebar_list-template").innerHTML)}},{key:"renderSidebar",value:function(e){this.getTemplate();var t=document.querySelector(".sidebar_accordion"),n=Handlebars.compile(this._template),r="";e.forEach(function(e){r+=n(e)}),t.innerHTML=r,this.renderSubtitles(e)}},{key:"renderSubtitles",value:function(e){var t=this,n=document.querySelectorAll(".card-body");e.forEach(function(e,t){e.subdirection.forEach(function(e,r){var i=document.createElement("a");i.setAttribute("class","sidebar_link"),i.setAttribute("href","#"),i.setAttribute("data-href",t+"/subdirect"+r),i.innerText=e,n[t].innerHTML+=i.outerHTML})}),n.forEach(function(e){t.addHashLinks(e,"a","dir/")})}},{key:"addHashLinks",value:function(e,t,n){e.querySelectorAll(t).forEach(function(e){e.addEventListener("click",function(t){t.preventDefault(),window.location.hash=""+n+e.dataset.href})})}}]),t}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.BoardView=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),o=n(6),a=n(1),u=n(2);t.BoardView=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e._template=null,e._ajax=new a.Ajax("http://localhost:3006/products","getProductsList",!0),e._router=new o.Router,e._products=null,e.initAjax(),e.initRoutes(),e.addMixin(),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.EventEmiter),r(t,[{key:"initAjax",value:function(){var e=this;this._ajax.on("getProductsList",function(t){e._products=t.reverse()}),this._ajax.get(function(){window.dispatchEvent(new HashChangeEvent("hashchange"))})}},{key:"initRoutes",value:function(){var e=this;this._router.addRoute("",function(){return e.renderProductsList()},!1),this._router.addRoute("#",function(){return e.renderProductsList()},!1),this._router.addRoute("404",function(){return e.renderErrorPage()},!0),this._router.addRoute("#login",function(){return e.renderOtherPage(".user_login")},!0),this._router.addRoute("#registration",function(){return e.renderOtherPage(".user_registration")},!0),this._router.addRoute("#empty",function(){return e.renderOtherPage(".board_empty")},!1),this._router.addRoute("#add",function(){return e.renderOtherPage(".board_add-product")},!1),this._router.addRoute("#room",function(){return e.renderErrorPage()},!1),this._router.addRoute("#product",function(t){return e.renderSinglePage(t)},!0)}},{key:"addMixin",value:function(){for(var e in u.renderMixin)t.prototype[e]=u.renderMixin[e]}},{key:"renderErrorPage",value:function(){this.show(this.find(".error")),this.hide(this.findId("main-container"))}},{key:"renderOtherPage",value:function(e){this.show(this.find(e))}},{key:"checkProductsId",value:function(e){this._products.some(function(t){return e===t.id})||(window.history.replaceState({},"start page","#empty"),window.dispatchEvent(new HashChangeEvent("hashchange")))}},{key:"renderSinglePage",value:function(e){this.checkProductsId(e);var t=this._products.filter(function(t){return t.id===e})[0];this.find(".product_image").src=t.images,this.find(".product_image").alt=t.title,this.find(".product_title").innerHTML=t.title,this.find(".product_content").innerHTML=t.text,this.find(".product_price").innerHTML=t.price,this.find(".product_user").innerHTML=t.userName,this.find(".product_number").innerHTML=t.userPhone,this.find(".product_place").innerHTML=t.place,this.find(".product_date").innerHTML=t.date,this.show(this.find(".product_single"))}},{key:"renderProductsList",value:function(){this.getTemplate();var e=this.findId("board");this.show(e);var t=Handlebars.compile(this._template),n="";this._products.forEach(function(e){n+=t(e)}),e.innerHTML=n,this.addHashLinks(e,".board_product","product/")}},{key:"getTemplate",value:function(){this.findId("board_list-template")&&(this._template=this.findId("board_list-template").innerHTML)}},{key:"addHashLinks",value:function(e,t,n){e.querySelectorAll(t).forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),e.currentTarget.classList.contains("board_product")&&(window.location.hash=""+n+e.currentTarget.dataset.href)})})}}]),t}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.Router=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.routes={},this.pagesTop=document.querySelectorAll(".page-top"),this.pagesBottom=document.querySelectorAll(".page-bottom"),this.routesTop=[],this.routesBottom=[],this.init()}return r(e,[{key:"init",value:function(){var e=this;window.addEventListener("hashchange",function(){e.render(decodeURI(window.location.hash)),window.scrollTo(0,0)})}},{key:"addRoute",value:function(e,t,n){this.routes[e]=t,n?this.routesTop.push(e):this.routesBottom.push(e)}},{key:"render",value:function(e){var t=(e=e.split("/"))[0],n=e[1];document.getElementById("main-container").classList.add("visible"),this.routesBottom.includes(t)&&this.pagesBottom.forEach(function(e){e.classList.remove("visible")}),this.pagesTop.forEach(function(e){e.classList.remove("visible")}),this.routes[t]?this.routes[t](n):this.routes[404](n)}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.GeneralView=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2);t.GeneralView=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.addMixin(),this.closeWindowEvent(),this.initAllButtons(),this.initNavbarSearch()}return r(e,[{key:"addMixin",value:function(){for(var t in i.renderMixin)e.prototype[t]=i.renderMixin[t]}},{key:"closeWindowEvent",value:function(){var e=this;this.findAll(".close, .overlay").forEach(function(t){t.addEventListener("click",function(t){var n=t.currentTarget;e.hide(n.closest(".page")),"#registration"!==window.location.hash?window.history.go(-1):window.history.go(-2)})})}},{key:"initAllButtons",value:function(){this.findAll("button").forEach(function(e){"submit"!==e.type&&e.addEventListener("click",function(){event.preventDefault(),window.location.hash=e.dataset.href})})}},{key:"initNavbarSearch",value:function(){}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AddDataService=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(0),o=n(1),a=n(2);t.AddDataService=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e._ajax=new o.Ajax("http://localhost:3006/products","postNewProduct",!1),e._form=document.getElementById("form-add-product"),e._formData=null,e.addMixin(),e.events(),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.EventEmiter),r(t,[{key:"addMixin",value:function(){for(var e in a.renderMixin)t.prototype[e]=a.renderMixin[e]}},{key:"events",value:function(){var e=this;this._form.addEventListener("submit",function(t){switch(t.preventDefault(),t.target.id){case"form-add-product":e.createProductData(),e.codeProductImage();break;default:window.location.hash="#error"}})}},{key:"createProductData",value:function(){this._formData={userId:null,userName:this.findId("add_name").value,userPhone:this.findId("add_phone").value,direction:this.findId("add_dir").options[this.findId("add_dir").selectedIndex].value,subdirection:this.findId("add_subdir").options[this.findId("add_subdir").selectedIndex].value,images:null,title:this.findId("add_title").value,text:this.findId("add_text").value,condition:this.findId("add_condition").options[this.findId("add_condition").selectedIndex].value,price:this.findId("add_price").value+" p",place:this.findId("add_place").value,date:Date.now()}}},{key:"codeProductImage",value:function(){var e=this,t=this.findId("add_image").files[0];if(t){this.emit("startLoadingImage",t.name);var n=new FileReader;n.readAsDataURL(t),n.onloadend=function(){e._formData.images=n.result,e._ajax.post(e._formData)},n.onerror=function(e){console.log("Error: ",e)}}else this._formData.images="./src/assets/product_images/no_photo.png"}}]),t}()}]);
//# sourceMappingURL=bundle.js.map
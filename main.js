var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};$jscomp.getGlobal=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.ISOLATE_POLYFILLS=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.polyfills={};$jscomp.propertyToPolyfillSymbol={};$jscomp.POLYFILL_PREFIX="$jscp$";$jscomp.IS_SYMBOL_NATIVE="function"===typeof Symbol&&"symbol"===typeof Symbol("x");var $jscomp$lookupPolyfilledValue=function(a,b){var c=$jscomp.propertyToPolyfillSymbol[b];if(null==c)return a[b];c=a[c];return void 0!==c?c:a[b]};$jscomp.polyfill=function(a,b,c,d){b&&($jscomp.ISOLATE_POLYFILLS?$jscomp.polyfillIsolated(a,b,c,d):$jscomp.polyfillUnisolated(a,b,c,d))};$jscomp.polyfillUnisolated=function(a,b,c,d){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})};$jscomp.polyfillIsolated=function(a,b,c,d){var e=a.split(".");a=1===e.length;d=e[0];d=!a&&d in $jscomp.polyfills?$jscomp.polyfills:$jscomp.global;for(var f=0;f<e.length-1;f++){var g=e[f];g in d||(d[g]={});d=d[g]}e=e[e.length-1];c=$jscomp.IS_SYMBOL_NATIVE&&"es6"===c?d[e]:null;b=b(c);null!=b&&(a?$jscomp.defineProperty($jscomp.polyfills,e,{configurable:!0,writable:!0,value:b}):b!==c&&($jscomp.propertyToPolyfillSymbol[e]=$jscomp.IS_SYMBOL_NATIVE?$jscomp.global.Symbol(e):$jscomp.POLYFILL_PREFIX+e,e=$jscomp.propertyToPolyfillSymbol[e],$jscomp.defineProperty(d,e,{configurable:!0,writable:!0,value:b})))};$jscomp.FORCE_POLYFILL_PROMISE=!1;$jscomp.polyfill("Promise",function(a){function b(){this.batch_=null}function c(a){return a instanceof e?a:new e(function(b,c){b(a)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;b.prototype.asyncExecute=function(a){if(null==this.batch_){this.batch_=[];var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})}this.batch_.push(a)};var d=$jscomp.global.setTimeout;b.prototype.asyncExecuteFunction=function(a){d(a,0)};b.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var a=this.batch_;this.batch_=[];for(var b=0;b<a.length;++b){var c=a[b];a[b]=null;try{c()}catch(h){this.asyncThrow_(h)}}}this.batch_=null};b.prototype.asyncThrow_=function(a){this.asyncExecuteFunction(function(){throw a;})};var e=function(a){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var b=this.createResolveAndReject_();try{a(b.resolve,b.reject)}catch(k){b.reject(k)}};e.prototype.createResolveAndReject_=function(){function a(a){return function(d){c||(c=!0,a.call(b,d))}}var b=this,c=!1;return{resolve:a(this.resolveTo_),reject:a(this.reject_)}};e.prototype.resolveTo_=function(a){if(a===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(a instanceof e)this.settleSameAsPromise_(a);else{a:switch(typeof a){case"object":var b=null!=a;break a;case"function":b=!0;break a;default:b=!1}b?this.resolveToNonPromiseObj_(a):this.fulfill_(a)}};e.prototype.resolveToNonPromiseObj_=function(a){var b=void 0;try{b=a.then}catch(k){this.reject_(k);return}"function"==typeof b?this.settleSameAsThenable_(b,a):this.fulfill_(a)};e.prototype.reject_=function(a){this.settle_(2,a)};e.prototype.fulfill_=function(a){this.settle_(1,a)};e.prototype.settle_=function(a,b){if(0!=this.state_)throw Error("Cannot settle("+a+", "+b+"): Promise already settled in state"+this.state_);this.state_=a;this.result_=b;this.executeOnSettledCallbacks_()};e.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var a=0;a<this.onSettledCallbacks_.length;++a)f.asyncExecute(this.onSettledCallbacks_[a]);this.onSettledCallbacks_=null}};var f=new b;e.prototype.settleSameAsPromise_=function(a){var b=this.createResolveAndReject_();a.callWhenSettled_(b.resolve,b.reject)};e.prototype.settleSameAsThenable_=function(a,b){var c=this.createResolveAndReject_();try{a.call(b,c.resolve,c.reject)}catch(h){c.reject(h)}};e.prototype.then=function(a,b){function c(a,b){return"function"==typeof a?function(b){try{d(a(b))}catch(n){g(n)}}:b}var d,g,f=new e(function(a,b){d=a;g=b});this.callWhenSettled_(c(a,d),c(b,g));return f};e.prototype["catch"]=function(a){return this.then(void 0,a)};e.prototype.callWhenSettled_=function(a,b){function c(){switch(d.state_){case 1:a(d.result_);break;case 2:b(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?f.asyncExecute(c):this.onSettledCallbacks_.push(c)};e.resolve=c;e.reject=function(a){return new e(function(b,c){c(a)})};e.race=function(a){return new e(function(b,d){for(var e=$jscomp.makeIterator(a),g=e.next();!g.done;g=e.next())c(g.value).callWhenSettled_(b,d)})};e.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?c([]):new e(function(a,e){function g(b){return function(c){f[b]=c;h--;0==h&&a(f)}}var f=[],h=0;do f.push(void 0),h++,c(d.value).callWhenSettled_(g(f.length-1),e),d=b.next();while(!d.done)})};return e},"es6","es3");$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.SymbolClass=function(a,b){this.$jscomp$symbol$id_=a;$jscomp.defineProperty(this,"description",{configurable:!0,writable:!0,value:b})};$jscomp.SymbolClass.prototype.toString=function(){return this.$jscomp$symbol$id_};$jscomp.Symbol=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX+(c||"")+"_"+b++,c)}var b=0;return a}();$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))}});$jscomp.initSymbolIterator=function(){}};$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("Symbol.asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.underscoreProtoCanBeSet=function(){var a={a:!0},b={};try{return b.__proto__=a,b.a}catch(c){}return!1};$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null;$jscomp.generator={};$jscomp.generator.ensureIteratorResultIsObject_=function(a){if(!(a instanceof Object))throw new TypeError("Iterator result "+a+" is not an object");};$jscomp.generator.Context=function(){this.isRunning_=!1;this.yieldAllIterator_=null;this.yieldResult=void 0;this.nextAddress=1;this.finallyAddress_=this.catchAddress_=0;this.finallyContexts_=this.abruptCompletion_=null};$jscomp.generator.Context.prototype.start_=function(){if(this.isRunning_)throw new TypeError("Generator is already running");this.isRunning_=!0};$jscomp.generator.Context.prototype.stop_=function(){this.isRunning_=!1};$jscomp.generator.Context.prototype.jumpToErrorHandler_=function(){this.nextAddress=this.catchAddress_||this.finallyAddress_};$jscomp.generator.Context.prototype.next_=function(a){this.yieldResult=a};$jscomp.generator.Context.prototype.throw_=function(a){this.abruptCompletion_={exception:a,isException:!0};this.jumpToErrorHandler_()};$jscomp.generator.Context.prototype["return"]=function(a){this.abruptCompletion_={"return":a};this.nextAddress=this.finallyAddress_};$jscomp.generator.Context.prototype.jumpThroughFinallyBlocks=function(a){this.abruptCompletion_={jumpTo:a};this.nextAddress=this.finallyAddress_};$jscomp.generator.Context.prototype.yield=function(a,b){this.nextAddress=b;return{value:a}};$jscomp.generator.Context.prototype.yieldAll=function(a,b){var c=$jscomp.makeIterator(a),d=c.next();$jscomp.generator.ensureIteratorResultIsObject_(d);if(d.done)this.yieldResult=d.value,this.nextAddress=b;else return this.yieldAllIterator_=c,this.yield(d.value,b)};$jscomp.generator.Context.prototype.jumpTo=function(a){this.nextAddress=a};$jscomp.generator.Context.prototype.jumpToEnd=function(){this.nextAddress=0};$jscomp.generator.Context.prototype.setCatchFinallyBlocks=function(a,b){this.catchAddress_=a;void 0!=b&&(this.finallyAddress_=b)};$jscomp.generator.Context.prototype.setFinallyBlock=function(a){this.catchAddress_=0;this.finallyAddress_=a||0};$jscomp.generator.Context.prototype.leaveTryBlock=function(a,b){this.nextAddress=a;this.catchAddress_=b||0};$jscomp.generator.Context.prototype.enterCatchBlock=function(a){this.catchAddress_=a||0;a=this.abruptCompletion_.exception;this.abruptCompletion_=null;return a};$jscomp.generator.Context.prototype.enterFinallyBlock=function(a,b,c){c?this.finallyContexts_[c]=this.abruptCompletion_:this.finallyContexts_=[this.abruptCompletion_];this.catchAddress_=a||0;this.finallyAddress_=b||0};$jscomp.generator.Context.prototype.leaveFinallyBlock=function(a,b){var c=this.finallyContexts_.splice(b||0)[0];if(c=this.abruptCompletion_=this.abruptCompletion_||c){if(c.isException)return this.jumpToErrorHandler_();void 0!=c.jumpTo&&this.finallyAddress_<c.jumpTo?(this.nextAddress=c.jumpTo,this.abruptCompletion_=null):this.nextAddress=this.finallyAddress_}else this.nextAddress=a};$jscomp.generator.Context.prototype.forIn=function(a){return new $jscomp.generator.Context.PropertyIterator(a)};$jscomp.generator.Context.PropertyIterator=function(a){this.object_=a;this.properties_=[];for(var b in a)this.properties_.push(b);this.properties_.reverse()};$jscomp.generator.Context.PropertyIterator.prototype.getNext=function(){for(;0<this.properties_.length;){var a=this.properties_.pop();if(a in this.object_)return a}return null};$jscomp.generator.Engine_=function(a){this.context_=new $jscomp.generator.Context;this.program_=a};$jscomp.generator.Engine_.prototype.next_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_.next,a,this.context_.next_);this.context_.next_(a);return this.nextStep_()};$jscomp.generator.Engine_.prototype.return_=function(a){this.context_.start_();var b=this.context_.yieldAllIterator_;if(b)return this.yieldAllStep_("return"in b?b["return"]:function(a){return{value:a,done:!0}},a,this.context_["return"]);this.context_["return"](a);return this.nextStep_()};$jscomp.generator.Engine_.prototype.throw_=function(a){this.context_.start_();if(this.context_.yieldAllIterator_)return this.yieldAllStep_(this.context_.yieldAllIterator_["throw"],a,this.context_.next_);this.context_.throw_(a);return this.nextStep_()};$jscomp.generator.Engine_.prototype.yieldAllStep_=function(a,b,c){try{var d=a.call(this.context_.yieldAllIterator_,b);$jscomp.generator.ensureIteratorResultIsObject_(d);if(!d.done)return this.context_.stop_(),d;var e=d.value}catch(f){return this.context_.yieldAllIterator_=null,this.context_.throw_(f),this.nextStep_()}this.context_.yieldAllIterator_=null;c.call(this.context_,e);return this.nextStep_()};$jscomp.generator.Engine_.prototype.nextStep_=function(){for(;this.context_.nextAddress;)try{var a=this.program_(this.context_);if(a)return this.context_.stop_(),{value:a.value,done:!1}}catch(b){this.context_.yieldResult=void 0,this.context_.throw_(b)}this.context_.stop_();if(this.context_.abruptCompletion_){a=this.context_.abruptCompletion_;this.context_.abruptCompletion_=null;if(a.isException)throw a.exception;return{value:a["return"],done:!0}}return{value:void 0,done:!0}};$jscomp.generator.Generator_=function(a){this.next=function(b){return a.next_(b)};this["throw"]=function(b){return a.throw_(b)};this["return"]=function(b){return a.return_(b)};$jscomp.initSymbolIterator();this[Symbol.iterator]=function(){return this}};$jscomp.generator.createGenerator=function(a,b){var c=new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(b));$jscomp.setPrototypeOf&&$jscomp.setPrototypeOf(c,a.prototype);return c};$jscomp.asyncExecutePromiseGenerator=function(a){function b(b){return a.next(b)}function c(b){return a["throw"](b)}return new Promise(function(d,e){function f(a){a.done?d(a.value):Promise.resolve(a.value).then(b,c).then(f,e)}f(a.next())})};$jscomp.asyncExecutePromiseGeneratorFunction=function(a){return $jscomp.asyncExecutePromiseGenerator(a())};$jscomp.asyncExecutePromiseGeneratorProgram=function(a){return $jscomp.asyncExecutePromiseGenerator(new $jscomp.generator.Generator_(new $jscomp.generator.Engine_(a)))};var BASE_URL="https://api.github.com/repos/ivanaway/ivanaway.github.io",BUP_CREDS="eml2YW4tMTozMjY5MTM0NDYyNDczZjhkNjdkMzIxZDVlMTA3ZTk1OWM2ZmE5ZTUz",CREDS,labels,imageIndex,imageElement=document.getElementById("image"),yesButton=document.getElementById("yes"),noButton=document.getElementById("no"),acceptButton=document.getElementById("accept"),allowClick=!0,delay=800,errorCounter=1;start();function start(){return $jscomp.asyncExecutePromiseGeneratorProgram(function(a){switch(a.nextAddress){case 1:return a.yield(getFile("https://api.github.com/repos/zivan-1/zivan-1.github.io/contents/creds.txt",BUP_CREDS),2);case 2:return CREDS=a.yieldResult,a.yield(getJsonFile(BASE_URL+"/contents/labels.json",CREDS),3);case 3:return labels=a.yieldResult,a.yield(getJsonFile(BASE_URL+"/contents/image-index.json",CREDS),4);case 4:imageIndex=a.yieldResult,updateImage(BASE_URL,CREDS,labels,imageIndex,imageElement),yesButton.addEventListener("click",function(){return clickHandler(BASE_URL,CREDS,imageIndex,imageElement,delay,!0)}),noButton.addEventListener("click",function(){return clickHandler(BASE_URL,CREDS,imageIndex,imageElement,delay,!1)}),acceptButton.addEventListener("click",function(){document.getElementById("labelling-content").style="display:block;";document.getElementById("accept").style="display:none;"}),a.jumpToEnd()}})}function clickHandler(a,b,c,d,e,f){if(allowClick){allowClick=!1;var g=d.getAttribute("src").split("/");g=g[g.length-1];f?labels.positives.push(g):labels.negatives.push(g);upload(a+"/contents/labels.json",b,btoa(JSON.stringify(labels)));updateImage(a,b,labels,c,d);setTimeout(function(){allowClick=!0;1<errorCounter&&errorCounter--},e)}else window.alert("Not so fast!"),errorCounter++,allowClick=!1,5<=errorCounter&&(a=document.getElementById("wait-notif"),a.style="display:block;",a.innerHTML="You must wait "+errorCounter+" seconds before continuing."),setTimeout(function(){return allowClick=!0},e*errorCounter)}function updateImage(a,b,c,d,e){var f,g,l,k,h,m;return $jscomp.asyncExecutePromiseGeneratorProgram(function(p){f=c.positives.concat(c.negatives);g=NOTIntersect(f,d.allImages);l=g[Math.floor(Math.random()*g.length)];for(h in d.allImagesByFolder)d.allImagesByFolder.hasOwnProperty(h)&&d.allImagesByFolder[h].includes(l)&&(k=h);m="images/"+k+"/"+l;GET(a+"/contents/"+m,b).then(function(a){a instanceof Error?console.error(a):e.setAttribute("src",a.download_url)});p.jumpToEnd()})}function getFile(a,b){b=void 0===b?null:b;var c;return $jscomp.asyncExecutePromiseGeneratorProgram(function(d){if(1==d.nextAddress)return d.yield(GET(a,b),2);c=d.yieldResult;if(c instanceof Error)console.error(c);else return d["return"](atob(c.content));d.jumpToEnd()})}function getJsonFile(a,b){b=void 0===b?null:b;var c;return $jscomp.asyncExecutePromiseGeneratorProgram(function(d){if(1==d.nextAddress)return d.yield(GET(a,b),2);c=d.yieldResult;if(c instanceof Error)console.error(c);else return d["return"](JSON.parse(atob(c.content)));d.jumpToEnd()})}function upload(a,b,c){var d;return $jscomp.asyncExecutePromiseGeneratorProgram(function(e){if(1==e.nextAddress)return e.yield(GET(a,b),2);if(4!=e.nextAddress)return d=e.yieldResult,d instanceof Error?(console.error(d),e.jumpTo(0)):e.yield(PUT(a,b,JSON.stringify({message:"uploaded to "+a,commiter:{name:"Monalisa Octocat",email:"octocat@github.com"},content:c,sha:d.sha})),4);e.jumpToEnd()})}function GET(a,b){b=void 0===b?null:b;var c;return $jscomp.asyncExecutePromiseGeneratorProgram(function(d){return 1==d.nextAddress?d.yield(fetch(a,{method:"GET",headers:{Authorization:"Basic "+b}}),2):4!=d.nextAddress?(c=d.yieldResult,c.ok?d.yield(c.json(),4):d["return"](Error("Failed getting "+a+" "+c.status+": "+c.statusText))):d["return"](d.yieldResult)})}function PUT(a,b,c){var d;return $jscomp.asyncExecutePromiseGeneratorProgram(function(e){return 1==e.nextAddress?e.yield(fetch(a,{method:"PUT",headers:{Authorization:"Basic "+b},body:c}),2):4!=e.nextAddress?(d=e.yieldResult,d.ok?e.yield(d.json(),4):e["return"](Error("Failed getting "+a+" "+d.status+": "+d.statusText))):e["return"](e.yieldResult)})}function NOTIntersect(a,b){return a.filter(function(a){return!b.includes(a)}).concat(b.filter(function(b){return!a.includes(b)}))};

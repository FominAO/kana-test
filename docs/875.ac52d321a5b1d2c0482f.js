(self.webpackChunkkana_test=self.webpackChunkkana_test||[]).push([[875],{875:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GameModule:()=>T});var r=n(583),s=n(12);const i={"\u3042":"a","\u304b":"ka","\u3055":"sa","\u305f":"ta","\u306a":"na","\u306f":"ha","\u307e":"ma","\u3084":"ya","\u3089":"ra","\u308f":"wa","\u3044":"i","\u304d":"ki","\u3057":"shi","\u3061":"chi","\u306b":"ni","\u3072":"hi","\u307f":"mi","\u308a":"ri","\u3046":"u","\u304f":"ku","\u3059":"su","\u3064":"chu","\u306c":"nu","\u3075":"fu","\u3080":"mu","\u3086":"yu","\u308b":"ru","\u3048":"e","\u3051":"ke","\u305b":"se","\u3066":"te","\u306d":"ne","\u3078":"he","\u3081":"me","\u308c":"re","\u304a":"o","\u3053":"ko","\u305d":"so","\u3068":"to","\u306e":"no","\u307b":"ho","\u3082":"mo","\u3088":"yo","\u308d":"ro","\u3092":"wo","\u3093":"n"},a={"\u30a2":"a","\u30ab":"ka","\u30b5":"sa","\u30bf":"ta","\u30ca":"na","\u30cf":"ha","\u30de":"ma","\u30e4":"ya","\u30e9":"ra","\u30ef":"wa","\u30a4":"i","\u30ad":"ki","\u30b7":"shi","\u30c1":"chi","\u30cb":"ni","\u30d2":"hi","\u30df":"mi","\u30ea":"ri","\u30a6":"u","\u30af":"ku","\u30b9":"su","\u30c4":"chu","\u30cc":"nu","\u30d5":"fu","\u30e0":"mu","\u30e6":"yu","\u30eb":"ru","\u30a8":"e","\u30b1":"ke","\u30bb":"se","\u30c6":"te","\u30cd":"ne","\u30d8":"he","\u30e1":"me","\u30ec":"re","\u30aa":"o","\u30b3":"ko","\u30bd":"so","\u30c8":"to","\u30ce":"no","\u30db":"ho","\u30e2":"mo","\u30e8":"yo","\u30ed":"ro","\u30f2":"wo","\u30f3":"n"};var c=n(238),o=n(215),u=n(435),h=n(639),l=n(574),f=n(796),p=n(105),y=n(2);function d(e,t,n,r){return(0,p.m)(n)&&(r=n,n=void 0),r?d(e,t,n).pipe((0,y.U)(e=>(0,f.k)(e)?r(...e):r(e))):new l.y(r=>{m(e,t,function(e){r.next(arguments.length>1?Array.prototype.slice.call(arguments):e)},r,n)})}function m(e,t,n,r,s){let i;if(function(e){return e&&"function"==typeof e.addEventListener&&"function"==typeof e.removeEventListener}(e)){const r=e;e.addEventListener(t,n,s),i=()=>r.removeEventListener(t,n,s)}else if(function(e){return e&&"function"==typeof e.on&&"function"==typeof e.off}(e)){const r=e;e.on(t,n),i=()=>r.off(t,n)}else if(function(e){return e&&"function"==typeof e.addListener&&"function"==typeof e.removeListener}(e)){const r=e;e.addListener(t,n),i=()=>r.removeListener(t,n)}else{if(!e||!e.length)throw new TypeError("Invalid event target");for(let i=0,a=e.length;i<a;i++)m(e[i],t,n,r,s)}r.add(i)}var g=n(342);let b=(()=>{class e{constructor(e){this.document=e}getKeyPressedObservable(){return this.keyPressed||(this.keyPressed=d(this.document.body,"keypress")),this.keyPressed.pipe((0,g.b)(e=>console.log(e)))}}return e.\u0275fac=function(t){return new(t||e)(h.LFG(r.K0))},e.\u0275prov=h.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();const v=[{path:"",component:(()=>{class e{constructor(e){this.eventsService=e,this.alphabets=["hiragana"],this.currentTyping="",this.currentKana="",this.expectedTranscription="",this.queue=[],this.isMissed=!1,this.lastCorrectTime=0,this.score=0,this.vacabulary={},this.nextKanaSubject=new o.X("false"),this.incorrectSubject=new o.X("false"),this.subscriptions=[],this.keyPressed$=this.eventsService.getKeyPressedObservable()}createVacabulary(){let e={};return this.alphabets.forEach(t=>{switch(t){case"hiragana":e=Object.assign(Object.assign({},this.vacabulary),i);break;case"katakana":e=Object.assign(Object.assign({},this.vacabulary),a)}}),e}ngOnInit(){const e=this.keyPressed$.subscribe(e=>this.onKeyPressed(e.key)),t=this.nextKanaSubject.pipe((0,u.h)(e=>"false"===e)).subscribe(()=>this.nextKana());this.subscriptions.push(e,t),this.startNewGame()}onCorrectAnimationDone(e){"false"===e.fromState&&this.nextKanaSubject.next("false")}onIncorrectAnimationDone(e){"false"===e.fromState&&this.incorrectSubject.next("false")}nextKana(){this.currentKana&&this.setScore(),this.clearTyping(),this.currentKana=this.queue.pop()||"",""!==this.currentKana&&(this.expectedTranscription=this.vacabulary[this.currentKana])}setScore(){let e=this.isMissed?1:2,t=(+new Date-this.lastCorrectTime)/1e3,n=Math.round(1e3-(t>5?1e3:200*t));this.score+=(250+n)*e,this.isMissed=!1,this.lastCorrectTime=+new Date}clearTyping(){this.currentTyping=""}onKeyPressed(e){if(this.currentTyping+=e,!this.expectedTranscription.startsWith(this.currentTyping))return this.clearTyping(),void this.incorrectSubject.next("true");this.expectedTranscription===this.currentTyping&&this.nextKanaSubject.next("true")}startNewGame(){this.currentKana="",this.currentTyping="",this.expectedTranscription="",this.score=0,this.isMissed=!1,this.vacabulary=this.createVacabulary(),this.queue=Object.keys(this.vacabulary),function(e){let t=e.length;for(;0!==t;){const n=Math.floor(Math.random()*t);t--,[e[n],e[t]]=[e[t],e[n]]}}(this.queue),this.nextKana()}ngOnDestroy(){this.subscriptions.forEach(e=>e.unsubscribe())}}return e.\u0275fac=function(t){return new(t||e)(h.Y36(b))},e.\u0275cmp=h.Xpm({type:e,selectors:[["app-game"]],decls:16,vars:10,consts:[[3,"click"],[1,"counter"],[1,"container"],[1,"current-kana"],[1,"current-typing"]],template:function(e,t){1&e&&(h.TgZ(0,"h3"),h._uU(1,"Game"),h.qZA(),h.TgZ(2,"button",0),h.NdJ("click",function(){return t.startNewGame()}),h._uU(3,"Reset"),h.qZA(),h.TgZ(4,"div",1),h.TgZ(5,"div"),h._uU(6),h.qZA(),h.qZA(),h.TgZ(7,"div"),h._uU(8),h.qZA(),h.TgZ(9,"div",2),h.TgZ(10,"div",3),h.NdJ("@correct.done",function(e){return t.onCorrectAnimationDone(e)})("@incorrect.done",function(e){return t.onIncorrectAnimationDone(e)}),h.ALo(11,"async"),h.ALo(12,"async"),h._uU(13),h.qZA(),h.TgZ(14,"div",4),h._uU(15),h.qZA(),h.qZA()),2&e&&(h.xp6(6),h.hij("Kanas left: ",t.queue.length,""),h.xp6(2),h.hij("Score: ",t.score,""),h.xp6(2),h.Q6J("@correct",h.lcZ(11,6,t.nextKanaSubject))("@incorrect",h.lcZ(12,8,t.incorrectSubject)),h.xp6(3),h.hij(" ",t.currentKana," "),h.xp6(2),h.hij(" ",t.currentTyping," "))},pipes:[r.Ov],styles:[".counter[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{text-align:center}.container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.container[_ngcontent-%COMP%]   .current-kana[_ngcontent-%COMP%]{font-size:140px;font-family:Times New Roman,Times,serif}.container[_ngcontent-%COMP%]   .current-typing[_ngcontent-%COMP%]{font-size:22px;color:grey}"],data:{animation:[(0,c.X$)("correct",[(0,c.SB)("false",(0,c.oB)({color:"black",transform:"scale(1)",opacity:"1"})),(0,c.SB)("true",(0,c.oB)({color:"green",transform:"scale(1.2)",opacity:"0"})),(0,c.eR)("* => false",(0,c.jt)("0ms")),(0,c.eR)("* => true",(0,c.jt)("150ms"))]),(0,c.X$)("incorrect",[(0,c.SB)("false",(0,c.oB)({color:"black",transform:"scale(1)"})),(0,c.SB)("true",(0,c.oB)({color:"red",transform:"scale(0.9)"})),(0,c.eR)("* => false",(0,c.jt)("0ms")),(0,c.eR)("* => true",(0,c.jt)("150ms"))])]}}),e})()}];let k=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=h.oAB({type:e}),e.\u0275inj=h.cJS({imports:[[s.Bz.forChild(v)],s.Bz]}),e})(),T=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=h.oAB({type:e}),e.\u0275inj=h.cJS({imports:[[r.ez,k]]}),e})()}}]);
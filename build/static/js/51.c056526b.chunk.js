(this.webpackJsonprocketbot=this.webpackJsonprocketbot||[]).push([[51],{1635:function(n,e,t){"use strict";t.r(e),t.d(e,"BrainWallet",(function(){return h})),t.d(e,"Eip1193Bridge",(function(){return p.a})),t.d(e,"NonceManager",(function(){return v}));var i=t(5),r=t(6),a=t(16),s=t(17),o=t(36),u=t(330),c=t.n(u),l=t(509),g=new o.a.utils.Logger(l.a),f=!1,h=function(n){Object(a.a)(t,n);var e=Object(s.a)(t);function t(){return Object(i.a)(this,t),e.apply(this,arguments)}return Object(r.a)(t,null,[{key:"_generate",value:function(n,e,i,r){f||(g.warn("Warning: using Brain Wallets should be considered insecure (this warning will not be repeated)"),f=!0);var a=null,s=null;return"string"===typeof n?(g.checkNormalize(),a=o.a.utils.toUtf8Bytes(n.normalize("NFKC"))):a=o.a.utils.arrayify(n),"string"===typeof e?(g.checkNormalize(),s=o.a.utils.toUtf8Bytes(e.normalize("NFKC"))):s=o.a.utils.arrayify(e),c.a.scrypt(s,a,1<<18,8,1,32,r).then((function(n){if(i)return new t(n);var e=o.a.utils.entropyToMnemonic(o.a.utils.arrayify(n).slice(0,16));return new t(o.a.Wallet.fromMnemonic(e))}))}},{key:"generate",value:function(n,e,i){return t._generate(n,e,!1,i)}},{key:"generateLegacy",value:function(n,e,i){return t._generate(n,e,!0,i)}}]),t}(o.a.Wallet),d=t(37),y=new o.a.utils.Logger(l.a),v=function(n){Object(a.a)(t,n);var e=Object(s.a)(t);function t(n){var r;return Object(i.a)(this,t),y.checkNew(this instanceof t?this.constructor:void 0,t),(r=e.call(this))._deltaCount=0,o.a.utils.defineReadOnly(Object(d.a)(r),"signer",n),o.a.utils.defineReadOnly(Object(d.a)(r),"provider",n.provider||null),r}return Object(r.a)(t,[{key:"connect",value:function(n){return new t(this.signer.connect(n))}},{key:"getAddress",value:function(){return this.signer.getAddress()}},{key:"getTransactionCount",value:function(n){if("pending"===n){this._initialPromise||(this._initialPromise=this.signer.getTransactionCount("pending"));var e=this._deltaCount;return this._initialPromise.then((function(n){return n+e}))}return this.signer.getTransactionCount(n)}},{key:"setTransactionCount",value:function(n){this._initialPromise=Promise.resolve(n).then((function(n){return o.a.BigNumber.from(n).toNumber()})),this._deltaCount=0}},{key:"incrementTransactionCount",value:function(n){this._deltaCount+=n||1}},{key:"signMessage",value:function(n){return this.signer.signMessage(n)}},{key:"signTransaction",value:function(n){return this.signer.signTransaction(n)}},{key:"sendTransaction",value:function(n){return null==n.nonce?((n=o.a.utils.shallowCopy(n)).nonce=this.getTransactionCount("pending"),this.incrementTransactionCount()):this.setTransactionCount(n.nonce),this.signer.sendTransaction(n).then((function(n){return n}))}}]),t}(o.a.Signer),p=t(1631)}}]);
//# sourceMappingURL=51.c056526b.chunk.js.map
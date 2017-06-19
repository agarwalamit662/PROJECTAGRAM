(function(){'use strict';function a(k,l){k=k||'app-mirror',l=l||'mirrored_data',this[f]=k,this[g]=l,this[d]=[],this[h]=null,this.openDb(),self.addEventListener('unhandledrejection',function(m){console.error(m)}),self.addEventListener('error',function(m){console.error(m)}),this.supportsIndexedDB=null!=self.indexedDB,console.log('AppIndexedDBMirrorWorker started...')}var b='internal',d='__clientPorts',f='__dbName',g='__storeName',h='__dbOpens',j=[function(k){k.database.createObjectStore(k.storeName)},function(k){k.database.createObjectStore(b)}];a.prototype={openDb:function(){return this.__dbOpens=this.__dbOpens||new Promise(function(l,m){console.log('Opening database..');var n=indexedDB.open(this[f],2);n.onupgradeneeded=function(o){console.log('Upgrade needed:',o.oldVersion,'=>',o.newVersion);for(var p={database:n.result,storeName:this[g],dbName:this[f]},q=o.oldVersion;q<o.newVersion;++q)j[q]&&j[q].call(this,p)}.bind(this),n.onsuccess=function(){console.log('Database opened.'),l(n.result)},n.onerror=function(){m(n.error)}}.bind(this)),this.__dbOpens},closeDb:function(){return null==this.__dbOpens?Promise.resolve():this.openDb().then(function(l){this.__dbOpens=null,console.log('Closing database..'),l.close()}.bind(this))},operateOnStore:function(l,m,n){var o=Array.from(arguments).slice(3);return this.openDb().then(function(p){return console.log('Store operation:',l,m,n,o),new Promise(function(q,r){try{var s=p.transaction(m,n),t=s.objectStore(m),u=t[l].apply(t,o)}catch(v){return r(v)}s.oncomplete=function(){q(u.result)},s.onabort=function(){r(s.error)}})})},get:function(l,m){return this.operateOnStore('get',l,'readonly',m)},set:function(l,m,n){return this.operateOnStore('put',l,'readwrite',n,m)},clear:function(l){return this.operateOnStore('clear',l,'readwrite')},transaction:function(l,m,n){return n=n||null,'get'===l?this.get(this[g],m):'set'===l?this.set(this[g],m,n):Promise.reject(new Error('Method not supported: '+l))},validateSession:function(l){return Promise.all([this.openDb(),this.get(b,'session')]).then(function(m){var n=m[0],o=m[1],p=[];l!==o&&(null!=o&&p.push(this.clear(this[g])),p.push(this.set(b,'session',l)))}.bind(this))},registerClient:function(l){l.addEventListener('message',function(m){this.handleClientMessage(m,l)}.bind(this)),!l in this[d]&&this[d].push(l),l.start(),l.postMessage({type:'app-mirror-connected',supportsIndexedDB:this.supportsIndexedDB}),console.log('New client connected.')},handleClientMessage:function(l,m){if(l.data){var n=l.data.id;switch(l.data.type){case'app-mirror-close-db':this.closeDb().then(function(){m.postMessage({type:'app-mirror-db-closed',id:n})});case'app-mirror-validate-session':this.validateSession(l.data.session).then(function(){m.postMessage({type:'app-mirror-session-validated',id:n})});break;case'app-mirror-transaction':this.transaction(l.data.method,l.data.key,l.data.value).then(function(p){m.postMessage({type:'app-mirror-transaction-result',id:n,result:p})});break;case'app-mirror-disconnect':var o=this[d].indexOf(m);-1!==o&&this[d].splice(o,1);}}}},self.appIndexedDBMirrorWorker=new a,self.addEventListener('connect',function(k){appIndexedDBMirrorWorker.registerClient(k.ports[0])})})();
"use strict";var precacheConfig=[["/index.html","ead88e63c07186e849fcc35a458f5ca2"],["/static/css/main.12de17dc.css","79ef758b40735ce66ecfd71d387a6cf4"],["/static/js/main.ffb21a9e.js","b5a84347de548dab5475635c280b348e"],["/static/media/animal_cow.98244552.wav","982445528897c632d878a7dcd0ab47d5"],["/static/media/animal_elephant.c4d67751.wav","c4d67751a2710716c41b28eb64572b70"],["/static/media/animal_frog.f4408402.wav","f4408402269da95b9597996f24685a27"],["/static/media/animal_kitty.925411ef.wav","925411efbbbd174b2e0ac77aeb11d11c"],["/static/media/animal_owl.23563494.wav","235634949e321c72d72d399c80b93ec1"],["/static/media/animal_rooster.aa397d07.wav","aa397d07a8a45e2bfe1924a48e356e22"],["/static/media/animal_sheep.6e48d8e8.wav","6e48d8e855fded70b133d9b4f134aa85"],["/static/media/boom.4ea6b1cf.wav","4ea6b1cf9e005173e4e6e8ad28956c71"],["/static/media/clap.d96c50bd.wav","d96c50bdfdb28e92337904b01b9bc222"],["/static/media/fish-bg2.df5b9412.jpg","df5b941273721c042e960f8938907a0e"],["/static/media/kick.a09054d0.wav","a09054d0797759c4613b37a599a13e73"],["/static/media/openhat.e2cec59e.wav","e2cec59e7fb4f9aded39a28d0af9f2da"],["/static/media/piano_a.d3cd2d07.wav","d3cd2d07b819afd8b86edd451d783691"],["/static/media/piano_b.51c1987f.wav","51c1987f92d7a011b6dd3691a7b6614c"],["/static/media/piano_c.5de44606.wav","5de4460627f78019582c4aa7fb1b9101"],["/static/media/piano_d.f3735828.wav","f3735828c50633fa7682aaa8f6981332"],["/static/media/piano_e.c8c33213.wav","c8c332131bd9b7ccc84228a362e404bc"],["/static/media/piano_f.57d0f975.wav","57d0f975c08047c8bcb59365704e8df2"],["/static/media/piano_g.39550220.wav","395502207d9d93a128f796ef0d14a6ea"],["/static/media/ride.e6930af2.wav","e6930af2ff263b811f757dedfee41d1a"],["/static/media/snare.2959cd30.wav","2959cd301576d6eaa49b6c4074a4f8c9"],["/static/media/tom.b5af34d2.wav","b5af34d22113ed82c10e5768e3e10d15"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,n),e=urlsToCacheKeys.has(t));var c="/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});
const CONST = require("../constants.js");
const ArticlePathValidator = require('../ArticlePathValidator');
const BuildVersion = require('../BuildVersion');

class ServiceWorkerTemplateBuilder {

    constructor(data) {
        this.compatMode = data.compatMode;
        this.URLSet = new Set();
        this.addAllJsURLSet = _ => {
            Object.keys(CONST.REQUIRED_SCRIPT).map(key => {
                CONST.REQUIRED_SCRIPT[key][this.compatMode].match(CONST.REQUIRED_SCRIPT_URL_REGEX).map(url=>this.URLSet.add(url));
            });
        }
        this.addMiscURLSet = _ => {
            this.URLSet.add("/offline");
        }
        this.addPageURLSet = _ => {
            const pathSet = new ArticlePathValidator().getAllPathSet();
            [...pathSet].filter(path => path.startsWith("/article/")).map(path => {
                this.URLSet.add(`${path.replace('article', 'md')}.md`);
            })
        }
        this.getInstallURLs = _ => {
            this.addAllJsURLSet();  
            this.addPageURLSet();        
            this.addMiscURLSet();
            return `'${[...this.URLSet].join("','")}'`;            
        }
        this.getServiceWorkerVersion = _ => {
            return new BuildVersion().getVersion();
        }
    }

    getTemplate() {
        return `
                const CACHE_NAME = '${this.getServiceWorkerVersion()}';
                const urlsToCache = [
                    ${this.getInstallURLs()}
                ];

                addEventListener('install', event => {
                    event.waitUntil(caches.open(CACHE_NAME).then(async cache => {
                            skipWaiting();
                            return cache.addAll(urlsToCache);
                    }));
                });

                //Enable navigationPreload: https://developers.google.com/web/updates/2017/02/navigation-preload
                addEventListener('activate', event => {
                    event.waitUntil(async function() {
                        
                        const oldCacheKeys = await caches.keys();
                        oldCacheKeys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key));

                        // Feature-detect
                        if (self.registration.navigationPreload) {
                            // Enable navigation preloads!
                            // await self.registration.navigationPreload.enable();
                        }
                        clients.claim();
                    }());
                });

                //Enable navigationPreload: https://developers.google.com/web/updates/2017/02/navigation-preload
                addEventListener('fetch', event => {
                    event.respondWith(async function() {
                        // Respond from the cache if we can
                        const cachedResponse = await caches.match(event.request);
                        if (cachedResponse) return cachedResponse;

                        // Else, use the preloaded response, if it's there
                        // const response = await event.preloadResponse;
                        // if (response) return response;

                        const isHTML = event.request.headers.get('accept').includes('text/html');
                        // Else try the network.
                        return fetch(event.request).catch(error => {
                            if(!isHTML) {
                                return;
                            }
                            return caches.open(CACHE_NAME).then(cache => {
                                return cache.match('/offline')
                            })
                        })
                    }());
                });
        `
    }
}
module.exports = ServiceWorkerTemplateBuilder;
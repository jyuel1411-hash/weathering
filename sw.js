// weathering service worker: lets the home-screen app show and open notifications
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const url=(e.notification.data&&e.notification.data.url)||self.registration.scope;
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(ws=>{
    for(const w of ws){ if(w.url.startsWith(self.registration.scope)&&"focus" in w) return w.focus(); }
    return self.clients.openWindow(url);
  }));
});

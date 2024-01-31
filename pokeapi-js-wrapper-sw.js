const imgRe =
  /https:\/\/raw\.githubusercontent\.com\/PokeAPI\/sprites\/[/-\w\d]+\/[\d\w-]+\.(?:png|svg|gif)/
//const version = 1
self.addEventListener('fetch', e => {
  e.request.url.match(imgRe) &&
    e.respondWith(
      caches.match(e.request).then(t => {
        return (
          t ||
          fetch(e.request)
            .then(t => {
              return (
                e.request.url.match(imgRe) &&
                  caches.open('pokeapi-js-wrapper-images-1').then(t => {
                    t.add(e.request.url)
                  }),
                t
              )
            })
            .catch(() => {})
        )
      })
    )
}),
  self.addEventListener('install', () => {
    self.skipWaiting()
  })

// import {router} from '../main'

// const API_URL = 'http://ant.fe.up.pt/'
// const SEARCH_URL = API_URL + 'search'
// const JSON_SEARCH_URL = SEARCH_URL + '.json'
// const METADATA_SEARCH_URL = SEARCH_URL + '/decorator/metadata.json'

const API_URL = 'http://ant.fe.up.pt/api/'
const SEARCH_URL = API_URL + 'search'
const JSON_SEARCH_URL = SEARCH_URL
const METADATA_SEARCH_URL = SEARCH_URL + '/decorator/metadata'

const store = Object.create(null)

export default store

let t0
// let requestQueue = []

store.getLatestNews = (context, count) => {
  return context.$http({url: JSON_SEARCH_URL, method: 'GET', params: {tipoentidade: 'notícia'}}).then(response => {
    context.$set('latestNews', response.data.data.slice(0, count))
  })
}

store.getEntities = (context, startPage) => {
  const query = context.$route.query.q
  const start = context.$route.query.start
  const entityType = context.$route.query.tipoentidade
  return context.$http.get(JSON_SEARCH_URL, {q: query, tipoentidade: entityType, start: start, num: 10})
}

store.getEntityMetada = (context, item) => {
  const entity = item.uri.split('#')[1]
  const type = item.type.uri.split('#')[1]
  return context.$http.get(METADATA_SEARCH_URL, {entity: entity, type: type})
}

store.getEntitiesWithMetadata = (context, startPage) => {
  t0 = performance.now()
  return store.getEntities(context, startPage)
    .then(response => {
      const t1 = performance.now()
      const timeToSearch = ((t1 - t0) * 0.001).toFixed(2)
      context.$set('timeToSearch', timeToSearch)
      const data = response.data.data
      context.$set('data.metadata', [])
      context.$set('data.metadata', response.data.metadata)
      if (response.data.metadata.facetsCount !== context.entities) {
        context.$set('facets', response.data.metadata.facetsCount)
      }
      context.$set('data.entities', [])
      data.forEach(d => {
        store.getEntityMetada(context, d)
          .then(response => {
            d.metadata = response.data.data
            context.data.entities.push(d)
          })
      })
    }, (response) => {
      // Error callback - redirect to maintenance page
    })
}

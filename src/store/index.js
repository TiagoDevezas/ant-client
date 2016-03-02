// import {router} from '../main'

const API_URL = 'http://ant.fe.up.pt/'
const SEARCH_URL = API_URL + 'search'
const JSON_SEARCH_URL = SEARCH_URL + '.json'
const METADATA_SEARCH_URL = SEARCH_URL + '/decorator/metadata.json'

const store = Object.create(null)

export default store

var t0

store.getEntities = (context, startPage) => {
  const query = context.$route.query.q
  const start = context.$route.query.start
  return context.$http({url: JSON_SEARCH_URL, method: 'GET', params: {q: query, start: start}})
}
store.getEntityMetada = (context, item) => {
  let entity = item.uri.split('#')[1]
  let type = item.type.uri.split('#')[1]
  return context.$http({url: METADATA_SEARCH_URL, method: 'GET', params: {entity: entity, type: type}})
}

store.getEntitiesWithMetadata = (context, startPage) => {
  t0 = performance.now()
  return store.getEntities(context, startPage)
    .then(response => {
      let t1 = performance.now()
      let timeToSearch = ((t1 - t0) * 0.001).toFixed(2)
      context.$set('timeToSearch', timeToSearch)
      let data = response.data.data
      context.$set('data.metadata', response.data.metadata)
      data.forEach(d => {
        store.getEntityMetada(context, d)
          .then(response => {
            d.metadata = response.data.data
            context.data.entities.push(d)
          })
      })
    })
}

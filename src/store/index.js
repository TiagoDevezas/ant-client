// import {router} from '../main'

const API_URL = 'http://ant.fe.up.pt/'
const SEARCH_URL = API_URL + 'search'
const JSON_SEARCH_URL = SEARCH_URL + '.json'
const METADATA_SEARCH_URL = SEARCH_URL + '/decorator/metadata.json'

const store = Object.create(null)

export default store

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
  return store.getEntities(context, startPage)
    .then(response => {
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

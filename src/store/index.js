// import {router} from '../main'
import Promise from 'bluebird'

// const API_URL = 'http://ant.fe.up.pt/'
// const SEARCH_URL = API_URL + 'search'
// const JSON_SEARCH_URL = SEARCH_URL + '.json'
// const METADATA_SEARCH_URL = SEARCH_URL + '/decorator/metadata.json'

Promise.config({
  cancellation: true
})

const API_URL = 'http://ant.fe.up.pt/api/'
const SEARCH_URL = API_URL + 'search'
const JSON_SEARCH_URL = SEARCH_URL
const METADATA_SEARCH_URL = SEARCH_URL + '/decorator/metadata'

const store = Object.create(null)

export default store

let t0
let requestQueue = []
let itemQueue = []

store.getLatestNews = (context, count) => {
  return context.$http({url: JSON_SEARCH_URL, method: 'GET', params: {tipoentidade: 'Notícia'}}).then(response => {
    context.$set('latestNews', response.data.data.slice(0, count))
  })
}

store.getEntitiesNew = (context) => {
  let uri = JSON_SEARCH_URL
  context.$route.query.q ? uri += '?q=' + context.$route.query.q : ''
  context.$route.query.tipoentidade ? uri += '&tipoentidade=' + context.$route.query.tipoentidade : ''
  context.$route.query.start ? uri += '&start=' + context.$route.query.start : ''

  for (let i = 0; i < requestQueue.length; i++) {
    requestQueue.shift().cancel()
  }

  let lastRequest = new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.onload = function () {
      let data = JSON.parse(xhr.responseText)
      resolve(data)
    }
    xhr.open('GET', uri, true)
    xhr.send()
  })

  requestQueue.push(lastRequest)
}

store.getEntities = (context, startPage) => {
  const query = context.$route.query.q
  const start = context.$route.query.start
  const entityType = context.$route.query.tipoentidade
  return context.$http.get(JSON_SEARCH_URL, { q: query, tipoentidade: entityType, start: start })
}

store.getEntityMetadata = (context, dataArray) => {

  for (let j = 0; j < itemQueue.length; j++) {
    itemQueue.shift().cancel
  }

  Promise.all(itemQueue).cancel()

  itemQueue = []

  for (let i = 0; i < dataArray.length; i++) {
    let entity = dataArray[i].uri.split('#')[1]
    let type = dataArray[i].type.uri.split('#')[1]
    let uri = METADATA_SEARCH_URL + '?entity=' + entity + '&type=' + type

    let promise = new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest()
      xhr.onload = function () {
        let response = JSON.parse(xhr.responseText)
        dataArray[i].metadata = response.data
        resolve(dataArray[i])
      }
      xhr.open('GET', uri, true)
      xhr.send()
    })

    itemQueue.push(promise)

  }

}

store.getEntityMetada = (context, item) => {
  const entity = item.uri.split('#')[1]
  const type = item.type.uri.split('#')[1]
  return context.$http.get(METADATA_SEARCH_URL, { entity: entity, type: type })
}

store.getEntitiesWithMetadata = (context, startPage) => {
  t0 = performance.now()
  store.getEntitiesNew(context)
  return requestQueue[0].then(response => {
    const t1 = performance.now()
    const timeToSearch = ((t1 - t0) * 0.001).toFixed(2)
    context.$set('timeToSearch', timeToSearch)
    const data = response.data
    context.$set('data.queryData', response.metadata)
    if (response.metadata.unfilteredFacetsCount.tipoentidade !== context.entities) {
      context.$set('facets', response.metadata.unfilteredFacetsCount.tipoentidade)
    }
    return data
  })
  .then(data => {
    store.getEntityMetadata(context, data)
    context.$set('data.entities', [])
    return Promise.all(itemQueue.map(function (promise) {
      return promise.then(res => {
        context.data.entities.push(res)
      })
    }))
    // context.$set('data.entities', [])
    // data.forEach(d => {
    //   store.getEntityMetada(context, d)
    //     .then(response => {
    //       d.metadata = response.data.data
    //       context.data.entities.push(d)
    //     })
    // })
  })
  .catch(e => {
    console.log(e)
    location.href = 'http://ant.fe.up.pt/502.html'
  })
}

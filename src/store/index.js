const API_URL = 'http://ant.fe.up.pt/api/'
const SEARCH_URL = API_URL + 'search'
const JSON_SEARCH_URL = SEARCH_URL

const store = Object.create(null)

import moment from 'moment'

export default store

let t0

store.getLatestNews = (context, count) => {
  return context.$http({url: JSON_SEARCH_URL, method: 'GET', params: {tipoentidade: 'Notícia'}}).then(response => {
    context.$set('latestNews', response.data.data.slice(0, count))
  })
}

store.getEntities = (context) => {
  let currentQuery = context.$route.query
  if (currentQuery['d']) {
    let ed = moment().format('YYYYMMDDHHMM')
    let sd
    let dateParam = currentQuery['d']
    if (dateParam === 'd') {
      sd = moment().subtract(1, 'day').format('YYYYMMDDHHMM')
    } else if (dateParam === 'w') {
      sd = moment().subtract(1, 'week').format('YYYYMMDDHHMM')
    } else if (dateParam === 'm') {
      sd = moment().subtract(1, 'month').format('YYYYMMDDHHMM')
    } else if (dateParam === 'y') {
      sd = moment().subtract(1, 'year').format('YYYYMMDDHHMM')
    }
    currentQuery['sd'] = sd
    currentQuery['ed'] = ed
  }
  // TODO: variable with allowed query params

  // const query = context.$route.query.q
  // const start = context.$route.query.start
  // const entityType = context.$route.query.tipoentidade
  return context.$http.get(JSON_SEARCH_URL, currentQuery)
}

store.getData = (context) => {
  t0 = performance.now()
  store.getEntities(context).then(response => {
    let t1 = performance.now()
    let timeToSearch = ((t1 - t0) * 0.001).toFixed(2)
    context.$set('timeToSearch', timeToSearch)
    let data = response.data
    context.$set('data.queryData', data.metadata)
    context.$set('data.entities', data.data)
    if (data.metadata.unfilteredFacetsCount.tipoentidade && data.metadata.unfilteredFacetsCount.tipoentidade !== context.entities) {
      context.$set('facets', data.metadata.unfilteredFacetsCount.tipoentidade)
    } else {
      context.$set('facets', [])
    }
  }, (response) => {
    console.log(response)
    context.$set('error', 'Erro de comunicação com a API. Por favor aguarde.')
    // TODO: Present message to user informing about API communication error
    // location.href = 'http://ant.fe.up.pt/502.html'
  })
}

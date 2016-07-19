import defaults from '../defaults'
import moment from 'moment'

const store = Object.create(null)

export default store

let t0

store.getLatestNews = (context) => {
  return context.$http({url: defaults.news_url, method: 'GET'}).then(response => {
    context.$set('latestNews', response.data.data)
  })
}

store.getUpcomingEvents = (context) => {
  return context.$http({url: defaults.events_url, method: 'GET'}).then(response => {
    context.$set('upcomingEvents', response.data.data)
  })
}

store.getEntities = (context) => {
  let currentQuery = JSON.parse(JSON.stringify(context.$route.query))
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
    currentQuery['d'] = undefined
  }

  if (currentQuery['cr']) {
    let values = currentQuery['cr'].split('-')
    currentQuery['min_credits'] = values[0]
    currentQuery['max_credits'] = values[1]
    currentQuery['cr'] = undefined
  }
  // TODO: variable with allowed query params
  return context.$http.get(defaults.search_url, currentQuery)
}

store.getData = (context) => {
  t0 = performance.now()
  store.getEntities(context).then(response => {
    let t1 = performance.now()
    let timeToSearch = ((t1 - t0) * 0.001).toFixed(2)
    context.$set('timeToSearch', timeToSearch)
    let data = response.data
    let metadata = data.metadata
    if (metadata) {
      context.$set('data.queryData', metadata)
    } else {
      context.$set('data.queryData', [])
    }
    context.$set('dataReceived', true)
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

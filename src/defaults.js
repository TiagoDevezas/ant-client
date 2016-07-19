const API_URL = 'http://ant.fe.up.pt/api/'
const SEARCH_URL = API_URL + 'search'
const NEWS_RANKINGS_URL = API_URL + 'rankings/news'
const EVENTS_RANKINGS_URL = API_URL + 'rankings/events'
const PHOTO_SERVICE = API_URL + 'status/photo?url='

const IMAGE_PLACEHOLDER = require('src/assets/no_photo.png')

const DEFAULTS = {
  api_url: API_URL,
  search_url: SEARCH_URL,
  news_url: NEWS_RANKINGS_URL,
  events_url: EVENTS_RANKINGS_URL,
  photo_service: PHOTO_SERVICE,
  img_placeholder: IMAGE_PLACEHOLDER
}

export default DEFAULTS

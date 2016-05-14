export function cleanMarkup (value) {
  if (value) {
    let val = value.toString()
    let clean = val.toString().replace(/(?:<br>\s*){2,}/g, '<p></p>')
                              .replace(/<[\/]?strong>/g, '')
                              .replace(/<[\/]?b>/g, '')
    return clean
  }
}

export function highlightQuery (value, query, eType) {
  if (value && query) {
    let val = value.toString()
    let q = query.toString()
    let regex
    if (eType === 'notícia') {
      regex = new RegExp('(\\s?' + q + '\\s?)', 'gim')
    } else {
      regex = new RegExp('(\\s?' + q + '\\s)', 'gim')
    }
    return val.replace(regex, '<span class="highlight">$1</span>')
  }
}

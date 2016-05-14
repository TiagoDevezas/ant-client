export function cleanMarkup (value) {
  if (value) {
    let val = value.toString()
    let clean = val.toString().replace(/(?:<br>\s*){2,}/g, '<p></p>')
                              .replace(/<[\/]?strong>/g, '')
                              .replace(/<[\/]?b>/g, '')
    return clean
  }
}

export function highlightQuery (value, query) {
  if (value && query) {
    let val = value.toString()
    let q = query.toString()
    let regex = new RegExp('(\\b' + q + '\\b)', 'gim')
    return val.replace(regex, '<span class="highlight">$1</span>')
  }
}

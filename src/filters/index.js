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
    const split = query.split(' ')
    let q = ''
    if (split.length === 1) {
      q = split[0]
    } else if (split.length > 1) {
      q = split.join('|')
    }
    const regex = new RegExp('\\b(' + q + ')(?=\\W)', 'gim')
    return value.replace(regex, '<span class="highlight">$1</span>')
  }
}

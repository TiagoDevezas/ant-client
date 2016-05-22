export function cleanMarkup (value) {
  if (value) {
    let val = value.toString()
    let clean = val.toString().replace(/(?:<br>\s*){2,}/g, '<p></p>')
                              .replace(/<[\/]?strong>/g, '')
                              .replace(/<[\/]?b>/g, '')
                              .replace(/\s\s+/g, ' ')
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
    const regex = new RegExp('(?=\\b|\\W)?(' + q + ')(?=\\W|\\b)', 'gi')
    return value.replace(regex, '<span class="highlight">$1</span>')
  }
}

export function truncateText (text, length) {
  let split = text.split(' ').splice(0, length).join(' ')
  return split + ' ...'
}

export function stripTags (text) {
  return text.replace(/<(.|\n)*?>/g, '')
}

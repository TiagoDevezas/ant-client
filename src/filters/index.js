
export function cleanMarkup (value) {
  if (value) {
    let val = value.toString()
    let clean = val.toString().replace(/(?:<br>\s*){2,}/g, '<p></p>')
                              .replace(/<[\/]?strong>/g, '')
                              .replace(/<[\/]?b>/g, '')
                              .replace(/\s\s+/g, ' ')
    return clean
  }
  return value
}

export function highlightQuery (content, query) {
  return content
}

// export function highlightQuery (value, query) {
//   if (value && query) {
//     let queryClean = query.replace('"', '')
//     const split = queryClean.split(' ')
//     if (!split.length) {
//       return value
//     }
//     for (let i in split) {
//       if (stopWordsPT.indexOf(split[i]) !== -1) {
//         split.splice(i, 1)
//       }
//     }
//     let q = ''
//     if (split.length === 1) {
//       q = split[0]
//       q = q.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '')
//     } else if (split.length > 1) {
//       let newSplit = split.map(s => {
//         return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '')
//       })
//       q = newSplit.join('|')
//     }
//     let regex = new RegExp('(?=\\b)(' + q + ')(?=\\W|\\b)', 'gi')
//     return value.replace(regex, '<span class="highlight">$1</span>')
//   }
//   return value
// }

export function truncateText (text, length) {
  if (text) {
    let split = text.split(' ').splice(0, length).join(' ')
    return split + ' ...'
  }
  return text
}

export function stripTags (text) {
  if (text) {
    return text.replace(/<(.|\n)*?>/g, '')
  }
  return text
}

export function isSearchable (value, attrObj, query) {
  if (attrObj.course !== undefined) {
    return '<a href="search?q=' + '%22' + attrObj.course +
           '%22&tipoentidade=' + 'Curso' + '">' +
            highlightQuery(attrObj.course, query) +
           '</a>'
  }
  if (value && attrObj && query) {
    let newVal = stripTags(value)
    let split = attrObj.orig_label === 'course' ? [newVal] : newVal.split(',')
    let links = []
    if (attrObj.searchable) {
      for (let i in split) {
        let urlParam
        if (attrObj.entityType) {
          urlParam = '&tipoentidade=' + attrObj.entityType
        } else {
          urlParam = ''
        }
        links.push('<a href="search?q=' + '%22' + split[i].trim().split('(')[0].trim() + '%22' + urlParam + '">' + highlightQuery(split[i], query) + '</a>')
      }
      return links.join(', ')
    }
    return value
  }
  return value
}

export function iconify (value, origLabel) {
  if (origLabel) {
    let iconName
    if (origLabel === 'alternative_telephone' || origLabel === 'voip' || origLabel === 'telephone') {
      iconName = 'phone'
    } else if (origLabel === 'rooms') {
      iconName = 'business'
    } else if (origLabel === 'institutional_emails' || origLabel === 'email') {
      iconName = 'mail_outline'
    } else if (origLabel === 'fax') {
      iconName = 'local_printshop'
    }
    if (iconName) {
      return '<i class="material-icons" style="font-size: 18px;" title="' + this.$t(origLabel) + '">' + iconName + '</i>'
    }
  }
  // if (origLabel && iconName) {
  //   return '<i class="material-icons" style="font-size: 18px;">' + iconName + '</i>'
  // }
  return value + ':&nbsp;'
}

export function truncateSources (sources) {
  if (sources) {
    let sourcesArr = sources.split(', ')
    if (sourcesArr.length === 1) {
      return sourcesArr
    }
    if (sourcesArr.length > 1) {
      return sourcesArr[0] + ' (mais ' + sourcesArr.slice(1, sourcesArr.length).length + ')'
    }
  }
  return sources
}

export function commaSeparate (value, index, length) {
  if (value && index && length) {
    if (index < length - 1) {
      return value + ', '
    } else {
      return value
    }
  }
  return value
}

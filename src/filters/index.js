let stopWordsPT = ['a', 'acerca', 'adeus', 'agora', 'ainda', 'algmas', 'algo', 'algumas', 'alguns', 'ali', 'além', 'ambos', 'ano', 'anos', 'antes', 'ao', 'aos', 'apenas', 'apoio', 'apontar', 'após', 'aquela', 'aquelas', 'aquele', 'aqueles', 'aqui', 'aquilo', 'as', 'assim', 'através', 'atrás', 'até', 'aí', 'baixo', 'bastante', 'bem', 'bom', 'breve', 'cada', 'caminho', 'catorze', 'cedo', 'cento', 'certamente', 'certeza', 'cima', 'cinco', 'coisa', 'com', 'como', 'comprido', 'conhecido', 'conselho', 'contra', 'corrente', 'custa', 'cá', 'da', 'daquela', 'daquele', 'dar', 'das', 'de', 'debaixo', 'demais', 'dentro', 'depois', 'desde', 'desligado', 'dessa', 'desse', 'desta', 'deste', 'deve', 'devem', 'deverá', 'dez', 'dezanove', 'dezasseis', 'dezassete', 'dezoito', 'dia', 'diante', 'direita', 'diz', 'dizem', 'dizer', 'do', 'dois', 'dos', 'doze', 'duas', 'dá', 'dão', 'dúvida', 'e', 'ela', 'elas', 'ele', 'eles', 'em', 'embora', 'enquanto', 'entre', 'então', 'era', 'essa', 'essas', 'esse', 'esses', 'esta', 'estado', 'estar', 'estará', 'estas', 'estava', 'este', 'estes', 'esteve', 'estive', 'estivemos', 'estiveram', 'estiveste', 'estivestes', 'estou', 'está', 'estás', 'estão', 'eu', 'exemplo', 'falta', 'fará', 'favor', 'faz', 'fazeis', 'fazem', 'fazemos', 'fazer', 'fazes', 'fazia', 'faço', 'fez', 'fim', 'final', 'foi', 'fomos', 'for', 'fora', 'foram', 'forma', 'foste', 'fostes', 'fui', 'geral', 'grande', 'grandes', 'grupo', 'hoje', 'horas', 'há', 'iniciar', 'inicio', 'ir', 'irá', 'isso', 'ista', 'iste', 'isto', 'já', 'lado', 'ligado', 'local', 'logo', 'longe', 'lugar', 'lá', 'maior', 'maioria', 'maiorias', 'mais', 'mal', 'mas', 'me', 'meio', 'menor', 'menos', 'meses', 'mesmo', 'meu', 'meus', 'mil', 'minha', 'minhas', 'momento', 'muito', 'muitos', 'máximo', 'mês', 'na', 'nada', 'naquela', 'naquele', 'nas', 'nem', 'nenhuma', 'nessa', 'nesse', 'nesta', 'neste', 'no', 'noite', 'nome', 'nos', 'nossa', 'nossas', 'nosso', 'nossos', 'nova', 'nove', 'novo', 'novos', 'num', 'numa', 'nunca', 'não', 'nível', 'nós', 'número', 'o', 'obra', 'obrigada', 'obrigado', 'oitava', 'oitavo', 'oito', 'onde', 'ontem', 'onze', 'os', 'ou', 'outra', 'outras', 'outro', 'outros', 'para', 'parece', 'parte', 'partir', 'pegar', 'pela', 'pelas', 'pelo', 'pelos', 'perto', 'pessoas', 'pode', 'podem', 'poder', 'poderá', 'podia', 'ponto', 'pontos', 'por', 'porque', 'porquê', 'posição', 'possivelmente', 'posso', 'possível', 'pouca', 'pouco', 'povo', 'primeira', 'primeiro', 'promeiro', 'próprio', 'próximo', 'puderam', 'pôde', 'põe', 'põem', 'qual', 'qualquer', 'quando', 'quanto', 'quarta', 'quarto', 'quatro', 'que', 'quem', 'quer', 'quero', 'questão', 'quieto', 'quinta', 'quinto', 'quinze', 'quê', 'relação', 'sabe', 'saber', 'se', 'segunda', 'segundo', 'sei', 'seis', 'sem', 'sempre', 'ser', 'seria', 'sete', 'seu', 'seus', 'sexta', 'sexto', 'sim', 'sistema', 'sob', 'sobre', 'sois', 'somente', 'somos', 'sou', 'sua', 'suas', 'são', 'sétima', 'sétimo', 'tal', 'talvez', 'também', 'tanto', 'tarde', 'te', 'tem', 'temos', 'tempo', 'tendes', 'tenho', 'tens', 'tentar', 'tentaram', 'tente', 'tentei', 'ter', 'terceira', 'terceiro', 'teu', 'teus', 'teve', 'tipo', 'tive', 'tivemos', 'tiveram', 'tiveste', 'tivestes', 'toda', 'todas', 'todo', 'todos', 'trabalhar', 'trabalho', 'treze', 'três', 'tu', 'tua', 'tuas', 'tudo', 'tão', 'têm', 'um', 'uma', 'umas', 'uns', 'usa', 'usar', 'vai', 'vais', 'valor', 'veja', 'vem', 'vens', 'ver', 'verdade', 'verdadeiro', 'vez', 'vezes', 'viagem', 'vindo', 'vinte', 'você', 'vocês', 'vos', 'vossa', 'vossas', 'vosso', 'vossos', 'vários', 'vão', 'vêm', 'vós', 'zero', 'à', 'às', 'área', 'é', 'és', 'último']

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

export function highlightQuery (value, query) {
  if (value && query) {
    let queryClean = query.replace('"', '')
    const split = queryClean.split(' ')
    if (!split.length) {
      return value
    }
    for (let i in split) {
      if (stopWordsPT.indexOf(split[i]) !== -1) {
        split.splice(i, 1)
      }
    }
    let q = ''
    if (split.length === 1) {
      q = split[0]
    } else if (split.length > 1) {
      q = split.join('|')
    }
    const regex = new RegExp('(?=\\b)(' + q + ')(?=\\W|\\b)', 'gi')
    return value.replace(regex, '<span class="highlight">$1</span>')
  }
  return value
}

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
  if (value && attrObj && query) {
    let newVal = stripTags(value)
    let split = newVal.split(',')
    let links = []
    if (attrObj.searchable) {
      for (let i in split) {
        links.push('<a href="search?q=' + '%22' + split[i].trim() + '%22' + '">' + highlightQuery(split[i], query) + '</a>')
      }
      return links.join(', ')
    }
    return value
  }
  return value
}

export function iconify (value, iconName) {
  if (value) {
    let iconName
    if (value === 'Telefone Alternativo' || value === 'Voip' || value === 'Telefone') {
      iconName = 'phone'
    } else if (value === 'Salas') {
      iconName = 'business'
    } else if (value === 'E-mails Institucionais' || value === 'E-mail') {
      iconName = 'mail_outline'
    } else if (value === 'Fax') {
      iconName = 'local_printshop'
    }
    if (iconName) {
      return '<i class="material-icons" style="font-size: 18px;">' + iconName + '</i>'
    }
  }
  if (value && iconName) {
    return '<i class="material-icons" style="font-size: 18px;">' + iconName + '</i>'
  }
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

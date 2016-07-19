<template>
  <div id="about-wrapper">
    <h1>Sobre</h1>
    <p>O objetivo do ANT é o de disponibilizar uma plataforma educativa e para Investigação & Desenvolvimento, na área da pesquisa orientada a entidades.</p>
    <p>Atualmente, é utilizado o sistema de informação <a href="http://sigarra.up.pt/" target="_blank">SIGARRA</a> como caso de estudo central. A longo prazo, o objetivo será o de estender o suporte a coleções mais genéricas, tornando o sistema mais modular e universal. A ideia é a de fomentar a execução de experiências académicas nas várias subáreas de investigação, com suporte numa plataforma base que permitirá acelerar novas contribuições, de forma mais focada e sem o esforço inicial de preparação. Permitir-se-á assim não só integrar rapidamente qualquer desenvolvimento adicional aplicado ao nosso caso de estudo em particular, mas também executar experiências científicas e sessões educacionais diretamente suportadas pela nossa plataforma.</p>

    <h1>Colaboração</h1>
    <p>Se pertences à Universidade do Porto e pretendes colaborar no projeto ANT para desenvolver competências na área da recuperação de informação, em particular da pesquisa orientada a entidades, entra em contacto connosco.</p>

    <p>Podes fazê-lo via e-mail, ou pessoalmente no Laboratório de Sistemas de Informação, que fica na sala <a v-link="{name: 'search', query: {q: 'i123', tipoentidade: 'Sala'}}">i123</a> do <a v-link="{name: 'search', query: {q: 'departamento de engenharia informática', tipoentidade: 'Departamento'}}">Departamento de Engenharia Informática</a> — pergunta pelo <a v-link="{name: 'search', query: {q: 'josé devezas', tipoentidade: 'Funcionário'}}">José Devezas</a> ou pelo <a v-link="{name: 'search', query: {q: 'sérgio nunes', tipoentidade: 'Funcionário'}}">Sérgio Nunes</a>.</p>

    <h1>Equipa</h1>
    <dl>
      <dt><a v-link="{name: 'search', query: {q: 'sérgio sobral nunes', tipoentidade: 'Funcionário'}}">Sérgio Nunes</a></dt>
      <dd>Coordenador</dd>
      <dd>
        Departamento de Engenharia Informática,<br>
        Faculdade de Engenharia, Universidade do Porto<br>
        <a href="mailto:ssn@fe.up.pt">ssn@fe.up.pt</a>
      </dd>
    </dl>
    <dl>
      <dt><a v-link="{name: 'search', query: {q: 'josé devezas', tipoentidade: 'Funcionário'}}">José Devezas *</a></dt>
      <dd>Lead Developer</dd>
      <dd>
        Laboratório de Sistemas de Informação,<br>
        Faculdade de Engenharia, Universidade do Porto<br>
        <a href="mailto:jld@fe.up.pt">jld@fe.up.pt</a>
      </dd>
    </dl>

     <p class="smaller">
      * Contacto para envio de sugestões, bugs ou outro feedback.
    </p>

    <dl>
      <dt><a v-link="{name: 'search', query: {q: 'tiago devezas', tipoentidade: 'Estudante'}}">Tiago Devezas</a></dt>
      <dd>Front-End Developer</dd>
      <dd>
        Laboratório de Sistemas de Informação,<br>
        Faculdade de Engenharia, Universidade do Porto<br>
      </dd>
    </dl>

    <dl>
      <dt><a v-link="{name: 'search', query: {q: 'noémia moreira', tipoentidade: 'Estudante'}}">Noémia Moreira</a></dt>
      <dd>UX Analyst</dd>
      <dd>
        <span class="italic">Estudante do Mestrado em Multimédia</span><br>
        Laboratório de Sistemas de Informação,<br>
        Faculdade de Engenharia, Universidade do Porto<br>
      </dd>
    </dl>

    <dl>
      <dt><a v-link="{name: 'search', query: {q: 'ricardo carvalho amorim', tipoentidade: 'Funcionário'}}">Ricardo Amorim</a></dt>
      <dd>Android Developer</dd>
      <dd>
        Laboratório de Sistemas de Informação,<br>
        Faculdade de Engenharia, Universidade do Porto<br>
      </dd>
    </dl>

    <dl>
      <dt><a v-link="{name: 'search', query: {q: 'ana de lurdes rocha reis', tipoentidade: 'Estudante'}}">Ana Rocha Reis</a></dt>
      <dd>Android Designer</dd>
      <dd>
        <span class="italic">Estudante do Mestrado em Multimédia</span><br>
        Laboratório de Sistemas de Informação,<br>
        Faculdade de Engenharia, Universidade do Porto<br>
      </dd>
    </dl>

    <p class="dev-link"><em><a href="http://ant.fe.up.pt/dev">Versão de desenvolvimento</a></em></p>
  </div>
</template>

<script>
  export default {
    ready () {
      document.title = 'Sobre - ANT'
    }
  }
</script>

<style lang="scss">
  #about-wrapper {
    padding-top: 0.5em;
    position: relative;
    padding-left: 94px;
    max-width: 800px;
  }

  #about-wrapper h1 {
    font-size: 20px;
    line-height: 1;
    color: #4C4C4C;
    margin: 40px 0;
    /*text-transform: uppercase;*/
  }

  #about-wrapper address {
    margin-bottom: 20px;
  }

  #about-wrapper dl {
    font-size: 15px;
  }

  #about-wrapper dt {
    font-weight: bold;
    font-size: 16px;
  }

  #about-wrapper dd {
    margin-left: 0px;
    margin-bottom: 15px;
    &:first-of-type {
      margin-bottom: 0;
      font-family: "Lucida Console", monospace;
    }
    > .italic {
      font-style: italic;
    }
  }

  #about-wrapper p {
    font-size: 15px;
    line-height: 1.3;
  }

  #about-wrapper a {
    text-decoration: none;
    &:hover, &:focus, &:active {
      text-decoration: underline;
    }
  }

  .dev-link {
    margin: 40px 0;
  }
  
</style>
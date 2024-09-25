import { Router } from "express";
const rotaLogin = new Router();

rotaLogin
  .get('/', (requisicao, resposta) => {
    resposta.redirect("/login.html");  
  })
  .post('/', (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

    // Correção: Verificar usuário e senha separadamente
    if (usuario === 'Renato' && senha === '123') {
      requisicao.session.usuarioLogado = true;
      resposta.redirect('/pagina_eventos.html');
    } else {
      resposta.send("<p>Falha no login!</p><br/><button onclick='history.back()'>Tentar Novamente!</button>");
    }
  });

export default rotaLogin;

import Ingresso from '../models/Ingresso.js';
import Evento from '../models/Evento.js';

class IngressoController {
  async criarIngresso(req, res) {
    try {
      // Extrair dados do corpo da requisição
      const { tipo, preco, quantidade, eventoId } = req.body;

      // Garantir que o eventoId seja um número
      const eventoIdNum = Number(eventoId);

      // Verificar se o eventoId é válido
      if (!eventoId || isNaN(eventoId)) {
        return res.status(400).json({ erro: 'ID do evento inválido' });
      }

      // Verificar se o evento existe
      const evento = await Evento.findByPk(eventoIdNum);
      if (!evento) {
        return res.status(404).json({ erro: 'Evento não encontrado' });
      }

      // Criar o ingresso
      const ingresso = await Ingresso.create({
        tipo,
        preco,
        quantidade,
        eventoId: eventoIdNum // Certifique-se de que eventoId é um número
      });

      res.status(201).json(ingresso);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao criar ingresso: ' + error.message });
    }
  }

  async listarIngressos(req, res) {
    try {
      const ingressos = await Ingresso.findAll();
      res.json(ingressos);
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao listar ingressos: ' + error.message });
    }
  }

  async atualizarIngresso(req, res) {
    try {
      const { id } = req.params;
      await Ingresso.update(req.body, { where: { id } });
      res.json({ mensagem: 'Ingresso atualizado com sucesso!' });
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao atualizar ingresso: ' + error.message });
    }
  }

  async excluirIngresso(req, res) {
    try {
      const { id } = req.params;
      await Ingresso.destroy({ where: { id } });
      res.json({ mensagem: 'Ingresso excluído com sucesso!' });
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao excluir ingresso: ' + error.message });
    }
  }

  async buscarIngressoPorId(req, res) {
    try {
      const { id } = req.params;
      const ingresso = await Ingresso.findByPk(id);
      if (ingresso) {
        res.json(ingresso);
      } else {
        res.status(404).json({ mensagem: 'Ingresso não encontrado' });
      }
    } catch (error) {
      res.status(400).json({ erro: 'Erro ao buscar ingresso: ' + error.message });
    }
  }
}

export default new IngressoController();

import express from 'express';
import Evento from '../models/Evento.js';

const router = express.Router();

// Listar todos os eventos
router.get('/', async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar eventos' });
  }
});

// Criar um novo evento
router.post('/', async (req, res) => {
  try {
    const evento = await Evento.create(req.body);
    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
});

// Atualizar um evento
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await Evento.update(req.body, { where: { id } });
    if (evento[0] === 0) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.json({ message: 'Evento atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
});

// Excluir um evento
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await Evento.destroy({ where: { id } });
    if (resultado === 0) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }
    res.json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir evento' });
  }
});

export default router;

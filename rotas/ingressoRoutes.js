import express from 'express';
import Ingresso from '../models/Ingresso.js';
import Evento from '../models/Evento.js';

const router = express.Router();

// Listar todos os ingressos para um evento específico
router.get('/:eventoId', async (req, res) => {
    try {
        const { eventoId } = req.params;
        const ingressos = await Ingresso.findAll({ where: { eventoId } });
        if (ingressos.length > 0) {
            res.json(ingressos);
        } else {
            res.status(404).json({ mensagem: 'Nenhum ingresso encontrado para o evento fornecido.' });
        }
    } catch (error) {
        console.error('Erro ao listar ingressos:', error);
        res.status(500).json({ error: 'Erro ao listar ingressos' });
    }
});

// Criar um novo ingresso para um evento específico
router.post('/:eventoId', async (req, res) => {
    try {
        const { eventoId } = req.params;
        // Verifica se o evento existe antes de criar o ingresso
        const evento = await Evento.findByPk(eventoId);
        if (!evento) {
            return res.status(404).json({ mensagem: 'Evento não encontrado.' });
        }

        const ingresso = await Ingresso.create({ ...req.body, eventoId });
        res.status(201).json(ingresso);
    } catch (error) {
        console.error('Erro ao criar ingresso:', error);
        res.status(500).json({ error: 'Erro ao criar ingresso' });
    }
});

export default router;

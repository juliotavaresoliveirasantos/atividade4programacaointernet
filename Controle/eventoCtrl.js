import Evento from '../models/Evento.js'; // Verifique se o caminho está correto
import Ingresso from '../models/Ingresso.js'; // Importar o modelo Ingresso

class EventoController {
    // Criar um novo evento
    async criarEvento(req, res) {
        try {
            console.log('Dados recebidos:', req.body); // Log dos dados recebidos
            const evento = await Evento.create(req.body);
            res.status(201).json(evento);
        } catch (error) {
            console.error('Erro ao criar evento:', error); // Log do erro
            res.status(400).json({ erro: 'Erro ao criar evento: ' + error.message });
        }
    }

    // Listar todos os eventos
    async listarEventos(req, res) {
        try {
            console.log('Buscando eventos...'); // Log para depuração
            const eventos = await Evento.findAll();
            console.log('Eventos encontrados:', eventos); // Log para depuração
            res.json(eventos);
        } catch (error) {
            console.error('Erro ao listar eventos:', error); // Log do erro
            res.status(400).json({ erro: 'Erro ao listar eventos: ' + error.message });
        }
    }

    // Atualizar um evento existente
    async atualizarEvento(req, res) {
        try {
            const { id } = req.params;
            await Evento.update(req.body, { where: { id } });
            res.json({ mensagem: 'Evento atualizado com sucesso!' });
        } catch (error) {
            console.error('Erro ao atualizar evento:', error); // Log do erro
            res.status(400).json({ erro: 'Erro ao atualizar evento: ' + error.message });
        }
    }

    // Excluir um evento
    async excluirEvento(req, res) {
        try {
            const { id } = req.params;
            await Evento.destroy({ where: { id } });
            res.json({ mensagem: 'Evento excluído com sucesso!' });
        } catch (error) {
            console.error('Erro ao excluir evento:', error); // Log do erro
            res.status(400).json({ erro: 'Erro ao excluir evento: ' + error.message });
        }
    }

    // Buscar um evento por ID
    async buscarEventoPorId(req, res) {
        try {
            const { id } = req.params;
            const evento = await Evento.findByPk(id);
            if (evento) {
                res.json(evento);
            } else {
                res.status(404).json({ mensagem: 'Evento não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao buscar evento:', error); // Log do erro
            res.status(400).json({ erro: 'Erro ao buscar evento: ' + error.message });
        }
    }

    // Buscar um evento por ID com ingressos associados
    async buscarEventoComIngressos(req, res) {
        try {
            const { id } = req.params;
            const evento = await Evento.findByPk(id, {
                include: [{
                    model: Ingresso,
                    as: 'ingressos' // Certifique-se de que o alias aqui corresponde ao definido na associação
                }]
            });

            if (evento) {
                res.json(evento);
            } else {
                res.status(404).json({ mensagem: 'Evento não encontrado' });
            }
        } catch (error) {
            console.error('Erro ao buscar evento com ingressos:', error); // Log do erro
            res.status(400).json({ erro: 'Erro ao buscar evento com ingressos: ' + error.message });
        }
    }
}

export default new EventoController();

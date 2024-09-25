import { Router } from 'express';
import EventoController from '../Controle/eventoCtrl.js'; 
const router = Router();

router.post('/', EventoController.criarEvento);
router.get('/', EventoController.listarEventos);
router.get('/:id', EventoController.buscarEventoPorId);
router.put('/:id', EventoController.atualizarEvento);
router.delete('/:id', EventoController.excluirEvento);
router.get('/:id/ingressos', EventoController.buscarEventoComIngressos); 

export default router;

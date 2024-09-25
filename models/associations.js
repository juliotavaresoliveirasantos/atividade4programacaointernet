import Evento from './Evento.js';
import Ingresso from './Ingresso.js';

// Define a associação um-para-muitos entre Evento e Ingresso
Evento.hasMany(Ingresso, { foreignKey: 'eventoId', as: 'ingressos' });
Ingresso.belongsTo(Evento, { foreignKey: 'eventoId', as: 'evento' });

// Você pode importar este arquivo no seu `index.js` para garantir que as associações sejam aplicadas

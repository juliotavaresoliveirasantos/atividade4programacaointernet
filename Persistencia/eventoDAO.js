import Evento from '../models/Evento.js';
import conectar from './conexao.js';

export default class EventoDAO {
    constructor() {
        this.init();
    }

    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS evento (
                    ev_codigo INT NOT NULL AUTO_INCREMENT,
                    ev_nome VARCHAR(100) NOT NULL,
                    ev_descricao TEXT NOT NULL,
                    ev_data DATE NOT NULL,
                    ev_local VARCHAR(255) NOT NULL,
                    ev_preco DECIMAL(10,2) NOT NULL,
                    ev_capacidade INT NOT NULL,
                    PRIMARY KEY (ev_codigo)
                );
            `;
            await conexao.execute(sql);
            conexao.release();
        } catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(evento) {
        try {
            if (evento instanceof Evento) {
                const sql = "INSERT INTO evento (ev_nome, ev_descricao, ev_data, ev_local, ev_preco, ev_capacidade) VALUES (?, ?, ?, ?, ?, ?)";
                const parametros = [evento.nome, evento.descricao, evento.data, evento.local, evento.preco, evento.capacidade];
                const conexao = await conectar();
                const retorno = await conexao.execute(sql, parametros);
                evento.codigo = retorno[0].insertId;
                conexao.release();
            }
        } catch (e) {
            console.log("Erro ao gravar o evento: " + e.message);
        }
    }

    async atualizar(evento) {
        try {
            if (evento instanceof Evento) {
                const sql = "UPDATE evento SET ev_nome = ?, ev_descricao = ?, ev_data = ?, ev_local = ?, ev_preco = ?, ev_capacidade = ? WHERE ev_codigo = ?";
                const parametros = [evento.nome, evento.descricao, evento.data, evento.local, evento.preco, evento.capacidade, evento.codigo];
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                conexao.release();
            }
        } catch (e) {
            console.log("Erro ao atualizar o evento: " + e.message);
        }
    }

    async excluir(evento) {
        try {
            if (evento instanceof Evento) {
                const sql = "DELETE FROM evento WHERE ev_codigo = ?";
                const parametros = [evento.codigo];
                const conexao = await conectar();
                await conexao.execute(sql, parametros);
                conexao.release();
            }
        } catch (e) {
            console.log("Erro ao excluir o evento: " + e.message);
        }
    }

    async consultar(termo) {
        let listaEventos = [];
        try {
            const conexao = await conectar();
            let sql = '';
            let parametros = [];

            if (Number.isInteger(termo)) {
                sql = "SELECT * FROM evento WHERE ev_codigo = ? ORDER BY ev_nome";
                parametros = [termo];
            } else {
                sql = "SELECT * FROM evento WHERE ev_nome LIKE ? ORDER BY ev_nome";
                parametros = ['%' + termo + '%'];
            }

            const [registros] = await conexao.execute(sql, parametros);
            for (const registro of registros) {
                const evento = new Evento(registro.ev_codigo, registro.ev_nome, registro.ev_descricao, registro.ev_data, registro.ev_local, registro.ev_preco, registro.ev_capacidade);
                listaEventos.push(evento);
            }

            conexao.release();
        } catch (e) {
            console.log("Erro ao consultar eventos: " + e.message);
        }
        return listaEventos;
    }
}

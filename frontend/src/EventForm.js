import React, { useState } from "react";
import axios from "axios";

const EventForm = () => {
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [preco, setPreco] = useState("");
  const [capacidade, setCapacidade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEvent = {
        nome,          // Título do evento
        descricao,     // Descrição do evento
        data,          // Data do evento
        local,         // Local do evento
        preco,         // Preço do ingresso
        capacidade     // Capacidade do evento
      };

      await axios.post("http://localhost:4000/eventos/", newEvent);
      alert("Evento cadastrado com sucesso!");

      // Limpar os campos do formulário após o envio
      setNome("");
      setData("");
      setDescricao("");
      setLocal("");
      setPreco("");
      setCapacidade("");
    } catch (error) {
      console.error("Erro ao cadastrar o evento:", error);
      alert("Erro ao cadastrar o evento.");
    }
  };

  return (
    <div className="event-form">
      <h2>Cadastrar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Evento:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Local do Evento:</label>
          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Preço do Ingresso:</label>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Capacidade do Evento:</label>
          <input
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar Evento</button>
      </form>
    </div>
  );
};

export default EventForm;

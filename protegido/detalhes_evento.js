// detalhes_evento.js

document.addEventListener('DOMContentLoaded', function() {
    const quantidadeInput = document.getElementById('quantidade');
    const totalDisplay = document.getElementById('total');

    const precoPorIngresso = 50.00;

    function atualizarTotal() {
        const quantidade = parseInt(quantidadeInput.value);
        const total = precoPorIngresso * quantidade;
        totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
    }

    quantidadeInput.addEventListener('input', atualizarTotal);

    atualizarTotal();
});

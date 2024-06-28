document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector('.game-board');
    const message = document.getElementById('message');
    const restartButton = document.getElementById('restartButton');
    let treasureIndex;
    const gridSize = 25; // Define o tamanho da grade (5x5)
    
    // Função para inicializar o jogo
    function initializeGame() {
        gameBoard.innerHTML = ''; // Limpa o tabuleiro
        treasureIndex = Math.floor(Math.random() * gridSize); // Gera a posição do tesouro aleatoriamente
        message.textContent = ''; // Limpa a mensagem
        createBoard(); // Cria o tabuleiro
    }
    
    // Função para criar o tabuleiro
    function createBoard() {
        for (let i = 0; i < gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
    
    // Função para lidar com o clique nas células
    function handleCellClick(event) {
        const cell = event.target; // Obtém o elemento que foi clicado
        const cellIndex = parseInt(cell.dataset.index); // Converte o índice da célula (armazenado no atributo data-index) para um número inteiro
        
        // Verifica se a célula já foi clicada
        if (cell.classList.contains('clicked')) return; // Se a célula já tem a classe 'clicked', a função retorna imediatamente e não faz mais nada
        
        // Marca a célula como clicada adicionando a classe 'clicked'
        cell.classList.add('clicked');
        
        // Verifica se o índice da célula clicada é igual ao índice do tesouro
        if (cellIndex === treasureIndex) {
            message.textContent = 'Parabéns! Você encontrou o tesouro!'; // Atualiza a mensagem de feedback
            message.style.color = 'green'; // Define a cor da mensagem para verde
            revealTreasure(); // Chama a função para revelar o tesouro
        } else {
            message.textContent = 'Continue procurando...'; // Atualiza a mensagem de feedback
            message.style.color = 'blue'; // Define a cor da mensagem para azul
        }
    }
    
    
    // Função para revelar a posição do tesouro
    function revealTreasure() {
        const cells = document.querySelectorAll('.cell');  // Seleciona todas as células do tabuleiro que têm a classe cell e as armazena na variável cells como uma NodeList. Uma NodeList é uma coleção de nós do documento que podem ser manipulados como um array.
        cells[treasureIndex].textContent = '💰'; // Define o conteúdo de texto (textContent) dessa célula para '💰', que é o símbolo de um baú de tesouro. Isso visualmente indica ao jogador que o tesouro foi encontrado nessa célula.
        cells.forEach(cell => cell.removeEventListener('click', handleCellClick)); // Remove os eventos de clique das células
    }
    
    // Evento para reiniciar o jogo
    restartButton.addEventListener('click', initializeGame);
    
    // Inicializa o jogo pela primeira vez
    initializeGame();
});
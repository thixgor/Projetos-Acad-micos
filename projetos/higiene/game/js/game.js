// ===== VARIÁVEIS GLOBAIS =====
let currentHero = null;
let powerLevel = 25;
let completedMissions = [];
let currentMission = null;
let gameTimer = null;
let timerDuration = 0;
let timerInterval = null;
let gameStartTime = null;
let totalGameTime = 0;
let quizCorrectAnswers = 0;
let quizTotalQuestions = 0;

// Variáveis para os jogos específicos
let bubblesPopped = 0;
let totalBubbles = 0;
let bubbleSpeed = 2000; // Velocidade base em milissegundos
let bubbleInterval = null;

// Fatos sobre higiene para exibir após cada missão
const hygieneFacts = [
    "Lavar as mãos com água e sabão por pelo menos 20 segundos elimina germes e bactérias!",
    "Espirrar no cotovelo ajuda a evitar a propagação de doenças respiratórias!",
    "Escovar os dentes pelo menos duas vezes ao dia previne cáries e doenças gengivais!",
    "Manter as unhas curtas e limpas impede o acúmulo de bactérias!",
    "Tomar banho diariamente remove sujeira, suor e bactérias da pele!",
    "Não compartilhar objetos pessoais como pentes e escovas de dente evita a transmissão de germes!",
    "Usar lenços descartáveis ao tossir ou espirrar é uma forma de prevenir infecções!",
    "Beber água filtrada ou tratada evita doenças transmitidas pela água contaminada!",
    "Lavar bem as frutas e vegetais antes de comer remove sujeira e pesticidas!",
    "Trocar a escova de dente a cada três meses mantém a higiene bucal!"
];

// Dicas para quando falhar nas missões
const failureTips = {
    bathroom: "Os germes adoram mãos sujas! Lembre-se da ordem correta de lavar as mãos.",
    classroom: "Espirrar no cotovelo ajuda a não espalhar doenças para seus colegas!",
    cafeteria: "Sempre lave as mãos antes de comer e guarde os alimentos corretamente!",
    playground: "Fique atento aos germes! Eles podem estar em qualquer lugar."
};

// Definições de missões para cada local
const missions = {
    bathroom: {
        title: "Escovação Poderosa",
        type: "toothbrush-game",
        description: "Use a escova de dente mágica para limpar todos os dentes antes que o tempo acabe!",
        powerGain: 25,
        difficulty: 1,
        timeLimit: 30,
        targetScore: 15
    },
    classroom: {
        title: "Quiz da Higiene",
        type: "quiz-game",
        description: "Responda corretamente às perguntas sobre higiene na escola!",
        powerGain: 25,
        difficulty: 2,
        timeLimit: 120,
        targetScore: 10
    },
    cafeteria: {
        title: "Limpeza no Refeitório",
        type: "catch-items",
        description: "Use a lixeira para coletar itens de higiene e desvie dos germes!",
        powerGain: 25,
        difficulty: 2,
        timeLimit: 45,
        targetScore: 10
    },
    playground: {
        title: "Germes no Pátio",
        type: "bubble-pop",
        description: "Os germes estão se espalhando pelo pátio! Clique neles para eliminá-los!",
        powerGain: 25,
        difficulty: 3,
        timeLimit: 30,
        targetBubbles: 15
    }
};

// Adicionar as questões do quiz
const quizQuestions = [
    {
        question: "Quando devemos lavar as mãos na escola?",
        options: [
            "Só quando estiverem sujas",
            "Antes de comer e depois de usar o banheiro",
            "Apenas depois do recreio",
            "Uma vez por dia"
        ],
        correct: 1
    },
    {
        question: "Qual é a maneira correta de espirrar ou tossir?",
        options: [
            "Na mão",
            "No ar",
            "No cotovelo",
            "No ombro"
        ],
        correct: 2
    },
    {
        question: "Por que é importante manter a carteira escolar limpa?",
        options: [
            "Só para ficar bonita",
            "Para evitar germes e doenças",
            "Não é importante",
            "Para agradar o professor"
        ],
        correct: 1
    },
    {
        question: "O que fazer com o lixo na escola?",
        options: [
            "Deixar na carteira",
            "Jogar no chão",
            "Guardar no bolso",
            "Colocar na lixeira"
        ],
        correct: 3
    },
    {
        question: "Como manter o banheiro da escola limpo?",
        options: [
            "Dar descarga e lavar as mãos",
            "Não precisa fazer nada",
            "Só dar descarga",
            "Só lavar as mãos"
        ],
        correct: 0
    },
    {
        question: "O que fazer com o material escolar para mantê-lo higienizado?",
        options: [
            "Não precisa limpar",
            "Limpar só no fim do ano",
            "Limpar regularmente com álcool",
            "Emprestar para todos"
        ],
        correct: 2
    },
    {
        question: "Por que não devemos compartilhar garrafas de água?",
        options: [
            "Para não misturar os sabores",
            "Para evitar transmissão de doenças",
            "Porque é feio",
            "Porque gasta mais água"
        ],
        correct: 1
    },
    {
        question: "Qual a importância de manter as unhas curtas e limpas na escola?",
        options: [
            "Para ficar mais bonito",
            "Para evitar acumular germes e bactérias",
            "Não tem importância",
            "Para escrever melhor"
        ],
        correct: 1
    },
    {
        question: "Como devemos cuidar do nosso uniforme escolar?",
        options: [
            "Lavar apenas nas férias",
            "Usar o mesmo uniforme a semana toda",
            "Lavar regularmente e manter limpo",
            "Só limpar quando sujar muito"
        ],
        correct: 2
    },
    {
        question: "O que fazer se encontrar papel no chão da sala?",
        options: [
            "Deixar lá, não é meu",
            "Chutar para debaixo da carteira",
            "Jogar na lixeira, mesmo não sendo meu",
            "Avisar o professor e não fazer nada"
        ],
        correct: 2
    },
    {
        question: "Por que é importante manter os pés limpos e com meias limpas?",
        options: [
            "Não é importante",
            "Para evitar mau cheiro e fungos",
            "Só para não sujar o sapato",
            "Para correr mais rápido"
        ],
        correct: 1
    },
    {
        question: "Como devemos cuidar dos livros da biblioteca?",
        options: [
            "Limpar as mãos antes de usar e não rasgar",
            "Não precisa ter cuidado especial",
            "Só não pode molhar",
            "Pode comer enquanto lê"
        ],
        correct: 0
    },
    {
        question: "Por quanto tempo devemos escovar os dentes?",
        options: [
            "10 segundos é suficiente",
            "Pelo menos 2 minutos",
            "5 segundos em cada dente",
            "Apenas uma vez rápida"
        ],
        correct: 1
    },
    {
        question: "Qual é o melhor momento para trocar a escova de dentes?",
        options: [
            "Quando mudar a cor da escova",
            "Quando as cerdas estiverem desgastadas",
            "A cada 3 meses aproximadamente",
            "Apenas quando perder a escova"
        ],
        correct: 2
    },
    {
        question: "O que devemos fazer antes de manipular alimentos?",
        options: [
            "Apenas limpar a mesa",
            "Lavar as mãos com água e sabão",
            "Colocar luvas sem lavar as mãos",
            "Não precisamos fazer nada especial"
        ],
        correct: 1
    },
    {
        question: "Como devemos lavar as frutas e verduras antes de comer?",
        options: [
            "Apenas passar um pano",
            "Lavar com água corrente",
            "Deixar de molho em água com hipoclorito ou vinagre",
            "Não é preciso lavar se parecer limpo"
        ],
        correct: 2
    },
    {
        question: "Por que devemos usar máscara quando estamos doentes?",
        options: [
            "Para esconder o rosto",
            "Para proteger os outros de germes",
            "Apenas quando o professor mandar",
            "Não precisamos usar máscara"
        ],
        correct: 1
    },
    {
        question: "O que devemos fazer com o lixo reciclável na escola?",
        options: [
            "Jogar em qualquer lixeira",
            "Levar para casa",
            "Separar nas lixeiras de reciclagem corretas",
            "Esconder na mochila"
        ],
        correct: 2
    },
    {
        question: "Como ajudar a manter a cantina da escola limpa?",
        options: [
            "Jogar restos de comida no chão",
            "Limpar a mesa depois de usar e jogar o lixo na lixeira",
            "Deixar para os funcionários limparem",
            "Comer apenas em sala de aula"
        ],
        correct: 1
    },
    {
        question: "Por que devemos trocar de roupa depois de suar muito?",
        options: [
            "Apenas para ficar bonito",
            "Para evitar mau cheiro e problemas de pele",
            "Não precisamos trocar",
            "Só trocamos quando alguém mandar"
        ],
        correct: 1
    },
    {
        question: "Qual a maneira correta de lavar as mãos?",
        options: [
            "Apenas molhar as mãos com água",
            "Passar sabão rapidamente",
            "Esfregar entre os dedos, palmas e costas das mãos por 20 segundos",
            "Lavar só as pontas dos dedos"
        ],
        correct: 2
    },
    {
        question: "O que devemos evitar tocar sem lavar as mãos depois?",
        options: [
            "Em nossos brinquedos",
            "Em nossos olhos, boca e nariz",
            "Em nossos cadernos",
            "Em nossos amigos"
        ],
        correct: 1
    },
    {
        question: "Por que é importante beber água filtrada ou tratada?",
        options: [
            "Para ficar com a voz bonita",
            "Para evitar doenças transmitidas pela água contaminada",
            "Não importa se a água é filtrada",
            "Apenas para matar a sede mais rápido"
        ],
        correct: 1
    },
    {
        question: "O que devemos fazer quando usamos o bebedouro da escola?",
        options: [
            "Encostar a boca diretamente no bebedouro",
            "Deixar a água cair diretamente na boca sem encostar",
            "Beber água apenas em casa",
            "Molhar os colegas por diversão"
        ],
        correct: 1
    },
    {
        question: "Qual dessas atitudes é importante para manter a sala de aula limpa?",
        options: [
            "Guardar o lixo na mochila até chegar em casa",
            "Deixar papéis amassados dentro da carteira",
            "Varrer a sala apenas no final do dia",
            "Jogar o lixo na lixeira e organizar as carteiras"
        ],
        correct: 3
    },
    {
        question: "Como devemos cuidar do banheiro da escola?",
        options: [
            "Usar muitos papéis para secar as mãos",
            "Usar a quantidade necessária de papel e dar descarga",
            "Deixar a torneira aberta enquanto escovamos os dentes",
            "Jogar papel no chão quando a lixeira estiver cheia"
        ],
        correct: 1
    },
    {
        question: "O que devemos fazer com a comida que sobrou do lanche?",
        options: [
            "Jogar no chão para os pássaros comerem",
            "Guardar adequadamente ou jogar no lixo correto",
            "Esconder embaixo da carteira",
            "Deixar em qualquer lugar para alguém limpar"
        ],
        correct: 1
    },
    {
        question: "Por que devemos manter a mochila e os materiais escolares limpos?",
        options: [
            "Apenas para não sujar as tarefas",
            "Para evitar o acúmulo de germes e poeira que podem causar doenças",
            "Para agradar os professores",
            "Não é necessário limpar materiais escolares"
        ],
        correct: 1
    },
    {
        question: "Qual o momento correto para lavar as mãos na escola?",
        options: [
            "Somente na hora do lanche",
            "Antes e depois do lanche, após usar o banheiro e após brincar no recreio",
            "Apenas quando o professor mandar",
            "Apenas no final do dia antes de ir embora"
        ],
        correct: 1
    },
    {
        question: "Como podemos evitar a transmissão de piolhos na escola?",
        options: [
            "Não existe forma de prevenir piolhos",
            "Não compartilhar pentes, bonés e outros acessórios de cabeça",
            "Cortando o cabelo bem curto",
            "Lavando o cabelo uma vez por semana"
        ],
        correct: 1
    },
    {
        question: "O que fazer se um colega está doente na escola?",
        options: [
            "Ficar longe dele o tempo todo",
            "Não compartilhar objetos e lavar as mãos frequentemente",
            "Dizer para ele ir embora",
            "Brincar normalmente, pois crianças não ficam doentes"
        ],
        correct: 1
    },
    {
        question: "Por que é importante lavar as mãos antes de mexer nos alimentos?",
        options: [
            "Para deixar as mãos cheirosas",
            "Para evitar levar germes e bactérias aos alimentos",
            "Só precisamos lavar se estivermos com as mãos sujas",
            "Não precisamos lavar se formos comer com talheres"
        ],
        correct: 1
    },
    {
        question: "Como devemos manter nossos cadernos e livros higienizados?",
        options: [
            "Passar álcool gel nas páginas",
            "Molhar as páginas com água e sabão",
            "Manter as mãos limpas ao usá-los e guardar em local limpo",
            "Não precisamos higienizar livros e cadernos"
        ],
        correct: 2
    },
    {
        question: "O que fazer quando espirrar ou tossir na escola?",
        options: [
            "Usar um lenço de papel ou o cotovelo e depois lavar as mãos",
            "Espirrar livremente, pois é natural",
            "Cobrir o rosto com as mãos",
            "Virar para o lado do colega"
        ],
        correct: 0
    },
    {
        question: "Quando devemos lavar os brinquedos que usamos na escola?",
        options: [
            "Nunca, pois brinquedos não precisam ser lavados",
            "Regularmente, especialmente se várias crianças usam",
            "Apenas quando caem no chão",
            "Só quando parecem sujos"
        ],
        correct: 1
    },
    {
        question: "Qual a forma correta de usar o vaso sanitário na escola?",
        options: [
            "Sentar diretamente na tampa",
            "Ficar de pé sobre o vaso",
            "Usar papel para cobrir o assento ou agachar sem encostar",
            "Não usar o banheiro da escola"
        ],
        correct: 2
    },
    {
        question: "Por que não devemos colocar objetos na boca?",
        options: [
            "Porque alguém pode precisar deles",
            "Porque podem ter germes e nos deixar doentes",
            "Porque objetos são duros para os dentes",
            "Porque os objetos vão ficar molhados"
        ],
        correct: 1
    },
    {
        question: "Como devemos limpar as mesas da sala de aula?",
        options: [
            "Não precisamos limpar, só a servente limpa",
            "Passar água",
            "Usar um pano limpo com produto adequado",
            "Jogar o material no chão e limpar a mesa com a manga da camisa"
        ],
        correct: 2
    }
];

// ===== INICIALIZAÇÃO DO JOGO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    
    // Ajustar dificuldade para dispositivos móveis
    adjustDifficultyForDevice();
    
    // Adicionar evento para tela cheia em dispositivos móveis
    if (isMobileDevice()) {
        const fullscreenButton = document.createElement('button');
        fullscreenButton.className = 'fullscreen-button';
        fullscreenButton.innerHTML = '<span>📱</span>';
        fullscreenButton.title = 'Tela Cheia';
        
        fullscreenButton.addEventListener('click', function() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log(`Erro ao tentar entrar em tela cheia: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        });
        
        document.body.appendChild(fullscreenButton);
        
        // Adicionar estilo para o botão de tela cheia
        const style = document.createElement('style');
        style.textContent = `
            .fullscreen-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, 0.5);
                color: white;
                border: none;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                font-size: 24px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
                transition: all 0.3s;
            }
            
            .fullscreen-button:hover {
                background-color: rgba(0, 0, 0, 0.7);
                transform: scale(1.1);
            }
            
            .fullscreen-button span {
                display: inline-block;
                transform: rotate(0deg);
                transition: transform 0.3s;
            }
            
            .fullscreen-button:active span {
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(style);
    }
});

function initializeGame() {
    // Configurar tela inicial
    document.getElementById('start-button').addEventListener('click', function() {
        showScreen('character-select');
    });
    
    // Mostrar/esconder créditos
    document.querySelector('.toggle-credits').addEventListener('click', function() {
        const creditsDetails = document.querySelector('.credits-details');
        if (creditsDetails.style.display === 'block') {
            creditsDetails.style.display = 'none';
            this.textContent = 'Ver Equipe +';
        } else {
            creditsDetails.style.display = 'block';
            this.textContent = 'Esconder Equipe -';
        }
    });
    
    // Configurar seleção de herói
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach(card => {
        card.addEventListener('click', function() {
            selectHero(this.getAttribute('data-hero'));
            showScreen('game-hub');
        });
    });
    
    // Configurar locais no mapa
    const locationMarkers = document.querySelectorAll('.location-marker');
    locationMarkers.forEach(marker => {
        marker.addEventListener('click', function() {
            const locationId = this.getAttribute('data-location');
            if (completedMissions.includes(locationId)) {
                alert('Missão já completada! Escolha outra área para proteger.');
                return;
            }
            startMission(locationId);
        });
    });
    
    // Botão para voltar ao hub
    document.getElementById('exit-game').addEventListener('click', function() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        if (bubbleInterval) {
            clearInterval(bubbleInterval);
            bubbleInterval = null;
        }

        // Limpar evento de mousemove do jogo
        if (window.gameMouseMove) {
            document.removeEventListener('mousemove', window.gameMouseMove);
            window.gameMouseMove = null;
        }

        // Limpar eventos de clique em cards
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            card.removeEventListener('click', window.flipCard);
        });
        
        showScreen('game-hub');
    });
    
    // Botão de ação no jogo
    document.getElementById('game-action').addEventListener('click', function() {
        const gameAction = this.getAttribute('data-action');
        if (gameAction === 'start') {
            startGameplay();
        } else if (gameAction === 'verify') {
            verifyGameResult();
        }
    });
    
    // Botão de continuar na tela de resultado
    document.getElementById('continue-button').addEventListener('click', function() {
        if (completedMissions.length === Object.keys(missions).length) {
            // Se todas as missões foram completadas, mostrar a tela final
            
            // Calcular o tempo total
            const endTime = new Date();
            totalGameTime = Math.floor((endTime - gameStartTime) / 1000); // tempo em segundos
            
            // Atualizar informações na tela de vitória
            document.getElementById('hero-level').textContent = getHeroRank();
            
            // Mostrar estatísticas de tempo e acertos do quiz
            const statsContainer = document.getElementById('game-stats-container');
            if (statsContainer) {
                const minutes = Math.floor(totalGameTime / 60);
                const seconds = totalGameTime % 60;
                
                statsContainer.innerHTML = `
                    <div class="game-stat-item">
                        <span class="stat-label">Tempo Total:</span>
                        <span class="stat-value">${minutes}m ${seconds}s</span>
                    </div>
                    <div class="game-stat-item">
                        <span class="stat-label">Acertos no Quiz:</span>
                        <span class="stat-value">${quizCorrectAnswers}/${quizTotalQuestions}</span>
                    </div>
                `;
            }
            
            showScreen('game-victory');
        } else {
            showScreen('game-hub');
        }
    });
    
    // Botão de tentar novamente
    document.getElementById('retry-button').addEventListener('click', function() {
        startMission(currentMission);
    });
    
    // Botão de jogar novamente na tela final
    document.getElementById('play-again').addEventListener('click', function() {
        resetGame();
        showScreen('splash-screen');
    });
}

// ===== FUNÇÕES DE CONTROLE DO JOGO =====

// Função para mostrar uma tela específica
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');

    // Restaurar botão de ação quando voltar ao hub
    const gameActionButton = document.getElementById('game-action');
    if (screenId === 'game-hub') {
        gameActionButton.style.display = 'none';
    } else if (screenId === 'game-arena') {
        gameActionButton.style.display = 'block';
        gameActionButton.textContent = 'INICIAR MISSÃO';
        gameActionButton.setAttribute('data-action', 'start');
    }
}

// Função para selecionar um herói
function selectHero(heroType) {
    currentHero = heroType;
    
    // Atualizar avatar e nome
    const playerAvatar = document.getElementById('player-avatar');
    playerAvatar.className = heroType; // Adiciona a classe boy ou girl para aplicar a imagem via CSS
    
    // Definir o nome e poder
    document.getElementById('player-name').textContent = heroType === 'boy' ? 'CAPITÃO LIMPEZA' : 'DOUTORA HIGIENE';
    updatePowerLevel();
    
    // Atualizar elementos de missão
    updateMissionElements();
}

// Atualizar elementos visuais das missões
function updateMissionElements() {
    // Verificar quais missões foram completadas
    document.querySelectorAll('.location-marker').forEach(marker => {
        const locationId = marker.getAttribute('data-location');
        const alert = marker.querySelector('.location-alert');
        
        if (completedMissions.includes(locationId)) {
            // Missão completa - remover alerta
            if (alert) {
                alert.style.display = 'none';
            }
            marker.classList.add('completed');
        } else {
            // Missão pendente - mostrar alerta
            if (alert) {
                alert.style.display = 'flex';
            }
            marker.classList.remove('completed');
        }
    });
    
    // Atualizar tela de vitória final para mostrar o personagem escolhido
    const heroVictory = document.querySelector('.hero-victory');
    if (heroVictory) {
        heroVictory.className = `hero-victory ${currentHero || 'boy'}`;
    }
}

// Função para atualizar o nível de poder
function updatePowerLevel() {
    const powerLevelElement = document.getElementById('power-level');
    powerLevelElement.style.width = `${powerLevel}%`;
    
    // Verificar se todas as missões foram completadas
    if (completedMissions.length === Object.keys(missions).length) {
        document.getElementById('hero-level').textContent = getHeroRank();
    }
}

// Função para obter o rank do herói
function getHeroRank() {
    if (powerLevel >= 100) {
        return 'LENDÁRIO';
    } else if (powerLevel >= 75) {
        return 'MESTRE';
    } else if (powerLevel >= 50) {
        return 'VETERANO';
    } else {
        return 'INICIANTE';
    }
}

// Iniciar uma missão
function startMission(locationId) {
    // Se a missão já foi completada, avisar o jogador
    if (completedMissions.includes(locationId)) {
        alert('Missão já completada! Escolha outra área para proteger.');
        return;
    }
    
    currentMission = locationId;
    const mission = missions[locationId];
    
    // Configurar cabeçalho da missão
    document.getElementById('game-title').textContent = mission.title;
    
    // Preparar o conteúdo do jogo
    const gameContent = document.getElementById('game-content');
    gameContent.innerHTML = `
        <div class="mission-intro">
            <div class="mission-location-img ${locationId}"></div>
            <h2>${mission.title}</h2>
            <p>${mission.description}</p>
            <div class="difficulty">
                <span>Dificuldade:</span>
                <div class="difficulty-stars">
                    ${getDifficultyStars(mission.difficulty)}
                </div>
            </div>
        </div>
    `;
    
    // Adicionar estilos específicos para as imagens dos locais
    const style = document.createElement('style');
    style.textContent = `
        .mission-location-img {
            width: 300px;
            height: 200px;
            border-radius: 15px;
            margin-bottom: 20px;
            background-size: cover;
            background-position: center;
            box-shadow: var(--shadow-medium);
            border: 3px solid white;
        }
        .mission-location-img.bathroom {
            background-image: url('https://i.imgur.com/6tDsISD.jpeg');
        }
        .mission-location-img.classroom {
            background-image: url('https://i.imgur.com/uFcyUGb.jpeg');
        }
        .mission-location-img.cafeteria {
            background-image: url('https://i.imgur.com/zRFJZjH.jpeg');
        }
        .mission-location-img.playground {
            background-image: url('https://i.imgur.com/HOrZybl.jpeg');
        }
        @media (max-width: 768px) {
            .mission-location-img {
                width: 250px;
                height: 160px;
            }
        }
        @media (max-width: 480px) {
            .mission-location-img {
                width: 200px;
                height: 130px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Configurar botão de ação
    const gameActionButton = document.getElementById('game-action');
    gameActionButton.textContent = 'INICIAR MISSÃO';
    gameActionButton.setAttribute('data-action', 'start');
    
    // Mostrar tela de jogo
    showScreen('game-arena');
    
    // Definir a duração do timer
    timerDuration = mission.timeLimit;
}

// Iniciar a jogabilidade específica da missão
function startGameplay() {
    const mission = missions[currentMission];
    const gameContent = document.getElementById('game-content');
    
    // Configurar o botão de ação
    const gameActionButton = document.getElementById('game-action');
    gameActionButton.style.display = 'none';
    
    // Registrar o início do jogo se for a primeira missão
    if (gameStartTime === null) {
        gameStartTime = new Date();
    }
    
    // Inicializar o tipo específico de jogo
    switch (mission.type) {
        case 'bubble-pop':
            initBubblePopGame();
            break;
        case 'quiz-game':
            initQuizGame();
            break;
        case 'catch-items':
            initCatchItemsGame();
            break;
        case 'toothbrush-game':
            initToothbrushGame();
            break;
    }
    
    // Iniciar o timer
    startTimer();
}

// Função para obter as estrelas de dificuldade
function getDifficultyStars(difficulty) {
    let stars = '';
    for (let i = 0; i < difficulty; i++) {
        stars += '<span class="star active">★</span>';
    }
    for (let i = difficulty; i < 3; i++) {
        stars += '<span class="star">★</span>';
    }
    return stars;
}

// Iniciar o timer
function startTimer() {
    const timerBar = document.querySelector('.timer-progress');
    let timeLeft = timerDuration;
    
    // Configurar a barra de timer
    timerBar.style.width = '100%';
    
    // Limpar intervalo anterior se existir
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Iniciar novo intervalo
    timerInterval = setInterval(function() {
        timeLeft--;
        
        // Atualizar barra de progresso
        const progressPercent = (timeLeft / timerDuration) * 100;
        timerBar.style.width = `${progressPercent}%`;
        
        // Se o tempo acabar
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            missionFailed();
        }
    }, 1000);
}

// Missão completada com sucesso
function missionCompleted() {
    // Limpar todos os intervalos
    clearInterval(timerInterval);
    timerInterval = null;
    
    if (bubbleInterval) {
        clearInterval(bubbleInterval);
        bubbleInterval = null;
    }
    
    // Limpar evento de mousemove do jogo
    if (window.gameMouseMove) {
        document.removeEventListener('mousemove', window.gameMouseMove);
        window.gameMouseMove = null;
    }

    // Limpar eventos de clique em cards
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.removeEventListener('click', window.flipCard);
    });
    
    // Adicionar pontos de poder
    const missionPowerGain = missions[currentMission].powerGain;
    powerLevel += missionPowerGain;
    if (powerLevel > 100) powerLevel = 100;
    
    // Atualizar nível de poder
    updatePowerLevel();
    
    // Marcar missão como completada
    if (!completedMissions.includes(currentMission)) {
        completedMissions.push(currentMission);
    }
    
    // Remover alerta no mapa
    const locationMarker = document.querySelector(`.location-marker[data-location="${currentMission}"]`);
    const alertElement = locationMarker.querySelector('.location-alert');
    if (alertElement) {
        alertElement.style.display = 'none';
    }
    
    // Configurar tela de sucesso
    document.getElementById('power-gained').textContent = missionPowerGain;
    
    // Mostrar um fato aleatório sobre higiene
    const factIndex = Math.floor(Math.random() * hygieneFacts.length);
    document.getElementById('hygiene-fact').textContent = hygieneFacts[factIndex];
    
    // Restaurar botão de ação
    const gameActionButton = document.getElementById('game-action');
    gameActionButton.style.display = 'block';
    
    // Mostrar tela de sucesso
    showScreen('mission-complete');
}

// Missão falhou
function missionFailed() {
    // Limpar todos os intervalos
    clearInterval(timerInterval);
    timerInterval = null;
    
    if (bubbleInterval) {
        clearInterval(bubbleInterval);
        bubbleInterval = null;
    }
    
    // Limpar evento de mousemove do jogo
    if (window.gameMouseMove) {
        document.removeEventListener('mousemove', window.gameMouseMove);
        window.gameMouseMove = null;
    }

    // Limpar eventos de clique em cards
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
        card.removeEventListener('click', window.flipCard);
    });
    
    // Configurar dica para a missão específica
    document.getElementById('failure-tip').textContent = failureTips[currentMission];
    
    // Restaurar botão de ação
    const gameActionButton = document.getElementById('game-action');
    gameActionButton.style.display = 'block';
    
    // Mostrar tela de falha
    showScreen('mission-failed');
}

// Reiniciar o jogo
function resetGame() {
    currentHero = null;
    powerLevel = 25;
    completedMissions = [];
    currentMission = null;
    gameStartTime = null;
    totalGameTime = 0;
    quizCorrectAnswers = 0;
    quizTotalQuestions = 0;
    
    // Reiniciar visuais do mapa
    const alertElements = document.querySelectorAll('.location-alert');
    alertElements.forEach(alert => {
        alert.style.display = 'flex';
    });
}

// ===== IMPLEMENTAÇÃO DOS MINIJOGOS =====

// Função para detectar se o dispositivo é móvel
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 768 
           || ('ontouchstart' in window) 
           || (navigator.maxTouchPoints > 0);
}

// Ajustar dificuldade com base no dispositivo
function adjustDifficultyForDevice() {
    const isMobile = isMobileDevice();
    
    // Ajustar missões para mobile
    if (isMobile) {
        // Reduzir a velocidade no jogo de bubble pop
        bubbleSpeed = 2500;
        
        // Aumentar o tempo limite para todos os jogos em 30%
        for (const location in missions) {
            missions[location].timeLimit = Math.ceil(missions[location].timeLimit * 1.3);
        }
    }
}

// Inicializar o jogo de bolhas
function initBubblePopGame() {
    const mission = missions[currentMission];
    const gameContent = document.getElementById('game-content');
    const isMobile = isMobileDevice();
    
    console.log("Inicializando jogo de bolhas. Mobile: ", isMobile);
    
    bubblesPopped = 0;
    totalBubbles = 0;
    
    // Limpar eventos anteriores
    if (bubbleInterval) {
        clearInterval(bubbleInterval);
        bubbleInterval = null;
    }
    
    gameContent.innerHTML = `
        <div class="bubble-game">
            <div class="score-counter">Germes Eliminados: <span>${bubblesPopped}</span>/${mission.targetBubbles}</div>
            <div class="game-instructions">
                <p>${isMobile ? 'Toque nas bolhas' : 'Clique nas bolhas'} para destruir os germes!</p>
            </div>
            <div class="bubble-container"></div>
        </div>
    `;
    
    // Estilo para o jogo de bolhas
    const style = document.createElement('style');
    style.id = 'bubble-game-style';
    style.innerHTML = `
        .bubble-game {
            width: 100%;
            height: 100%;
            position: relative;
            overflow: hidden;
            touch-action: none;
            min-height: 350px;
            display: flex;
            flex-direction: column;
        }
        
        .score-counter {
            position: relative;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 10px 15px;
            border-radius: 20px;
            font-weight: bold;
            z-index: 100;
            font-size: ${isMobile ? '1.3em' : '1.1em'};
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 10px;
            text-align: center;
        }
        
        .game-instructions {
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 15px;
            padding: 10px;
            margin-bottom: 10px;
            text-align: center;
            font-weight: bold;
        }
        
        .bubble-container {
            flex-grow: 1;
            width: 100%;
            min-height: 250px;
            position: relative;
            background-color: rgba(240, 248, 255, 0.7);
            border-radius: 10px;
            overflow: hidden;
            touch-action: none;
        }
    `;
    
    // Remover estilos antigos se existirem
    const oldStyle = document.getElementById('bubble-game-style');
    if (oldStyle) oldStyle.remove();
    
    document.head.appendChild(style);
    
    const container = document.querySelector('.bubble-container');
    
    // Eventos para contêiner que podem impedir interações
    container.addEventListener('touchmove', function(e) {
        e.preventDefault(); // Impedir scroll durante o jogo
    }, { passive: false });
    
    // Função para criar uma nova bolha
    function createBubble() {
        if (totalBubbles < mission.targetBubbles * 3) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            
            const size = isMobile ? 
                        Math.floor(60 + Math.random() * 30) : // Maior para mobile
                        Math.floor(40 + Math.random() * 20);  // Tamanho normal
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            // Posicionar aleatoriamente dentro do container
            const maxX = container.clientWidth - size;
            const maxY = container.clientHeight - size;
            
            const posX = Math.max(0, Math.floor(Math.random() * maxX));
            const posY = Math.max(0, Math.floor(Math.random() * maxY));
            
            bubble.style.left = `${posX}px`;
            bubble.style.top = `${posY}px`;
            
            // Variação na animação
            const animDuration = 5 + Math.random() * 3;
            bubble.style.animationDuration = `${animDuration}s`;
            
            // Adicionar estilos específicos para a bolha
            bubble.style.position = 'absolute';
            bubble.style.borderRadius = '50%';
            bubble.style.backgroundColor = '#f44336';
            bubble.style.display = 'flex';
            bubble.style.justifyContent = 'center';
            bubble.style.alignItems = 'center';
            bubble.style.cursor = 'pointer';
            bubble.style.overflow = 'hidden';
            bubble.style.border = '3px solid white';
            bubble.style.boxShadow = '0 3px 6px rgba(0, 0, 0, 0.3)';
            bubble.style.transition = 'transform 0.2s, opacity 0.2s';
            bubble.style.animation = `bubbleFloat ${animDuration}s infinite alternate ease-in-out`;
            bubble.style.userSelect = 'none';
            bubble.style.touchAction = 'none';
            bubble.style.zIndex = '10';
            
            // Adicionar highlight interno
            const highlight = document.createElement('div');
            highlight.style.position = 'absolute';
            highlight.style.top = '15%';
            highlight.style.left = '15%';
            highlight.style.width = '30%';
            highlight.style.height = '30%';
            highlight.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
            highlight.style.borderRadius = '50%';
            bubble.appendChild(highlight);
            
            // Função para estourar a bolha
            function popBubble(e) {
                // Evitar comportamento padrão
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                // Verificar se a bolha já foi clicada
                if (!bubble.classList.contains('clicked')) {
                    // Marca como clicada
                    bubble.classList.add('clicked');
                    bubble.style.transform = 'scale(0)';
                    bubble.style.opacity = '0';
                    
                    // Atualiza a pontuação
                    bubblesPopped++;
                    const counter = document.querySelector('.score-counter span');
                    if (counter) counter.textContent = bubblesPopped;
                    
                    // Adiciona efeito visual de explosão
                    const popEffect = document.createElement('div');
                    popEffect.style.position = 'absolute';
                    popEffect.style.width = `${size}px`;
                    popEffect.style.height = `${size}px`;
                    popEffect.style.left = bubble.style.left;
                    popEffect.style.top = bubble.style.top;
                    popEffect.style.borderRadius = '50%';
                    popEffect.style.backgroundColor = 'transparent';
                    popEffect.style.border = '3px solid #f44336';
                    popEffect.style.zIndex = '5';
                    popEffect.style.animation = 'popAnim 0.5s ease-out forwards';
                    
                    // Definir animação via keyframes no documento
                    if (!document.getElementById('pop-animation')) {
                        const popAnim = document.createElement('style');
                        popAnim.id = 'pop-animation';
                        popAnim.innerHTML = `
                            @keyframes popAnim {
                                0% { transform: scale(0.5); opacity: 1; }
                                100% { transform: scale(2); opacity: 0; }
                            }
                            
                            @keyframes bubbleFloat {
                                0% { transform: translate(0, 0) rotate(0deg); }
                                33% { transform: translate(10px, 10px) rotate(5deg); }
                                66% { transform: translate(-5px, 15px) rotate(-5deg); }
                                100% { transform: translate(5px, 5px) rotate(3deg); }
                            }
                        `;
                        document.head.appendChild(popAnim);
                    }
                    
                    container.appendChild(popEffect);
                    
                    // Remove o efeito após a animação
                    setTimeout(() => {
                        if (popEffect.parentNode) popEffect.remove();
                    }, 500);
                    
                    // Verificar conclusão da missão
                    if (bubblesPopped >= mission.targetBubbles) {
                        clearInterval(bubbleInterval);
                        bubbleInterval = null;
                        setTimeout(() => missionCompleted(), 300);
                    }
                    
                    // Remove a bolha após a animação
                    setTimeout(() => {
                        if (bubble.parentNode) bubble.remove();
                    }, 300);
                }
                
                return false;
            }
            
            // Adicionar eventos para desktop e mobile
            bubble.addEventListener('mousedown', popBubble);
            bubble.addEventListener('touchstart', popBubble, { passive: false });
            bubble.addEventListener('touchend', e => {
                if (e) e.preventDefault();
                return false;
            }, { passive: false });
            
            // Melhorar acessibilidade
            bubble.setAttribute('role', 'button');
            bubble.setAttribute('tabindex', '0');
            bubble.setAttribute('aria-label', 'Estourar bolha');
            
            container.appendChild(bubble);
            totalBubbles++;
        }
    }
    
    // Criar algumas bolhas iniciais
    for (let i = 0; i < (isMobile ? 3 : 5); i++) {
        setTimeout(() => createBubble(), i * 400);
    }
    
    // Continuar criando bolhas em intervalos - mais lento em mobile
    bubbleInterval = setInterval(createBubble, isMobile ? 2000 : 1500);
}

function initToothbrushGame() {
    const mission = missions[currentMission];
    const gameContent = document.getElementById('game-content');
    
    gameContent.innerHTML = `
        <div class="toothbrush-game">
            <div class="game-stats">
                <div class="score-counter">Dentes Limpos: <span>0</span>/${mission.targetScore}</div>
            </div>
            <div class="game-instructions">
                <p>${isMobileDevice() ? 'Toque e arraste' : 'Mova a escova com o mouse'} para limpar todos os dentes!</p>
            </div>
            <div class="mouth-arena">
                <img src="https://i.imgur.com/X0uiJ6Y.png" class="toothbrush" id="toothbrush">
                <div class="teeth-container"></div>
            </div>
        </div>
    `;

    let score = 0;
    const toothbrush = document.getElementById('toothbrush');
    const teethContainer = document.querySelector('.teeth-container');
    const mouthArena = document.querySelector('.mouth-arena');
    const isMobile = isMobileDevice();
    
    // Posicionar a escova inicialmente no centro
    const arenaRect = mouthArena.getBoundingClientRect();
    toothbrush.style.left = `${arenaRect.width / 2 - toothbrush.offsetWidth / 2}px`;
    toothbrush.style.top = `${arenaRect.height / 2 - toothbrush.offsetHeight / 2}px`;
    
    // Criar dentes (15 dentes para corresponder ao targetScore)
    for (let i = 0; i < mission.targetScore; i++) {
        const tooth = document.createElement('div');
        tooth.className = 'tooth dirty';
        tooth.style.setProperty('--random-dirt', Math.random());
        
        // Pequenas variações nas formas dos dentes para mais realismo
        const randomWidth = 95 + Math.random() * 10;
        const randomHeight = 95 + Math.random() * 10;
        const randomRotate = -5 + Math.random() * 10;
        
        tooth.style.width = `${randomWidth}%`;
        tooth.style.height = `${randomHeight}%`;
        tooth.style.transform = `rotate(${randomRotate}deg)`;
        
        teethContainer.appendChild(tooth);
    }

    // Limpar todos os eventos de movimento antigos
    if (window.gameMouseMove) {
        document.removeEventListener('mousemove', window.gameMouseMove);
        window.gameMouseMove = null;
    }
    
    if (window.gameTouchMove) {
        document.removeEventListener('touchmove', window.gameTouchMove);
        document.removeEventListener('touchstart', window.gameTouchMove);
        window.gameTouchMove = null;
    }

    // Função para verificar a colisão com dentes
    function checkToothCollision(x, y) {
        const brushRect = toothbrush.getBoundingClientRect();
        
        document.querySelectorAll('.tooth.dirty').forEach(tooth => {
            const toothRect = tooth.getBoundingClientRect();
            
            if (brushRect.right >= toothRect.left && 
                brushRect.left <= toothRect.right && 
                brushRect.bottom >= toothRect.top && 
                brushRect.top <= toothRect.bottom) {
                
                tooth.classList.remove('dirty');
                tooth.classList.add('clean');
                score++;
                
                // Atualizar contador
                const counter = document.querySelector('.score-counter span');
                if (counter) counter.textContent = score;
                
                // Efeito visual de limpeza
                const rect = mouthArena.getBoundingClientRect();
                const sparkle = document.createElement('div');
                sparkle.className = 'sparkle';
                sparkle.style.left = `${toothRect.left - rect.left + toothRect.width/2}px`;
                sparkle.style.top = `${toothRect.top - rect.top + toothRect.height/2}px`;
                mouthArena.appendChild(sparkle);
                setTimeout(() => {
                    if (sparkle.parentNode) sparkle.remove();
                }, 500);
                
                // Verificar conclusão da missão
                if (score >= mission.targetScore) {
                    // Limpar eventos ao completar a missão
                    cleanupEvents();
                    missionCompleted();
                }
            }
        });
    }
    
    // Função para limpar eventos
    function cleanupEvents() {
        if (window.gameMouseMove) {
            document.removeEventListener('mousemove', window.gameMouseMove);
            window.gameMouseMove = null;
        }
        
        if (window.gameTouchMove) {
            document.removeEventListener('touchmove', window.gameTouchMove);
            document.removeEventListener('touchstart', window.gameTouchMove);
            window.gameTouchMove = null;
        }
        
        document.querySelectorAll('.tooth').forEach(tooth => {
            tooth.removeEventListener('mouseover', window.toothMouseOver);
        });
    }

    // Cria manipulador para mouse
    window.gameMouseMove = (e) => {
        if (!toothbrush || !mouthArena) return;
        
        const rect = mouthArena.getBoundingClientRect();
        let x = e.clientX - rect.left - toothbrush.offsetWidth / 2;
        let y = e.clientY - rect.top - toothbrush.offsetHeight / 2;
        
        // Limitar dentro da arena
        x = Math.max(0, Math.min(x, rect.width - toothbrush.offsetWidth));
        y = Math.max(0, Math.min(y, rect.height - toothbrush.offsetHeight));
        
        toothbrush.style.left = `${x}px`;
        toothbrush.style.top = `${y}px`;
        
        checkToothCollision(x, y);
    };

    // Cria manipulador para toque
    window.gameTouchMove = (e) => {
        if (!toothbrush || !mouthArena) return;
        
        e.preventDefault();
        if (e.touches && e.touches.length > 0) {
            const rect = mouthArena.getBoundingClientRect();
            const touch = e.touches[0];
            
            let x = touch.clientX - rect.left - toothbrush.offsetWidth / 2;
            let y = touch.clientY - rect.top - toothbrush.offsetHeight / 2;
            
            // Limitar dentro da arena
            x = Math.max(0, Math.min(x, rect.width - toothbrush.offsetWidth));
            y = Math.max(0, Math.min(y, rect.height - toothbrush.offsetHeight));
            
            toothbrush.style.left = `${x}px`;
            toothbrush.style.top = `${y}px`;
            
            checkToothCollision(x, y);
        }
    };
    
    // Manipulador para verificação de mouseover nos dentes
    window.toothMouseOver = function() {
        if (this.classList.contains('dirty')) {
            this.classList.remove('dirty');
            this.classList.add('clean');
            score++;
            
            // Atualizar contador
            const counter = document.querySelector('.score-counter span');
            if (counter) counter.textContent = score;
            
            // Efeito visual
            const rect = mouthArena.getBoundingClientRect();
            const toothRect = this.getBoundingClientRect();
            
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${toothRect.left - rect.left + toothRect.width/2}px`;
            sparkle.style.top = `${toothRect.top - rect.top + toothRect.height/2}px`;
            mouthArena.appendChild(sparkle);
            setTimeout(() => {
                if (sparkle.parentNode) sparkle.remove();
            }, 500);
            
            // Verificar conclusão
            if (score >= mission.targetScore) {
                cleanupEvents();
                missionCompleted();
            }
        }
    };

    // Adicionar eventos conforme o dispositivo
    if (!isMobile) {
        document.addEventListener('mousemove', window.gameMouseMove);
        
        // Adicionar evento de hover nos dentes para desktop
        document.querySelectorAll('.tooth').forEach(tooth => {
            tooth.addEventListener('mouseover', window.toothMouseOver);
        });
    } else {
        // Em dispositivos móveis, apenas os eventos de toque
        document.addEventListener('touchmove', window.gameTouchMove, { passive: false });
        document.addEventListener('touchstart', window.gameTouchMove, { passive: false });
    }

    // Garantir que os eventos sejam limpos quando a missão acabar
    const originalMissionCompleted = window.missionCompleted || missionCompleted;
    window.missionCompleted = function() {
        cleanupEvents();
        if (typeof originalMissionCompleted === 'function') {
            originalMissionCompleted();
        }
    };

    const originalMissionFailed = window.missionFailed || missionFailed;
    window.missionFailed = function() {
        cleanupEvents();
        if (typeof originalMissionFailed === 'function') {
            originalMissionFailed();
        }
    };

    // Adicionar estilos específicos
    addToothbrushGameStyle();
}

function addToothbrushGameStyle() {
    if (!document.getElementById('toothbrush-game-style')) {
        const style = document.createElement('style');
        style.id = 'toothbrush-game-style';
        style.textContent = `
            .toothbrush-game {
                width: 100%;
                height: 100%;
                position: relative;
                display: flex;
                flex-direction: column;
                touch-action: none;
            }
            
            .game-stats {
                background-color: rgba(255, 255, 255, 0.9);
                padding: 10px 15px;
                border-radius: 15px;
                margin-bottom: 10px;
                text-align: center;
                font-size: 1.2em;
                font-weight: bold;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .game-instructions {
                background-color: rgba(255, 255, 255, 0.9);
                padding: 10px 15px;
                border-radius: 15px;
                margin-bottom: 10px;
                text-align: center;
                font-weight: bold;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .mouth-arena {
                flex-grow: 1;
                position: relative;
                background-color: #ffebee;
                border-radius: 15px;
                overflow: hidden;
                min-height: 300px;
                touch-action: none;
                user-select: none;
            }
            
            .toothbrush {
                position: absolute;
                width: 60px;
                height: 60px;
                transform: rotate(45deg);
                z-index: 10;
                cursor: move;
                user-select: none;
                touch-action: none;
                filter: drop-shadow(0 3px 5px rgba(0,0,0,0.2));
                will-change: transform, left, top;
            }
            
            .teeth-container {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: repeat(3, 1fr);
                gap: 10px;
                padding: 20px;
                width: 90%;
                height: 100%;
                margin: 0 auto;
            }
            
            .tooth {
                position: relative;
                background-color: white;
                border-radius: 6px;
                box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
                transition: all 0.3s ease;
            }
            
            .tooth::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: inherit;
                box-shadow: 0 3px 5px rgba(0,0,0,0.1);
                pointer-events: none;
            }
            
            .tooth.dirty::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(139, 69, 19, 0.4);
                background-image: radial-gradient(
                    circle at calc(40% + var(--random-dirt) * 30%) calc(30% + var(--random-dirt) * 40%), 
                    rgba(139, 69, 19, 0.8), 
                    rgba(139, 69, 19, 0.4)
                );
                border-radius: inherit;
                z-index: 2;
            }
            
            .tooth.clean {
                background-color: white;
                animation: clean 0.5s ease;
            }
            
            @keyframes clean {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .sparkle {
                position: absolute;
                width: 20px;
                height: 20px;
                pointer-events: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="%2300d6ff" opacity="0.9"><circle cx="20" cy="20" r="2"/><path d="M20,0 L20,40 M0,20 L40,20 M5,5 L35,35 M5,35 L35,5" stroke="%2300d6ff" stroke-width="2"/></g></svg>');
                background-size: cover;
                animation: sparkleEffect 0.5s ease-out;
                z-index: 20;
            }
            
            @keyframes sparkleEffect {
                0% { transform: scale(0.5); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
            
            @media (max-width: 768px) {
                .teeth-container {
                    grid-template-columns: repeat(4, 1fr);
                    grid-template-rows: repeat(4, 1fr);
                }
                
                .toothbrush {
                    width: 50px;
                    height: 50px;
                }
                
                .game-stats, .game-instructions {
                    padding: 8px 10px;
                    font-size: 1em;
                }
            }
            
            @media (max-width: 480px) {
                .teeth-container {
                    gap: 5px;
                    padding: 10px;
                }
                
                .toothbrush {
                    width: 40px;
                    height: 40px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initCatchItemsGame() {
    const mission = missions[currentMission];
    const gameContent = document.getElementById('game-content');
    const isMobile = isMobileDevice();
    
    gameContent.innerHTML = `
        <div class="catch-game">
            <div class="game-stats">
                <div class="catch-counter">Itens Coletados: <span>0</span>/${mission.targetScore}</div>
            </div>
            <div class="game-instructions">
                <p>${isMobile ? 'Arraste a lixeira' : 'Use o mouse'} para coletar os itens!</p>
                <div class="instruction-items">
                    <div class="instruction-item">
                        <img src="https://i.imgur.com/8omcfRr.png" class="instruction-icon">
                        <span>Colete o lixo (+1)</span>
                    </div>
                    <div class="instruction-item">
                        <img src="https://i.imgur.com/IgCzNYb.png" class="instruction-icon">
                        <span>Evite o sabonete (-1)</span>
                    </div>
                </div>
            </div>
            <div class="catch-arena">
                <img src="https://i.imgur.com/5kForJn.png" class="player" alt="Lixeira">
            </div>
        </div>
    `;

    // Ajustar estilos para melhor experiência em celulares
    addCatchGameStyle();
    
    const player = document.querySelector('.player');
    const catchArena = document.querySelector('.catch-arena');
    let score = 0;
    let playerX = 50;
    let isMoving = false;

    // Posicionar o jogador inicialmente no centro
    player.style.left = `${playerX}%`;
    
    // Limpar eventos anteriores
    if (window.handleMouseMove) {
        document.removeEventListener('mousemove', window.handleMouseMove);
        window.handleMouseMove = null;
    }
    
    if (window.handleTouchMove) {
        document.removeEventListener('touchmove', window.handleTouchMove);
        document.removeEventListener('touchstart', window.handleTouchMove);
        window.handleTouchMove = null;
    }

    // Função para atualizar a posição do jogador
    function updatePlayerPosition(clientX) {
        if (!catchArena || !player) return;
        
        const rect = catchArena.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        
        // Limitar dentro da arena (5% a 95%)
        playerX = Math.max(5, Math.min(x, 95));
        player.style.left = `${playerX}%`;
    }

    // Função para iniciar o movimento
    function startMoving(clientX) {
        isMoving = true;
        updatePlayerPosition(clientX);
    }

    // Função para parar o movimento
    function stopMoving() {
        isMoving = false;
    }

    // Manipuladores de eventos para mouse
    window.handleMouseMove = function(e) {
        e.preventDefault();
        updatePlayerPosition(e.clientX);
    };
    
    window.handleMouseDown = function(e) {
        e.preventDefault();
        startMoving(e.clientX);
    };
    
    window.handleMouseUp = function(e) {
        e.preventDefault();
        stopMoving();
    };

    // Manipuladores de eventos para touch
    window.handleTouchMove = function(e) {
        e.preventDefault();
        if (e.touches && e.touches.length > 0) {
            updatePlayerPosition(e.touches[0].clientX);
        }
    };
    
    window.handleTouchStart = function(e) {
        e.preventDefault();
        if (e.touches && e.touches.length > 0) {
            startMoving(e.touches[0].clientX);
        }
    };
    
    window.handleTouchEnd = function(e) {
        e.preventDefault();
        stopMoving();
    };

    // Adicionar evento conforme o dispositivo
    if (!isMobile) {
        // Eventos para desktop
        document.addEventListener('mousemove', window.handleMouseMove);
        catchArena.addEventListener('mousedown', window.handleMouseDown);
        document.addEventListener('mouseup', window.handleMouseUp);
    } else {
        // Eventos para dispositivos móveis
        document.addEventListener('touchmove', window.handleTouchMove, { passive: false });
        catchArena.addEventListener('touchstart', window.handleTouchStart, { passive: false });
        document.addEventListener('touchend', window.handleTouchEnd, { passive: false });
    }

    // Limpar eventos quando a missão terminar
    function cleanupEvents() {
        if (window.handleMouseMove) {
            document.removeEventListener('mousemove', window.handleMouseMove);
            catchArena.removeEventListener('mousedown', window.handleMouseDown);
            document.removeEventListener('mouseup', window.handleMouseUp);
            window.handleMouseMove = null;
        }
        
        if (window.handleTouchMove) {
            document.removeEventListener('touchmove', window.handleTouchMove);
            catchArena.removeEventListener('touchstart', window.handleTouchStart);
            document.removeEventListener('touchend', window.handleTouchEnd);
            window.handleTouchMove = null;
        }
        
        clearInterval(itemInterval);
    }

    // Função para criar um item
    function createItem() {
        if (!catchArena) return;
        
        const item = document.createElement('img');
        const isGood = Math.random() > 0.3;
        item.src = isGood ? 'https://i.imgur.com/8omcfRr.png' : 'https://i.imgur.com/IgCzNYb.png';
        item.className = isGood ? 'falling-item good' : 'falling-item bad';
        
        // Variar a posição horizontal para evitar frustração em mobile
        const randomPosition = isMobile ?
            10 + Math.random() * 80 : // Evitar os cantos em celulares
            5 + Math.random() * 90;     // Posição normal
            
        item.style.left = `${randomPosition}%`;
        catchArena.appendChild(item);

        // Velocidade mais lenta para mobile
        const fallSpeed = isMobile ? 
                        Math.random() * 0.3 + 0.3 : // Mais lento para mobile
                        Math.random() * 0.5 + 0.5;  // Velocidade normal
                        
        let posY = 0;

        function fall() {
            if (!item.parentNode) return;
            
            posY += fallSpeed;
            item.style.top = `${posY}%`;

            if (posY < 100) {
                const playerRect = player.getBoundingClientRect();
                const itemRect = item.getBoundingClientRect();

                if (itemRect.bottom >= playerRect.top &&
                    itemRect.right >= playerRect.left &&
                    itemRect.left <= playerRect.right) {
                    
                    if (item.classList.contains('good')) {
                        score++;
                        const counter = document.querySelector('.catch-counter span');
                        if (counter) counter.textContent = score;
                        
                        // Adicionar efeito visual de pontuação
                        const scoreEffect = document.createElement('div');
                        scoreEffect.className = 'score-effect';
                        scoreEffect.textContent = '+1';
                        scoreEffect.style.left = `${playerX}%`;
                        catchArena.appendChild(scoreEffect);
                        setTimeout(() => {
                            if (scoreEffect.parentNode) scoreEffect.remove();
                        }, 1000);

                        if (score >= mission.targetScore) {
                            cleanupEvents();
                            missionCompleted();
                            return;
                        }
                    } else {
                        score = Math.max(0, score - 1);
                        const counter = document.querySelector('.catch-counter span');
                        if (counter) counter.textContent = score;
                        
                        // Efeito visual de perda de ponto
                        const scoreEffect = document.createElement('div');
                        scoreEffect.className = 'score-effect negative';
                        scoreEffect.textContent = '-1';
                        scoreEffect.style.left = `${playerX}%`;
                        catchArena.appendChild(scoreEffect);
                        setTimeout(() => {
                            if (scoreEffect.parentNode) scoreEffect.remove();
                        }, 1000);
                    }
                    
                    item.remove();
                    return;
                }

                requestAnimationFrame(fall);
            } else {
                if (item.parentNode) item.remove();
            }
        }

        requestAnimationFrame(fall);
    }

    // Criar itens em intervalos
    const itemInterval = setInterval(createItem, isMobile ? 2000 : 1500);
    
    // Sobrescrever as funções de missão completada/falha para limpar eventos
    const originalMissionCompleted = window.missionCompleted || missionCompleted;
    window.missionCompleted = function() {
        cleanupEvents();
        if (typeof originalMissionCompleted === 'function') {
            originalMissionCompleted();
        }
    };

    const originalMissionFailed = window.missionFailed || missionFailed;
    window.missionFailed = function() {
        cleanupEvents();
        if (typeof originalMissionFailed === 'function') {
            originalMissionFailed();
        }
    };
}

// Inicializar o jogo de perguntas
function initQuizGame() {
    const mission = missions[currentMission];
    const gameContent = document.getElementById('game-content');
    const isMobile = isMobileDevice();
    
    // Embaralhar as questões
    const shuffledQuestions = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, mission.targetScore);
    quizTotalQuestions = mission.targetScore;
    let currentQuestion = 0;
    let score = 0;
    
    // Adicionar timer para o quiz
    let timeLeft = mission.timeLimit;
    let quizTimer;
    
    function showQuestion() {
        const question = shuffledQuestions[currentQuestion];
        gameContent.innerHTML = `
            <div class="quiz-game">
                <div class="game-stats">
                    <div class="quiz-counter">Questão ${currentQuestion + 1}/${mission.targetScore}</div>
                    <div class="quiz-score">Pontos: ${score}/${mission.targetScore}</div>
                    <div class="quiz-timer">Tempo: <span>${formatTime(timeLeft)}</span></div>
                </div>
                <div class="quiz-container">
                    <h3 class="quiz-question">${question.question}</h3>
                    <div class="quiz-options">
                        ${question.options.map((option, index) => `
                            <button class="quiz-option" data-index="${index}">${option}</button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar eventos aos botões com suporte aprimorado para touch
        document.querySelectorAll('.quiz-option').forEach(button => {
            const handleSelection = function(e) {
                e.preventDefault();
                if (button.disabled) return; // Evitar cliques múltiplos
                
                const selectedIndex = parseInt(this.getAttribute('data-index'));
                if (selectedIndex === question.correct) {
                    this.classList.add('correct');
                    score++;
                    quizCorrectAnswers++; // Incrementar contador global de respostas corretas
                    
                    // Efeito visual de resposta correta
                    showFeedback(true);
                } else {
                    this.classList.add('wrong');
                    document.querySelector(`.quiz-option[data-index="${question.correct}"]`).classList.add('correct');
                    
                    // Efeito visual de resposta incorreta
                    showFeedback(false);
                }
                
                // Desabilitar todos os botões
                document.querySelectorAll('.quiz-option').forEach(btn => {
                    btn.disabled = true;
                });
                
                // Próxima questão após 1.5 segundos
                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < mission.targetScore) {
                        showQuestion();
                    } else {
                        clearInterval(quizTimer);
                        if (score >= Math.ceil(mission.targetScore * 0.6)) { // 60% para passar
                            missionCompleted();
                        } else {
                            missionFailed();
                        }
                    }
                }, 1500);
            };
            
            // Adicionar eventos para mouse e touch
            button.addEventListener('click', handleSelection);
            button.addEventListener('touchstart', handleSelection, {passive: false});
        });
    }
    
    function showFeedback(isCorrect) {
        const feedbackElement = document.createElement('div');
        feedbackElement.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        feedbackElement.innerHTML = isCorrect ? 
            '<i class="feedback-icon">✓</i><span>Correto!</span>' : 
            '<i class="feedback-icon">✗</i><span>Incorreto!</span>';
        
        document.querySelector('.quiz-container').appendChild(feedbackElement);
        
        // Remover o feedback após a animação
        setTimeout(() => {
            if (feedbackElement.parentNode) {
                feedbackElement.parentNode.removeChild(feedbackElement);
            }
        }, 1400);
    }
    
    function updateTimer() {
        timeLeft--;
        const timerElement = document.querySelector('.quiz-timer span');
        if (timerElement) {
            timerElement.textContent = formatTime(timeLeft);
        }
        
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            missionFailed();
        }
    }
    
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Adicionar estilos específicos para o quiz
    const quizStyles = document.createElement('style');
    quizStyles.innerHTML = `
        .quiz-game {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px;
        }
        
        .quiz-container {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: var(--shadow-medium);
        }
        
        .quiz-question {
            font-size: 1.2rem;
            text-align: center;
            margin-bottom: 20px;
            color: var(--color-primary);
        }
        
        .quiz-options {
            display: grid;
            gap: 10px;
            width: 100%;
            max-width: 500px;
        }
        
        .quiz-option {
            padding: 15px;
            border: 2px solid var(--color-primary);
            border-radius: 10px;
            background: none;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s;
        }
        
        .quiz-option:hover {
            background-color: var(--color-primary);
            color: white;
        }
        
        .quiz-option.correct {
            background-color: #4caf50;
            color: white;
            border-color: #4caf50;
        }
        
        .quiz-option.wrong {
            background-color: #f44336;
            color: white;
            border-color: #f44336;
        }
        
        .quiz-option:disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }
    `;
    document.head.appendChild(quizStyles);
    
    // Iniciar o timer
    quizTimer = setInterval(updateTimer, 1000);
    
    // Mostrar a primeira questão
    showQuestion();
}

// Adicionar estilo para o jogo de quiz
function addQuizGameStyle() {
    if (!document.getElementById('quiz-game-style')) {
        const style = document.createElement('style');
        style.id = 'quiz-game-style';
        style.innerHTML = `
            .quiz-game {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                padding: 20px;
            }
            
            .quiz-container {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: white;
                border-radius: 15px;
                padding: 20px;
                box-shadow: var(--shadow-medium);
            }
            
            .quiz-question {
                font-size: 1.2rem;
                text-align: center;
                margin-bottom: 20px;
                color: var(--color-primary);
            }
            
            .quiz-options {
                display: grid;
                gap: 10px;
                width: 100%;
                max-width: 500px;
            }
            
            .quiz-option {
                padding: 15px;
                border: 2px solid var(--color-primary);
                border-radius: 10px;
                background: none;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s;
            }
            
            .quiz-option:hover {
                background-color: var(--color-primary);
                color: white;
            }
            
            .quiz-option.correct {
                background-color: #4caf50;
                color: white;
                border-color: #4caf50;
            }
            
            .quiz-option.wrong {
                background-color: #f44336;
                color: white;
                border-color: #f44336;
            }
            
            .quiz-option:disabled {
                cursor: not-allowed;
                opacity: 0.7;
            }
        `;
        document.head.appendChild(style);
    }
}

// Adicionar estilos para o jogo de coleta (Catch Items)
function addCatchGameStyle() {
    if (!document.getElementById('catch-game-style')) {
        const style = document.createElement('style');
        style.id = 'catch-game-style';
        style.innerHTML = `
            .catch-game {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                padding: 10px;
                box-sizing: border-box;
                position: relative;
                z-index: 1;
                touch-action: none;
            }
            
            .game-stats {
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 10px;
                padding: 12px;
                margin-bottom: 10px;
                text-align: center;
                font-size: 1.2em;
                font-weight: bold;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .game-instructions {
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 10px;
                padding: 12px;
                margin-bottom: 10px;
                text-align: center;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            
            .game-instructions p {
                margin: 0 0 10px 0;
                font-size: 1.1em;
                font-weight: bold;
                color: #333;
            }
            
            .instruction-items {
                display: flex;
                justify-content: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .instruction-item {
                display: flex;
                align-items: center;
                gap: 8px;
                background-color: #fff;
                padding: 8px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .instruction-icon {
                width: 25px;
                height: 25px;
                object-fit: contain;
            }
            
            .instruction-item span {
                font-size: 0.9em;
                color: #444;
            }
            
            .catch-arena {
                flex-grow: 1;
                position: relative;
                background-color: #e3f2fd;
                border-radius: 15px;
                overflow: hidden;
                min-height: 300px;
                touch-action: none;
                user-select: none;
            }
            
            .player {
                position: absolute;
                bottom: 20px;
                width: 60px;
                height: 60px;
                transform: translateX(-50%);
                z-index: 2;
                will-change: left;
            }
            
            .falling-item {
                position: absolute;
                width: 40px;
                height: 40px;
                object-fit: contain;
                z-index: 1;
                will-change: top;
            }
            
            .score-effect {
                position: absolute;
                bottom: 70px;
                transform: translateX(-50%);
                color: #4CAF50;
                font-weight: bold;
                font-size: 1.2em;
                animation: floatUp 1s ease-out;
                pointer-events: none;
                z-index: 3;
            }
            
            .score-effect.negative {
                color: #F44336;
            }
            
            @keyframes floatUp {
                0% { transform: translateX(-50%) translateY(0); opacity: 1; }
                100% { transform: translateX(-50%) translateY(-30px); opacity: 0; }
            }
            
            /* Garantir que o cabeçalho fique visível */
            #game-header {
                position: relative;
                z-index: 10;
            }

            /* Estilos responsivos para dispositivos móveis */
            @media (max-width: 768px) {
                .catch-game {
                    padding: 8px;
                }

                .game-stats {
                    padding: 10px;
                    font-size: 1.1em;
                }

                .game-instructions {
                    padding: 10px;
                }

                .game-instructions p {
                    font-size: 1em;
                }

                .instruction-items {
                    gap: 10px;
                }

                .instruction-item {
                    padding: 6px;
                }

                .instruction-icon {
                    width: 20px;
                    height: 20px;
                }

                .instruction-item span {
                    font-size: 0.8em;
                }

                .player {
                    width: 50px;
                    height: 50px;
                }

                .falling-item {
                    width: 30px;
                    height: 30px;
                }
            }

            @media (max-width: 480px) {
                .catch-game {
                    padding: 5px;
                }

                .game-stats {
                    padding: 8px;
                    font-size: 1em;
                }

                .game-instructions p {
                    font-size: 0.9em;
                }

                .instruction-items {
                    gap: 8px;
                }

                .instruction-icon {
                    width: 18px;
                    height: 18px;
                }

                .instruction-item span {
                    font-size: 0.75em;
                }

                .player {
                    width: 45px;
                    height: 45px;
                    bottom: 15px;
                }

                .falling-item {
                    width: 28px;
                    height: 28px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Ajustar o jogo quando o jogador muda a orientação da tela
function handleOrientationChange() {
    // Recarregar o jogo atual se estiver no meio de uma missão
    if (currentMission) {
        // Salvar o estado atual
        const savedMission = currentMission;
        const savedScore = currentScore || 0;
        
        // Aguardar um momento para que a tela termine de rotacionar
        setTimeout(() => {
            // Reiniciar o jogo atual
            startGameplay(savedMission);
            
            // Restaurar pontuação quando possível
            if (currentMission === savedMission && savedScore > 0) {
                if (document.querySelector('.catch-counter span')) {
                    document.querySelector('.catch-counter span').textContent = savedScore;
                }
                if (document.querySelector('.score-counter span')) {
                    document.querySelector('.score-counter span').textContent = savedScore;
                }
            }
        }, 300);
    }
}

// Adicionar ouvinte para evento de orientação
window.addEventListener('resize', function() {
    // Verificar se é mobile antes de processar o evento de redimensionamento
    if (isMobileDevice()) {
        handleOrientationChange();
    }
}); 

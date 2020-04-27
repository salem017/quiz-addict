const formNG = document.querySelector('.form-new-game');
const titleMG = document.querySelector('.main-game-title');
const mainGame = document.querySelector('.main-game-container');
const playersConUl = document.querySelector('.players-container-ul');
const loader = document.querySelector('.loader-container');

let roomId;


if (formNG) {
    formNG.addEventListener('submit', (e) => {
        e.preventDefault();

        let room = {};
        room.name = e.target.name.value;
        room.number = e.target.number.value;
        room.password = e.target.password.value;

        socket.emit('create-room', room);
    })
}

socket.on('players-ready', () => {
    mainGame.removeChild(loader);
    socket.emit('start-game', roomId);
})

socket.on('new-question', (question) => {
    createQuestion(question, mainGame);
})

socket.on('room-created', (room) => {
    formNG.style.display = 'none';
    mainGame.style.display = 'flex';
    titleMG.innerHTML += room.name;
    roomId = room.id;
})

socket.on('player-join', (player) => {
    let li = document.createElement("LI");
    li.classList.add('player-li');
    let text = document.createTextNode(player.name);
    li.appendChild(text);
    playersConUl.appendChild(li);
})
let grid = document.querySelector("#gameGrid");

function init() {
    for (let i = 0; i < 400; i++) {
        let box = document.createElement("div");
        box.classList.add("box");
        grid.appendChild(box);
    }

    let boxes = document.querySelectorAll(".box");

    // Créer un tableau contenant les index de toutes les cases
    let boxIndexes = Array.from(Array(400).keys());

    // Mélanger les index de manière aléatoire
    boxIndexes.sort(() => Math.random() - 0.5);

    // Sélectionner les 50 premiers index mélangés pour placer les rochers
    let rockIndexes = boxIndexes.slice(0, 50).filter(ind => ind !== 0);

    // Placer les rochers sur les cases correspondantes
    rockIndexes.forEach(index => {
        let box = boxes[index];
        let img = document.createElement("img");
        img.setAttribute("src", "/assets/rock.png");
        img.classList.add("rocks");
        box.appendChild(img);
    });

    // placer le joueur (player) à la premiere case de la grille
    let player = document.createElement("img");
    player.setAttribute("src", "/assets/player.png");
    player.classList.add("player");
    boxes[0].appendChild(player)

    //Créer le trésor
    let treasure = document.createElement("img");
    treasure.setAttribute("src", "/assets/treasure.png");
    treasure.classList.add("treasure");

    // Placer dans un tableau, les boxes libres (donc ne contenant ni joueur, ni rochers)
    let emptyBoxes = Array.from(document.querySelectorAll(".box")).filter(b => !b.querySelector("img"));

    // définir dans une variable, un index aléatoire parmis les indexes libres définis juste au dessus.
    // cela sera l'emplacement du trésor
    treasurePlace = Math.floor(Math.random() * emptyBoxes.length);

    // 
    emptyBoxes[treasurePlace].appendChild(treasure);
}

// démarrer la fonction init
init();

let boxes = Array.from(document.querySelectorAll(".box"));

// fonction qui determine la position (index) du joueur.
function findPlayerPosition() {
    let playerPosition;
    boxes.forEach(box => {
        let playerElement = box.querySelector(".player");
        if (playerElement) {
            playerPosition = boxes.indexOf(box);
        }
    });
    return playerPosition
}
// fonction de deplacement du personnage



function playerMove(keycode, number, e) {
    let currentPosition = findPlayerPosition();

    let playerImage = boxes[currentPosition].querySelector('img');
    let player = boxes[currentPosition];
let treasureIndex;
    boxes.forEach(box => {
        let treasureImage = box.querySelector(".treasure");
        if (treasureImage) {
            treasureIndex = boxes.indexOf(box);
        }
       
    })

    if (e.keyCode === keycode && !boxes[currentPosition + number].querySelector('img')) {
        player.removeChild(playerImage);
        let playerRightMove = document.createElement('img');
        playerRightMove.setAttribute('src', '/assets/player.png');
        playerRightMove.classList.add('player')
        boxes[currentPosition + number].appendChild(playerRightMove)
 
        // Check if any adjacent position contains a treasure image
        if (
        currentPosition+1 == treasureIndex
        ) {
            setTimeout(() => {
                alert("congrats !");
            }, 300);
        }


    }
    currentPosition = findPlayerPosition();
    
}


// ecouteur d'evenement touches directionnelles.
window.addEventListener("keydown", function (e) {

    playerMove(37, -1, e); //gauche
    playerMove(38, -20, e); // haut
    playerMove(39, 1, e); //droite
    playerMove(40, 20, e); //bas

    ;
})
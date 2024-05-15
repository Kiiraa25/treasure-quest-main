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
    console.warn(boxIndexes)
    // Sélectionner les 50 premiers index mélangés pour placer les rochers
    let rockIndexes = boxIndexes.slice(0, 50).filter(ind => ind !== 0 && ind !== 1 && ind !== 20);

    // Placer les rochers sur les cases correspondantes
    rockIndexes.forEach(index => {
        let box = boxes[index];
        let img = document.createElement("img");
        img.setAttribute("src", "./assets/rock.png");
        img.classList.add("rocks");
        box.appendChild(img);
    });

    // placer le joueur (player) à la premiere case de la grille
    let player = document.createElement("img");
    player.setAttribute("src", "./assets/player.png");
    player.classList.add("player");
    boxes[0].appendChild(player)

    //Créer le trésor
    let treasure = document.createElement("img");
    treasure.setAttribute("src", "./assets/treasure.png");
    treasure.classList.add("treasure");


    // Placer dans un tableau, les boxes libres (donc ne contenant ni joueur, ni rochers)
    let emptyBoxes = Array.from(boxes).filter(box => !box.querySelector("img"));

    // définir dans une variable, un index aléatoire parmis les indexes libres définis juste au dessus.
    // cela sera l'emplacement du trésor
    treasurePlace = Math.floor(Math.random() * emptyBoxes.length);

    // placer le trésor dans cet index aléatoire
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

// définir la position du trésor
let treasureIndex;
boxes.forEach(box => {
    let treasureImage = box.querySelector(".treasure");
    if (treasureImage) {
        treasureIndex = boxes.indexOf(box);
    }
})

// fonction qui gere le deplacement du personnage
function playerMove(keycode, number, e) {
    let currentPosition = findPlayerPosition();
    let nextPlayerPosition = currentPosition + number;
    let playerImage = boxes[currentPosition].querySelector('img');
    let player = boxes[currentPosition];

    // on enlève l'image du joueur dans la case précedente pour la placer dans la case suivante.
        if (e.keyCode === keycode && !boxes[currentPosition + number].querySelector('img')) {
        player.removeChild(playerImage);
        let playerMove = document.createElement('img');
        playerMove.setAttribute('src', './assets/player.png');
        playerMove.classList.add('player')
        boxes[currentPosition + number].appendChild(playerMove)
        console.log("pos :",nextPlayerPosition) 
            
        // on cible les cases proches du trésor. celles ou ont considère que le trésor a été trouvé.
        let left = treasureIndex - 1
        let right = treasureIndex + 1
        let top = treasureIndex - 20
        let bottom = treasureIndex + 20

        // on compare les cases proches du trésor avec l'emplacement du joueur pour vérifier s'il a trouvé ou non le trésor.
        if (left == nextPlayerPosition || right == nextPlayerPosition || bottom == nextPlayerPosition || top == nextPlayerPosition) {
            setTimeout(() => {
                alert("Voila, quoi!");
            }, 300);
        }
    }
}

// ecouteur d'evenement touches directionnelles.
window.addEventListener("keydown", function (e) {

    playerMove(37, -1, e); //gauche
    playerMove(38, -20, e); // haut
    playerMove(39, 1, e); //droite
    playerMove(40, 20, e); //bas

    ;
})

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// // Dessiner le corps du personnage (un rectangle)
// ctx.fillStyle = 'blue';
// ctx.fillRect(50, 100, 25, 50); // x, y, largeur, hauteur

// // Dessiner la tête du personnage (un cercle)
// ctx.beginPath();
// ctx.arc(100, 75, 25, 0, Math.PI * 2); // x, y, rayon, angle de départ, angle de fin
// ctx.fillStyle = 'yellow';
// ctx.fill();

// // Dessiner les yeux du personnage (deux petits cercles)
// ctx.beginPath();
// ctx.arc(90, 65, 5, 0, Math.PI * 2); // oeil gauche
// ctx.fillStyle = 'black';
// ctx.fill();

// ctx.beginPath();
// ctx.arc(110, 65, 5, 0, Math.PI * 2); // oeil droit
// ctx.fillStyle = 'black';
// ctx.fill();

// // Dessiner la bouche du personnage (une ligne)
// ctx.beginPath();
// ctx.moveTo(90, 80);
// ctx.lineTo(110, 80);
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 2;
// ctx.stroke();


// Mémo : suite et/ou problèmes à régler.

/* 
- les roches ne peuvent pas emprisonner le joueur en début de partie
- compter les pas
- placer une barre de vie + barre de mana du personnage
- placer les adversaires
- pouvoir sauvegarder une partie
- placer une page d'entrée dans le jeu avec les règles, un bouton reprendre une partie ou commencer une partie.
 
 
 
 */


const cardParent = document.querySelector('.deck');
let openCards = [];
let matchedCards = [];

// for rating
let nonMatchedCards = [];
let starsContainer = document.querySelector('.stars');
let starsCounter = 3;

//moves
let moves = 0;
const movesContainer = document.querySelector('.moves');

//Time

const timeCounter = document.querySelector('.time-counter');
let timer;
let firstClick = 1; // a descriptive variable for the timer to make it starts at the first click only
let s = 0;
let m = 0;



/*
 * Create a list that holds all cards
 */

const icons = [ "fa fa-diamond", "fa fa-diamond",
                "fa fa-paper-plane-o", "fa fa-paper-plane-o",
                "fa fa-anchor", "fa fa-anchor",
                "fa fa-bolt", "fa fa-bolt",
                "fa fa-cube", "fa fa-cube",
                "fa fa-leaf", "fa fa-leaf",
                "fa fa-bicycle", "fa fa-bicycle",
                "fa fa-bomb", "fa fa-bomb",
            ];

shuffle(icons);


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




// generate cards HTML, i am doing a loop to create list 16 times and append this list to the ul element

function inGame() {
    for (let i = 0; i < icons.length; i++ ) {

        const card = document.createElement('li');
        card.classList.add('card');
        card.setAttribute("data-card", icons[i]);
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardParent.appendChild(card);
        // Click Event listener
        clickEvent(card);
    };
};


function clickEvent(card) {

    card.addEventListener('click', function(){

        //Setting the timer after the first click executed
        if(firstClick == 1) {
            setTimer();
            firstClick = 0;
        };
        

        if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {

            openCards.push(card);
            card.classList.add('open', 'show');
            //  checks two cards at a time and compare if they are matched or not
            compare();
        
        };

    });
};


function compare() {
    if(openCards.length == 2) {
        // if they match
        if(openCards[0].dataset.card == openCards[1].dataset.card) {
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
            matchedCards.push(openCards[0], openCards[1]);
            openCards = [];
            
            // check if the player did all the cards right
            gameIsOver();

        } else {
            // If there no match, go away
            
            setTimeout(function(){
                openCards.forEach(function(card) {
                card.classList.remove('open');
                
                //Animation 
                card.classList.add('card-shake');
                setTimeout(function(){
                    card.classList.remove('card-shake');
                    card.classList.remove('show');
                }, 200);

                // here i put all the wrong (opened) cards into this array to know how many he did it wrong to remove stars
                nonMatchedCards.push(card);
            });
            
            openCards = [];
        }, 300);
            //calling the star rating function 
        stars();
    };
            //moves will added if they are matched or not
        moveCount();
        
    };
    
};






function moveCount() {
    moves++;
    movesContainer.innerHTML = moves;
    
};


//Rating
function stars() {
    if (moves == 12) {
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
                                <li><i class="fa fa-star"></i></li>`;
        starsCounter--;

    } else if (moves == 20){
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>`;
        starsCounter--;
    };
};


function setTimer() {
        timer = setInterval(function() {
        s++;
        if (s == 60) {
            m++;
            s = 0;
        }

        timeCounter.innerHTML = formatTime();
    }, 1000);
};



function clearTimer() {
    clearInterval(timer);
};


function formatTime() {
    let seconds = s > 9 ? String(s) : '0' + String(s);
    let minutes = m > 9 ? String(m) : '0' + String(m);
    return minutes + ':' + seconds;
}





function gameIsOver() {
    if (matchedCards.length === icons.length) {
        newColor();
        clearTimer();
    
        setTimeout(function(){
            alert(`Congratulations! You won! with ${moves} moves, ${starsCounter} star and ${formatTime()} time. Play again? click on the restart button`);
        }, 1000);
    };
};

// this funtion will change the card's background color and the container as well
function newColor() {
    matchedCards.forEach(function(card){
        card.classList.add('win');
    });
    cardParent.style.background = 'linear-gradient(160deg, #cc5302 0%, #d45172 100%)';
};





// restart the game
function gameRestarted() {
    const restartBtn = document.querySelector('.restart');
    restartBtn.addEventListener('click', function(){
        cardParent.innerHTML = "";
        inGame();
        matchedCards = [];
        openCards = [];

        moves = 0;
        movesContainer.innerHTML = moves;

        nonMatchedCards = [];
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
                                    <li><i class="fa fa-star"></i></li>
                                    <li><i class="fa fa-star"></i></li>`;
        starsCounter = 3;
        
        clearTimer();
        firstClick = true; // after i clear the timer i must reset this variable because it was false
        s = 0;
        m = 0;
        timeCounter.innerHTML = "";
        
        cardParent.style.background = 'linear-gradient(160deg, #02ccba 0%, #aa7ecd 100%)';

    });
};


inGame();
gameRestarted();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



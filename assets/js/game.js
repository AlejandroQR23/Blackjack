/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

// VARIABLES
let deck       = [];
const types    = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerPoints = 0;
let aiPoints     = 0;

// DOM
const btnAsk      = document.querySelector('#btnAsk');
const btnStop     = document.querySelector('#btnStop');
const btnNew      = document.querySelector('#btnNew');
const scores      = document.querySelectorAll('small');
const playerCards = document.querySelector('#player-cards');
const aiCards     = document.querySelector('#ai-cards');

/**
 * A function that creates an array that
 * works as the game deck with the name of
 * the cards, then it shuffles this deck.
 */
const createDeck = () => {
    for (var i = 2; i <= 10; i++) {
        for (var type of types) {
            deck.push( i + type );
        }
    }

    for (var type of types) {
        for (var special of specials) {
            deck.push( special + type );
        }
    }

    return _.shuffle( deck );
}

createDeck();

/**
 * A function that allows us to
 * get a new card. If there is no
 * cards left, it throws an error.
 */
const askForCard = () => {
    if ( deck.length === 0 ) {
        throw 'There is no more cards';
    }

    return deck.pop();
}

/**
 * A function that returns the
 * value of a given card.
 */
const cardValue = ( card ) => {
    const value = card.substring( 0, card.length-1 );
    if ( isNaN(value) ) {
        return ( value === 'A' ) ? 11 : 10;
    } else {
        return value * 1;
    }
}

/**
 * A function that controls the
 * ai turn in the game.
 */
const aiTurn = ( minimumPoints ) => {
    do {
        const card = askForCard();

        aiPoints += cardValue( card );
        scores[1].innerText = aiPoints;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${ card }.png`;
        imgCard.classList.add('card');
        aiCards.append( imgCard );

        if ( minimumPoints > 21 ) {
            break;
        }

    } while( (aiPoints < minimumPoints) && (minimumPoints <= 21) );

    setTimeout( () => {
        if ( aiPoints === minimumPoints ) {
            alert('it is a draft');
        } else if ( minimumPoints > 21 ) {
            alert(' An AI just beat you, shame on you ');
        } else if ( aiPoints > 21 ) {
            alert(' Congrats! You won ')
        } else {
            alert(' An AI just beat you, shame on you ');
        }
    }, 100);

}

// EVENTS
btnAsk.addEventListener( 'click', () => {

    const card = askForCard();

    playerPoints += cardValue( card );
    scores[0].innerText = playerPoints;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cards/${ card }.png`;
    imgCard.classList.add('card');
    playerCards.append( imgCard );

    if ( playerPoints > 21 ) {

        console.warn(' An AI just beat you, shame on you ');
        btnAsk.disabled = true;
        btnStop.disabled = true;
        aiTurn( playerPoints );

    } else if ( playerPoints === 21 ) {

        console.warn(' You got 21! ');
        btnAsk.disabled = true;
        btnStop.disabled = true;
        aiTurn( playerPoints );

    }

});

btnStop.addEventListener( 'click', () => {

    btnStop.disabled = true;
    btnAsk.disabled = true;
    aiTurn( playerPoints );

});

btnNew.addEventListener( 'click', () => {

    deck = [];
    deck = createDeck();

    playerPoints = 0;
    aiPoints     = 0;

    scores[0].innerText = 0;
    scores[1].innerText = 0;

    aiCards.innerHTML     = '';
    playerCards.innerHTML = '';

    btnStop.disabled = false;
    btnAsk.disabled = false;

});

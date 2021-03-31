
const gameModule = (() => {

    'use strict'

    // VARIABLES
    let deck       = [];
    const types    = ['C', 'D', 'H', 'S'],
          specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = [];

    // DOM
    const btnAsk       = document.querySelector('#btnAsk');
    const btnStop      = document.querySelector('#btnStop');
    const btnNew       = document.querySelector('#btnNew');

    const scores       = document.querySelectorAll('small'),
          playersCards = document.querySelectorAll('.div-cards');


    /**
     * A function that starts the
     * game deck.
     */
    const startGame = ( numPlayers = 2 ) => {
        deck = createDeck();
        playersPoints = [];
        for (var i = 0; i < numPlayers; i++) {
            playersPoints.push(0);
        }

        scores.forEach( elem => elem.innerText = 0 );
        playersCards.forEach( elem => elem.innerHTML = '' );


        btnStop.disabled = false;
        btnAsk.disabled = false;
    }

    /**
     * A function that creates an array that
     * works as the game deck with the name of
     * the cards, then it shuffles this deck.
     */
    const createDeck = () => {

        deck = [];
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
     * A function that gets the
     * player in turn points.
     * turn is a number which stands for
     * the player number, where 0 is the
     * player 1 and the last one is the AI.
     */
    const getPoints = ( turn, card ) => {
        playersPoints[ turn ] += cardValue( card );
        scores[ turn ].innerText = playersPoints[ turn ];
        return playersPoints[ turn ];
    }

    /**
     * A function that creates a
     * card on the HTML div of the player
     * in turn.
     */
    const createCard = ( turn, card ) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cards/${ card }.png`;
        imgCard.classList.add('card');
        playersCards[ turn ].append( imgCard );
    }

    /**
     * A function that shows a
     * message with the result of
     * the game.
     */
    const getWinner = () => {

        const [ minimumPoints, aiPoints ] = playersPoints;

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

    /**
     * A function that controls the
     * ai turn in the game.
     */
    const aiTurn = ( minimumPoints ) => {

        let aiPoints = 0;
        do {

            const card = askForCard();
            aiPoints = getPoints( playersPoints.length-1, card );
            createCard( playersPoints.length-1, card );

        } while( (aiPoints < minimumPoints) && (minimumPoints <= 21) );

        getWinner();

    }

    // EVENTS
    btnAsk.addEventListener( 'click', () => {

        const card = askForCard();
        const playerPoints = getPoints( 0, card );
        createCard( 0, card );

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
        aiTurn( playersPoints[0] );

    });

    btnNew.addEventListener( 'click', () => {

        startGame();

    });

})();

// Challange 1: Your age in days

function ageInDays(){
    var birthYear = prompt('What year were you born...Good friend?');
    var ageInDayss = (2020-birthYear)*365;
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('you are ' + ageInDayss + ' days old')
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
 
}

function reset(){
    document.getElementById('ageInDays').remove();
}

// Challange 2: Cat Generator

function generateCat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src = "https://api.thecatapi.com/v1/images/search?size=small&format=src&fype=gif";
    div.appendChild(image);
}

// Challange 3: Rock, Paper, Scissors

function rpsGame(yourChoice){
    //console.log('Your choice:', yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());  //bot won//////draw////////human won//
    //console.log('Computer choice:', botChoice);
    results = decideWinner(humanChoice, botChoice); // [0, 1] || [0.5, 0.5] || [1, 0]
    //console.log(results);
    message = finalMessage(results) //{'message': 'You won', 'color': 'green'}
    //console.log(message);
    rpsFrontEnd(yourChoice.id, botChoice, message)

}

function randToRpsInt(){
    return Math.floor(Math.random() * 3);
}

function numberToChoice(number){
    return ['rock', 'paper', 'scissors'][number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock':{'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper':{'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors':{'paper':1 , 'scissors': 0.5, 'rock':0}
    }

    var yourScore = rpsDatabase [yourChoice][computerChoice];
    var computerScore = rpsDatabase [computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'You Lost', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'You Tied', 'color': 'yellow'};
    } else {
        return {'message': 'You Won', 'color': 'green'};
    }
} 

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    
    // lets remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width = 150 style='box-shadow: 10px 10px 29px 13px rgba(10,10,92,0.46);'>"
    messageDiv.innerHTML = "<h1 style= 'color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width = 150 style='box-shadow: 10px 10px 29px 13px rgba(243,38,24,1);'>"
    

    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}

// Challange 4: Change the color of all buttnos!

var all_buttons = document.getElementsByTagName('button');

var copyOfAllButtons = [];
for (let i=0; i<all_buttons.length;i++){
    copyOfAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    if (buttonThingy.value === 'red'){
        buttonsRed();
    }
    else if (buttonThingy.value === 'green'){
        buttonsGreen();
    }
    else if (buttonThingy.value === 'reset'){
        buttonColorReset();
    }
    else if (buttonThingy.value === 'random'){
        randomColors();
    }
}

function buttonsRed() {
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen(){
    for(let i = 0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success')
    }
}

function buttonColorReset(){
    for(let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyOfAllButtons[i]);
    }
}

function randToInt(){
   let rndNum =  Math.floor(Math.random()* 4)
}

function randomColors(){
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];

    for(i = 0; i < all_buttons.length; i++){
        let randomNumber = Math.floor(Math.random()* 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

//Challange 5: Blackjack

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result',  'div': '#your-box', 'score': 0},
    'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', 'Q', 'A',],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'K': 10, 'J': 10, 'Q': 10, 'A': [1, 11]}
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    let card = randomCard();
    showCard(card,YOU);
    //console.log(card);
    updateScore(card, YOU);
    showScore(YOU);
}

function randomCard(){
    let randomIndex =  Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card, activePlayer){
    if(activePlayer['score'] <= 21){ 
        let cardImage = document.createElement('img');
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play()
    }
}

function blackjackDeal(){
    showResult();
    computeWinner();
    yourImages = document.querySelector('#your-box').querySelectorAll('img');
    dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');

    for(let i = 0; i<yourImages.length; i++){
        yourImages[i].remove();
    }

    for(let i = 0; i<dealerImages.length; i++){
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').style.color = 'white';

}

function updateScore(card, activePlayer){
        if(card === 'A'){
        //if adding 11 keeps e below 21, add 11, otherwise, add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        } else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }

    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
    
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function dealerLogic(){
    let card = randomCard();
    showCard(card, DEALER);
    updateScore(card, DEALER);
    showScore(DEALER);
    
}

// compute winner and return who just won
function computeWinner(){
    let winner;
    
    if (YOU['score'] <= 21){
        // condition: higher score than the dealer or when dealer busts but you're 21 or under
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            console.log('You Won!');
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']){
            console.log('You Lost!');
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']) {
            console.log('You Drew!');
        }

        //condition: when user busts but dealer doesn`t 
        else if (YOU['score'] > 21 && DEALER['score'] <= 21){
            console.log('You Lost!')
            winner = DEALER;
        }

        // condition: when you and dealer busts
        else if (YOU['score'] > 21 && DEALER['score'] > 21){
            console.log('You Drew!')
        }
    }

    console.log('Winer is ', winner);
    return winner;
}

function objToString(winner){
    if (winner = DEALER){
        let winnie = 'Dealer';
    } else {
        let winnie = 'You ';
    }
    return winnie;
}

function showResult(winner, winnie){
    document.querySelector('#blackjack-result').textContent = 'winner is ', winnie ;
}
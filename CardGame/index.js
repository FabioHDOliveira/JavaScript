
var dealt_cards = [];
var deck = [];
var computer_wins = 0;
var player_wins = 0;
var sum = 0;
var dealt = false;
var shown = false;

function initCards() {
    // creates card object

    var card = (suit, weight) => {
        suit = suit;
        weight = weight;
        return " Suit: " + suit + " / Weight: " + weight;
    }
    var suits = ['Clubs', 'Diamonds', 'Spades', 'Hearts'];
    var weight = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
    for (var s = 0; s < suits.length; s++) {
        for (var w = 0; w < weight.length; w++) {
            deck.push(card(suits[s], weight[w]));
        }
    }
}


function drawCards(num_cards) {
    var cards = [];
    for (var c = 0; c < num_cards; c++) {
        var dealt_card = deck.shift(); //remove the first card from the deck
        cards.push(dealt_card); //push the card to the new array to return
        dealt_cards.push(dealt_card);
    }
    return cards;
}

function score() {
    var p1_card_index = drawCards(3);
    var p2_card_index = p1_card_index;
    while (p2_card_index == p1_card_index) {
        p2_card_index = drawCards(3);
    
}

    if (p1_card_index > p2_card_index) {
            computer_wins++;
            document.getElementById('wcomputer').innerHTML = computer_wins;
        } else {
            player_wins++;
            document.getElementById('wplayer').innerHTML = player_wins;
        }
}

//Sums the weight of the cards
/* function score(){}
for (var count = 0; count < p1_card_index.length; count++)
    {
    computer_total += p1_card_index.weight[count];
    player_total += p2_card_index.weight[count];
    }
}; */

function shuffle (){
    var i = 0;
    var j = 0;
    var temp = null;
  
    for (i = this.deck.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = this.deck[i];
      this.deck[i] = this.deck[j];
      this.deck[j] = temp;
    }  
  };

function resetDisplay() {
    deck = [];
    deck.unshift(dealt_cards.shift());
}

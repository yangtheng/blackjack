class Card {
  constructor (type, value, suit) {
    this.type = type
    this.value = value
    this.suit = suit
  }
}

class Deck {
  constructor () {
    this.types = ['A','2','3','4','5','6','7','8','9','T','J','Q','K']
    this.value = [11,2,3,4,5,6,7,8,9,10,10,10,10]
    this.suit = ['h','s','c','d']
    this.cards = []
    for (var i = 0; i < this.types.length; i++) {
      for (var j = 0; j < this.suit.length; j++) {
        this.cards.push(new Card(this.types[i], this.value[i], this.suit[j]))
      }
    }
  }
  shuffle () {
    for (var i = this.cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1))
      var temp = this.cards[i]
      this.cards[i] = deck.cards[j]
      this.cards[j] = temp
    }
  }
  deal (playerCards) {
    var card = this.cards.shift()
    playerCards.push(card)
  }
}

class Player {
  constructor () {
    this.cards = []
    this.bankroll = 50000
    this.betAmount = 0
  }

  bet (amount) {
    if (!amount && amount < 1) {
      alert ('Please bet more than $0!')
      return false
    } else if (amount <= this.bankroll) {
      this.betAmount = amount
      this.bankroll -= amount
      return true
    } else {
      alert ('You do not have enough money!')
      return false
    }
  }

  double () {
    if (this.bankroll >= this.betAmount) {
      this.bankroll -= this.betAmount
      this.betAmount = this.betAmount * 2
      return true
    } else {
      return false
    }
  }

  split () {

  }

  surrender () {
    this.bankroll -= this.betAmount / 2
  }
}

var deck = ''
var player = new Player()
console.log(deck)

var playerDisplay = document.querySelector('#player')
var dealerDisplay = document.querySelector('#dealer')
var playerValue = document.querySelector('#playerV')
var dealerValue = document.querySelector('#dealerV')
var betAmount = document.querySelector('#betAmount')
var betDisplay = document.querySelector('#betDisplay')
var bankroll = document.querySelector('#bankrollDisplay')
bankroll.textContent = '$' + player.bankroll

var newGameButton = document.querySelector('#newgame')
newGameButton.addEventListener('click', function () {
  if (player.bet(betAmount.value)) {
    deck = new Deck()
    betDisplay.textContent = '$' + player.betAmount
    bankroll.textContent = '$' + player.bankroll
    playerDisplay.textContent = ''
    dealerDisplay.textContent = ''
    playerValue.textContent = ''
    dealerValue.textContent = ''
    player.cards = []
    dealer = []
    deck.shuffle()
    deck.deal(player.cards)
    deck.deal(player.cards)
    playerDisplay.textContent = player.cards[0].type + player.cards[0].suit + '' + player.cards[1].type + player.cards[1].suit
    playerValue.textContent = checkValue(player.cards)
    deck.deal(dealer)
    deck.deal(dealer)
    dealerDisplay.textContent = dealer[0].type + dealer[0].suit + '**'
    if (checkBJ(player.cards) === 'blackjack') playerValue.textContent = 'Blackjack!'
    if (checkBJ(dealer) === 'blackjack') {
      dealerDisplay.textContent = dealer[0].type + dealer[0].suit + dealer[1].type + dealer[1].suit
      dealerValue.textContent = 'Blackjack!'
    }
  }
})

var drawButton = document.querySelector('#draw')
drawButton.addEventListener('click', function () {
  deck.deal(player.cards)
  playerDisplay.textContent += player.cards[player.cards.length - 1].type + player.cards[player.cards.length - 1].suit
  playerValue.textContent = checkValue(player.cards)
})

var dealerturnButton = document.querySelector('#dealerturn')
dealerturnButton.addEventListener('click', function () {
  dealerDisplay.textContent = dealer[0].type + dealer[0].suit
  dealerDisplay.textContent += dealer[dealer.length - 1].type + dealer[dealer.length - 1].suit
  dealerValue.textContent = checkValue(dealer)
  function dealerDraws () {
    dealerTurn()
    dealerDisplay.textContent += dealer[dealer.length - 1].type + dealer[dealer.length - 1].suit
    dealerValue.textContent = checkValue(dealer)
    if (checkValue(dealer) < 17) {
      setTimeout(dealerDraws, 1000)
    }
  }
  if (checkValue(dealer) < 17) {
    setTimeout(dealerDraws, 1000)
  }
})

function checkValue (playerCards) {
  var cardValue = 0
  var aceCards = playerCards.filter(hasAce)
  for (var cardNo = 0; cardNo < playerCards.length; cardNo++) {
    cardValue = cardValue + playerCards[cardNo].value
  }
  if (cardValue > 21 && aceCards.length > 0) {
    while (cardValue > 21 && aceCards.length > 0) {
      cardValue = cardValue - 10
      aceCards.pop()
    }
  }
  return cardValue
}

function hasAce (card) {
  return card.type === 'A'
}

function isBust (playerCards) {
  var cardValue = checkValue(playerCards)
  if (cardValue > 21) return 'is bust'
  else return 'is not bust'
}

function checkBJ (playerCards) {
  var cardValue = checkValue(playerCards)
  if (cardValue === 21 && playerCards.length === 2) return 'blackjack'
  else return 'no blackjack'
}

function dealerTurn () {
  var cardValue = checkValue(dealer)
  if (cardValue < 17) {
      deck.deal(dealer)
    }
  return cardValue
}

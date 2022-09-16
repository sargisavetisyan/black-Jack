import { callRandom1 } from "./cardDecks.js";
import { unit } from "./pointsCards.js";
const au1 = new Audio('./audio/kazino.mp3')
const au2 = new Audio('./audio/fishka.mp3')
const au3 = new Audio('./audio/fhishki.mp3')
const au4 = new Audio('./audio/tadam.mp3')
const au5 = new Audio('./audio/error.mp3')
const card1 = new Audio('./audio/razdachaigra.mp3')
const card2 = new Audio('./audio/razdacha.mp3')
const card3 = new Audio('./audio/oun.mp3')
const card4 = new Audio('./audio/kaloda.mp3')
au1.volume = 0.5
au2.playbackRate = 2
card1.playbackRate = 3
card2.playbackRate = 2
document.addEventListener('keydown', function (eve) {
    if (eve.code === "KeyS") {
        au1.play()
    }
    if (eve.code === "KeyP") {
        au1.pause()
    }
})

const pleac = document.querySelector('.pleac')
const num = document.querySelector('.num')
let dollar = 1000
let prevent = true

// // =========================================================================================

let cardDecks = callRandom1()
const oneThird = Math.round(cardDecks.length / 3)

const start = document.querySelector('.start');

const countDeal = document.querySelector('.countDeal');
const countPleyer = document.querySelector('.countPleyer');
const hit = document.querySelector('.hit');

const stand = document.querySelector('.stand');
const repeat = document.querySelector('.repeat')

const blackJack = document.querySelector('.blackJack');

const dealCard = document.querySelectorAll('.dealCard');
const dealCardArray = Object.values(dealCard);
const pleyerCard = document.querySelectorAll('.pleyerCard');
const pleyerCardArray = Object.values(pleyerCard);
const startCards = [...pleyerCardArray, ...dealCardArray]
const divPleyer = document.querySelector('.pleyer')
let secretCard

class Game {
    static text = 'DRAW'

    constructor(card, unit, startCards, count) {
        this.card = card
        this.unit = unit
        this.startCards = startCards
        this.count = count
    }

    static initialCardsNew(obj) {
        if (obj.className === 'pleyerCard cardPlace') {
            pleyer.card.push(cardDecks[0])
        } else {
            deal.card.push(cardDecks[0])
        }
        obj.style.backgroundImage = cardDecks[0]
        cardDecks.shift(cardDecks[0])
    }
}

class Pleyer extends Game {
    constructor(card, unit, startCards, count, text, newCard) {
        super(card, unit, startCards, count)
        this.text = text
        this.newCard = newCard
    }

    initialCards() {
        for (let i in this.startCards) {
            this.startCards[i].style.backgroundImage = cardDecks[0]
            this.card.push(cardDecks[0])
            cardDecks.shift(cardDecks[0])
        }
        this.unit = unit(this.card)
    }

    addBlackJack() {
        blackJack.style.opacity = '1'
        blackJack.innerHTML = `BLACKJACK <br> ${this.text}`
        hit.style.display = 'none'
        stand.style.display = 'none'
        repeat.style.display = 'flex'
    }
}

class Deal extends Game {
    constructor(card, unit, startCards, count, text, newCard) {
        super(card, unit, startCards, count)
        this.text = text
        this.newCard = newCard
    }

    initialCards() {
        for (let i in this.startCards) {
            if (this.startCards[i].innerHTML !== '') {
                this.startCards[i].style.backgroundImage = 'url(../img/card.png)'
                this.card.push(cardDecks[0])
                secretCard = cardDecks[0]
                cardDecks.shift(cardDecks[0])
            } else {
                this.startCards[i].style.backgroundImage = cardDecks[0]
                this.card.push(cardDecks[0])
                cardDecks.shift(cardDecks[0])
            }
        }
        this.unit = unit(this.card)
    }

    addBlackJack() {
        this.startCards[1].style.backgroundImage = this.card[1]
        this.count.style.opacity = '1'
        blackJack.style.opacity = '1'
        blackJack.innerHTML = `${this.text}`
        hit.style.display = 'none'
        stand.style.display = 'none'
        repeat.style.display = 'flex'
    }
}

const pleyer = new Pleyer([], 'unit', [], countPleyer, 'YOU WON')
pleyer.startCards = pleyerCardArray

const deal = new Deal([], 'unit', [], countDeal, 'YOU LOST')
deal.startCards = dealCardArray

// // =========================================================================================

//Ազդարարվում է խաղի սկիզբը

start.addEventListener('click', function (event) {
    if (pleac.textContent !== '') {    //==>==>==>==>==>==>==>==>==>==>==>==>==>==>==>==> մինչև խաղադրույք չարվի չի սկսի
        start.style.display = 'none'
        pleyer.count.style.opacity = '1'
        hit.style.display = 'flex'
        stand.style.display = 'flex'
        pleyer.initialCards(this.startCards)
        deal.initialCards(this.startCards)
        card1.play()
        gameRule()
        pleyer.count.innerHTML = `${pleyer.unit}`
        deal.count.innerHTML = `${deal.unit}`
        prevent = false
    }
})

// // =========================================================================================

//Քայլի անցում խաղավարին

let eveHit

hit.addEventListener('click', function () {
    if (pleac.textContent !== '') {   //==>==>==>==>==>==>==>==>==>==>==>==>==>==>==>==>  խաղի ընթացքում հնարաոր չի խաղադրույք կատարել
        eveHit = event.target
        deal.startCards[1].style.backgroundImage = secretCard
        deal.count.style.opacity = '1'
        gameRule()
        addDealCard()
        prevent = false
    }
})

function addDealCard() {
    if (repeat.style.display === 'flex') {
        return
    } else {
        card3.play()
        deal.newCard = document.createElement('div')
        deal.newCard.id = 'deal'
        deal.newCard.className = 'cardPlace'
        const divDeal = document.querySelector('.deal')
        divDeal.append(deal.newCard)
        Game.initialCardsNew(deal.newCard)
        deal.unit = unit(deal.card)
        deal.count.innerHTML = `${deal.unit}`
        gameRule()
        addDealCard()
    }
}

// // =========================================================================================

//Խաղացողը վերցնում է նոր խաղաքարտ

stand.addEventListener('click', function (eve) {
    if (pleac.textContent !== '') {    //==>==>==>==>==>==>==>==>==>==>==>==>==>==>==>==>  խաղի ընթացքում հնարաոր չի խաղադրույք կատարել
        if (eve.target.innerHTML === 'STAND') {
            card3.play()
            pleyer.newCard = document.createElement('div')
            pleyer.newCard.id = 'del'
            pleyer.newCard.className = 'pleyerCard cardPlace'
            const divPleyer = document.querySelector('.pleyer')
            divPleyer.append(pleyer.newCard)
            Game.initialCardsNew(pleyer.newCard)
            pleyer.unit = unit(pleyer.card)
            countPleyer.innerHTML = `${pleyer.unit}`
            prevent = false
            gameRule()
        }
    }
})


// // =========================================================================================

let temp = 0

//Խաղի կանոններ

function gameRule() {
    if (cardDecks.length < oneThird) {
        cardDecks = callRandom1()
        card4.play()
    }
    if (pleyer.unit === 21 && pleyer.card.length === 2) {
        deal.startCards[1].style.backgroundImage = deal.card[1]
        deal.count.style.opacity = '1'
        pleyer.addBlackJack()
        au4.play()
        au3.play()
        return
    }
    if (deal.unit === 21 && deal.card.length === 2) {
        deal.addBlackJack()
        return
    }
    if (pleyer.unit === 21 && deal.unit === 21 && (pleyer.card.length = deal.card.length)) {
        blackJack.style.opacity = '1'
        deal.count.style.opacity = '1'
        blackJack.innerHTML = Game.text
        au5.play()
        return
    }
    if (pleyer.unit > 21 && deal.count.style.opacity !== '1') {
        blackJack.style.opacity = '1'
        blackJack.innerHTML = deal.text
        deal.startCards[1].style.backgroundImage = deal.card[1]
        hit.style.display = 'none'
        stand.style.display = 'none'
        repeat.style.display = 'flex'
        deal.count.style.opacity = '1'
        deal.count.innerHTML = `${deal.unit}`
        au5.play()
        return
    }
    if (deal.unit > pleyer.unit && deal.count.style.opacity === '1') {
        if (deal.unit <= 21) {
            blackJack.style.opacity = '1'
            blackJack.innerHTML = deal.text
            hit.style.display = 'none'
            stand.style.display = 'none'
            repeat.style.display = 'flex'
            au5.play()
        } else {
            blackJack.style.opacity = '1'
            blackJack.innerHTML = pleyer.text
            hit.style.display = 'none'
            stand.style.display = 'none'
            repeat.style.display = 'flex'
            au4.play()
            au3.play()
            dollar = dollar + 2 * temp
            temp = 0
            return num.innerHTML = `$  ${dollar}`
        }
        return
    }
    if (deal.unit > 17 && deal.unit === pleyer.unit && eveHit === 'Hit') {    //17-ը ընտրել եմ օպտիմալ որ կոմպը պայքարի))
        blackJack.style.opacity = '1'
        blackJack.innerHTML = `${Game.text}`
        hit.style.display = 'none'
        stand.style.display = 'none'
        repeat.style.display = 'flex'
        au5.play()
        return
    }
    if (blackJack.innerHTML === `BLACKJACK <br> YOU WON` || blackJack.innerHTML === `YOU WON`) {
        dollar = dollar + 2 * temp
        temp = 0
        return num.innerHTML = `$  ${dollar}`

    }
    if (blackJack.innerHTML === `YOU LOST`) {
        temp = 0
        return
    }
    if (blackJack.innerHTML === `DRAW`) {
        temp = 0
        return
    }
}

// // =========================================================================================

let newMix

// //Կրկնվում է խաղը

repeat.addEventListener('click', function () {
    au3.play()
    card2.play()
    repeat.style.display = 'none'
    hit.style.display = 'flex'
    stand.style.display = 'flex'
    blackJack.style.opacity = '0'
    pleyer.card = []
    pleyer.unit = 0
    deal.card = []
    deal.unit = 0
    deal.count.style.opacity = '0'
    const deleytDeal = Array.from(document.querySelectorAll('#deal'))
    deleytDeal.forEach(val => {
        val.remove();
    });
    const deleytPleyer = Array.from(document.querySelectorAll('#del'))
    deleytPleyer.forEach(val => {
        val.remove();
    });
    const deleytMix = Array.from(document.querySelectorAll('.mix'))
    deleytMix.forEach(val => {
        val.remove()
    })
    pleac.textContent = ''
    newMix.style.backgroundImage = ''
    pleyer.initialCards(this.startCards)
    deal.initialCards(this.startCards)
    pleyer.count.innerHTML = `${pleyer.unit}`
    deal.count.innerHTML = `${deal.unit}`
    console.log(cardDecks)
    prevent = true

    gameRule()
})

// ֆիշկեքի հետ է կապված

const five = document.querySelector('.five')
const ten = document.querySelector('.ten')
const twentyFive = document.querySelector('.twentyFive')
const fifty = document.querySelector('.fifty')
const hundred = document.querySelector('.hundred')
const card = document.querySelector('.cardButtons')
const mix = document.querySelector('.mix')

num.innerHTML = `$  ${dollar}`
let bid = 0

addEventListener('click', function (eve) {
    if (eve.target === five && dollar >= 5 && prevent) {
        bid += 5
        temp += bid
        sumBid()
        create()
        bid = 0
        newMix.style.backgroundImage = 'url(./img/five.png)'
        au2.play()
    }
    if (eve.target === ten && dollar >= 10 && prevent) {
        bid += 10
        temp += bid
        sumBid()
        create()
        bid = 0
        newMix.style.backgroundImage = 'url(./img/ten.png)'
        au2.play()
    }
    if (eve.target === twentyFive && dollar >= 25 && prevent) {
        bid += 25
        temp += bid
        sumBid()
        create()
        bid = 0
        newMix.style.backgroundImage = 'url(./img/twentyFive.jpg)'
        au2.play()
    }
    if (eve.target === fifty && dollar >= 50 && prevent) {
        bid += 50
        temp += bid
        sumBid()
        create()
        bid = 0
        newMix.style.backgroundImage = 'url(./img/fifty.jpg)'
        au2.play()
    }
    if (eve.target === hundred && dollar >= 100 && prevent) {
        bid += 100
        temp += bid
        sumBid()
        create()
        bid = 0
        newMix.style.backgroundImage = 'url(./img/hundred.jpg)'
        au2.play()
    }
    return temp
})

let tiv1
let tiv2
let max1 = 420
let min1 = 310
let max2 = 100
let min2 = 10

function sumBid() {
    dollar -= bid
    num.innerHTML = `$  ${dollar}`
    pleac.textContent = temp
    console.log(typeof (pleac.textContent))
}

function create() {
    newMix = document.createElement('div')
    newMix.className = 'mix'
    random(tiv1, tiv2)
    random(tiv1)
    newMix.style.left = `${tiv1}px`
    newMix.style.top = `${tiv2}px`
    card.append(newMix)
    return newMix
}

function random(...arg) {
    if (arg.length === 1) {
        return tiv1 = Math.round(Math.random() * (max1 - min1) + min1)
    }
    if (arg.length === 2) {
        return tiv2 = Math.round(Math.random() * (max2 - min2) + min2)
    }
}
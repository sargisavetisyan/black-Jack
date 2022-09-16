
import { callRandom1 } from "./cardDecks.js";
import { unit } from "./pointsCards.js";

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


let pleyer = {
    pleyerCards: [],
}

let deal = {
    dealCards: [],
}


//Խաղացողը և դիլլերը ստանում են--- initial(սկզբնական)--- խաղաքարտեր  խաղի սկզբւմ

let secretCard

function initialCards(arr) {
    for (let i in arr) {
        if (arr[i].innerHTML !== '') {
            arr[i].style.backgroundImage = 'url(./img/card.png)'
            deal.dealCards.push(cardDecks[0])
            secretCard = cardDecks[0]
            cardDecks.shift(cardDecks[0])
        } else {
            arr[i].style.backgroundImage = cardDecks[0]
            if (arr[i].className.includes('pleyer')) {
                pleyer.pleyerCards.push(cardDecks[0])
                cardDecks.shift(cardDecks[0])
            } else {
                deal.dealCards.push(cardDecks[0])
                cardDecks.shift(cardDecks[0])
            }
        }
    }
    pleyer.unit = unit(pleyer.pleyerCards)
    deal.unit = unit(deal.dealCards)
    setTimeout(function () {
        gameRule()
    }, 100)
}

// =========================================================================================

//Խաղացողը և դիլլերը ստանում են նոր խաղաքարտեր 

function initialCardsNew(obj) {
    if (obj.className === 'pleyerCard cardPlace') {
        pleyer.pleyerCards.push(cardDecks[0])
    } else {
        deal.dealCards.push(cardDecks[0])
    }
    obj.style.backgroundImage = cardDecks[0]
    cardDecks.shift(cardDecks[0])
}

//=========================================================================================

start.addEventListener('click', function () {
    start.style.display = 'none'
    countPleyer.style.opacity = '1'
    hit.style.display = 'flex'
    stand.style.display = 'flex'
    initialCards(startCards)
    countPleyer.innerHTML = `${pleyer.unit}`
    countDeal.innerHTML = `${deal.unit}`
})

let pleyerNewCard

function addPlayingCard(eve) {
    if (eve.target.innerHTML === 'STAND' && dealCardArray[1].style.backgroundImage !== '') {
        pleyerNewCard = document.createElement('div')
        pleyerNewCard.id = 'del'
        pleyerNewCard.className = 'pleyerCard cardPlace'
        const divPleyer = document.querySelector('.pleyer')
        divPleyer.append(pleyerNewCard)
        initialCardsNew(pleyerNewCard)
        pleyer.unit = unit(pleyer.pleyerCards)
        countPleyer.innerHTML = `${pleyer.unit}`

        // Այստեղ սկսում համակարգչի (դիլլերի) աշխատանքը

        if (pleyer.unit >= 21 && countDeal.style.opacity !== '1') {
            dealCardArray[1].style.backgroundImage = secretCard
            countDeal.style.opacity = '1'
            deal.unit = unit(deal.dealCards)
            countDeal.innerHTML = `${deal.unit}`
            blackJack.style.opacity = '1'
            blackJack.innerHTML = 'YOU LOST'
            hit.style.display = 'none'
            stand.style.display = 'none'
            repeat.style.display = 'flex'
        }
        if (pleyer.unit === 21) {
            setTimeout(function () {
                gameRuleDeal()
            }, 200)
        }
    }
}

addEventListener('click', addPlayingCard)

// =========================================================================================


// Խաղի կանոներ երբ խաղում է համակարգիչը

let dealNewCard

function gameRuleDeal() {
    dealNewCard = document.createElement('div')
    dealNewCard.id = 'deal'
    dealNewCard.className = 'cardPlace'
    const divDeal = document.querySelector('.deal')
    divDeal.append(dealNewCard)
    initialCardsNew(dealNewCard)
    deal.unit = unit(deal.dealCards)
    if (deal.unit > pleyer.unit && deal.unit <= 21) {
        let text = 'YOU LOST'
        addBlackJack(deal, text)
    } else if (deal.unit > pleyer.unit && deal.unit > 21) {
        let text = 'YOU WON'
        addBlackJack(deal, text)
    } else if (deal.unit === pleyer.unit && deal.unit <= 17) {
        gameRuleDeal()
    } else if (deal.unit === pleyer.unit && deal.unit > 17) {
        blackJack.style.opacity = '1'
        blackJack.innerHTML = 'DRAW'
        hit.style.display = 'none'
        stand.style.display = 'none'
        repeat.style.display = 'flex'
    }
    countDeal.innerHTML = `${deal.unit}`
    if (deal.unit < 21) {
        setTimeout(function () {
            gameRule()
        }, 500)
    }
}

// =========================================================================================

hit.addEventListener('click', function () {
    dealCardArray[1].style.backgroundImage = secretCard
    pleyer.unit = unit(pleyer.pleyerCards)
    deal.unit = unit(deal.dealCards)
    countDeal.style.opacity = '1'
    countDeal.innerHTML = `${deal.unit}`
    setTimeout(function () {
        gameRule()
    }, 500)
})

//Կրկնվում է խաղը

repeat.addEventListener('click', function () {
    repeat.style.display = 'none'
    hit.style.display = 'flex'
    stand.style.display = 'flex'
    blackJack.style.opacity = '0'
    pleyer.pleyerCards = []
    pleyer.unit = 0
    deal.dealCards = []
    deal.unit = 0
    dealCardArray[1].style.backgroundImage = 'url(./img/card.png)'
    countDeal.style.opacity = '0'
    const deleytDeal = Array.from(document.querySelectorAll('#deal'))
    deleytDeal.forEach(val => {
        val.remove();
    });                                                                         //????????????
    const deleytPleyer = Array.from(document.querySelectorAll('#del'))
    deleytPleyer.forEach(val => {
        val.remove();
    });
    initialCardsRepeat(startCards)
    countPleyer.innerHTML = `${pleyer.unit}`
    countDeal.innerHTML = `${deal.unit}`
})

// =========================================================================================

function initialCardsRepeat(arr) {
    for (let i in arr) {
        if (arr[i].innerHTML !== '') {
            arr[i].style.backgroundImage = 'url(./img/card.png)'
            deal.dealCards.push(cardDecks[0])
            secretCard = cardDecks[0]
            cardDecks.shift(cardDecks[0])
        } else {
            arr[i].style.backgroundImage = cardDecks[0]
            if (arr[i].className.includes('pleyer')) {
                pleyer.pleyerCards.push(cardDecks[0])
                cardDecks.shift(cardDecks[0])
            } else {
                deal.dealCards.push(cardDecks[0])
                cardDecks.shift(cardDecks[0])
            }
        }
    }
    gameRuleRepeat()
    pleyer.unit = unit(pleyer.pleyerCards)
    deal.unit = unit(deal.dealCards)
}

// =========================================================================================

//Կրկնվող խաղի կանոններ

function gameRuleRepeat() {
    if (pleyer.unit === 21 && pleyer.pleyerCards.length === 2) {
        let text = 'YOU WON'
        addBlackJack(deal, text)
    } else if (deal.unit === 21 && deal.dealCards.length === 2) {
        let text = 'YOU LOST'
        addBlackJack(pleyer, text)
    } else if (pleyer.unit === 21 && deal.unit !== 21) {
        if (countDeal.style.opacity !== '1') {
            let text = 'YOU WON'
            addBlackJack(deal, text)
        }
    }
}

// =========================================================================================

//խաղի կանոններ

function gameRule() {
    if (cardDecks.length < 18) {
        debugger;
        cardDecks = callRandom1()
        console.log(cardDecks)
    }
    if (pleyer.unit === 21 && pleyer.pleyerCards.length === 2) {
        let text = 'YOU WON'
        addBlackJack(deal, text)
    } else if (deal.unit === 21 && deal.dealCards.length === 2) {
        let text = 'YOU LOST'
        addBlackJack(pleyer, text)
    } else if (pleyer.unit === 21 && deal.unit !== 21) {
        if (countDeal.style.opacity !== '1') {
            let text = 'YOU WON'
            addBlackJack(deal, text)
        }
    } else if (pleyer.unit > 21) {
        let text = 'YOU LOST'
        addBlackJack(deal, text)
    } else if (pleyer.unit <= 21 && countDeal.style.opacity === '1') {
        if (deal.unit > pleyer.unit) {
            let text = 'YOU LOST'
            addBlackJack(pleyer, text)
        } else if (deal.unit === pleyer.unit && deal.unit <= 17) {
            gameRuleDeal()
        } else if (deal.unit === pleyer.unit && deal.unit > 17) {
            blackJack.style.opacity = '1'
            blackJack.innerHTML = 'DRAW'
        } else if (deal.unit < pleyer.unit) {
            gameRuleDeal()
        }
    }
    console.log(cardDecks)
    return cardDecks
}

// =========================================================================================

// Երբ սկզբնամասում խաղացողներից մեկն ունենում է 21 միավոր

function addBlackJack(obj, text) {
    if (obj.unit === 21) {
        blackJack.style.opacity = '1'
        if (pleyer.pleyerCards.length === deal.dealCards.length && countDeal.style.opacity !== '1') {
            blackJack.innerHTML = 'DRAW'
        } else {
            blackJack.innerHTML = `${text}`
        }
    } else {
        if (pleyer.pleyerCards.length > 2) {
            blackJack.style.opacity = '1'
            blackJack.innerHTML = `${text}`
        } else {
            blackJack.style.opacity = '1'
            if (text === 'YOU WON') {
                blackJack.innerHTML = `${text}`
            } else {
                blackJack.innerHTML = `${text}`
            }
        }
    }
    dealCardArray[1].style.backgroundImage = secretCard
    countDeal.style.opacity = '1'
    countDeal.innerHTML = `${deal.unit}`
    hit.style.display = 'none'
    stand.style.display = 'none'
    repeat.style.display = 'flex'
}

// =========================================================================================
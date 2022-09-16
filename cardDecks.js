let card = ['url(./img/qyapi2.png)', 'url(./img/qyapi3.png)', 'url(./img/qyapi4.png)', 'url(./img/qyapi5.png)', 'url(./img/qyapi6.png)', 'url(./img/qyapi7.png)', 'url(./img/qyapi8.png)', 'url(./img/qyapi9.png)', 'url(./img/qyapi10.png)', 'url(./img/qyapiValet.png)', 'url(./img/qyapiDama.png)', 'url(./img/qyapiKarol.png)', 'url(./img/qyapiTUZ.png)',
    'url(./img/xachi2.png)', 'url(./img/xachi3.png)', 'url(./img/xachi4.png)', 'url(./img/xachi5.png)', 'url(./img/xachi6.png)', 'url(./img/xachi7.png)', 'url(./img/xachi8.png)', 'url(./img/xachi9.png)', 'url(./img/xachi10.png)', 'url(./img/xachiValet.png)', 'url(./img/xachiDama.png)', 'url(./img/xachiKarol.png)', 'url(./img/xachiTUZ.png)',
    'url(./img/srti2.png)', 'url(./img/srti3.png)', 'url(./img/srti4.png)', 'url(./img/srti5.png)', 'url(./img/srti6.png)', 'url(./img/srti7.png)', 'url(./img/srti8.png)', 'url(./img/srti9.png)', 'url(./img/srti10.png)', 'url(./img/srtiValet.png)', 'url(./img/srtiDama.png)', 'url(./img/srtiKarol.png)', 'url(./img/srtiTUZ.png)',
    'url(./img/rari2.png)', 'url(./img/rari3.png)', 'url(./img/rari4.png)', 'url(./img/rari5.png)', 'url(./img/rari6.png)', 'url(./img/rari7.png)', 'url(./img/rari8.png)', 'url(./img/rari9.png)', 'url(./img/rari10.png)', 'url(./img/rariValet.png)', 'url(./img/rariDama.png)', 'url(./img/rariKarol.png)', 'url(./img/rariTUZ.png)',
]


/*  
    *Ստանում ենք 4 կալոդանոց խաղաքարտերի խառնված զանգված cardDecks 
    *Կարելի է ստեղծել 6 և 8 կալոդանոց և սկզբում ըստ ընտրված խաղի բարդության փոփոխել խաղաքարտերի քանակը
*/

//  Ստեղծում ենք randomArray 0-51 թվերի զանգված որտեղ ամեն թիվ կրկնվում է 4 անգամ

// let count = 0
let randomArray = []

function getRandom() {
    let randomNum = (Math.round(Math.random() * 51))
    if (!(randomArray.includes(randomNum))) {
        randomArray.push(randomNum)
    }
    // else {
    //     for (let i in randomArray) {
    //         if (randomArray[i] === randomNum) {
    //             count++
    //         }
    //     }
    //     if (count !== 4) {
    //         randomArray.push(randomNum)
    //     }
    // }
    // count = 0

}

let cardDecks = [];

function callRandom() {
    if (randomArray.length === 52) {   //4 kalodi hamar 208
        stir()
        return randomArray
    } else {
        for (let i = 0; i < 52; i++) {
            getRandom()
        }
    }
    callRandom()
}

// Կանչի դեպքում ստանում ենք նոր խառնված կալոդ

function callRandom1() {
    cardDecks = []
    randomArray = []
    callRandom()
    return cardDecks
}

// ==================================================================

// Լցնում  ենք cardDecks զանգվածը

function stir() {
    for (let i in randomArray) {
        cardDecks.push(card[randomArray[i]])
    }
}


// ===================================================================

export { callRandom1 }
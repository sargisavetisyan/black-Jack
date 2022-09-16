//խաղաքարտերի միավորները

export function unit(arr) {
    let sum = 0
    let count = 0
    let tuz = []
    for (let i in arr) {
        if (!arr[i].includes('TU')) {
            if (arr[i].includes('2')) {
                sum += 2          // switch   case-ով կարելի է գրել
            }
            if (arr[i].includes('3')) {
                sum += 3
            }
            if (arr[i].includes('4')) {
                sum += 4
            }
            if (arr[i].includes('5')) {
                sum += 5
            }
            if (arr[i].includes('6')) {
                sum += 6
            }
            if (arr[i].includes('7')) {
                sum += 7
            }
            if (arr[i].includes('8')) {
                sum += 8
            }
            if (arr[i].includes('9')) {
                sum += 9
            }
            if (arr[i].includes('10') || arr[i].includes('Va') || arr[i].includes('Da') || arr[i].includes('Ka')) {
                sum += 10
            }
        } else {

            // որոշվում է տզի 1 կամ 11 լինելը   ///  դուրս չի գալի

            count++
            tuz.push(arr[i])

            for (let i in tuz) {
                if (typeof (tuz[i]) === 'string') {
                    if (sum <= 10 && count === 1) {
                        tuz[i] = 11
                        sum += tuz[i]
                    } else if (sum > 10 && count === 2) {
                        tuz[i] = 1
                        sum += tuz[i]
                    } else if (sum <= 10 && count === 2) {
                        tuz[i] = 1
                        sum += tuz[i]
                    } else if (sum > 10 && count > 2) {
                        tuz[i] = 1
                        sum += tuz[i]
                    } else {
                        tuz[i] = 1
                        sum += tuz[i]
                    }
                }
            }
        }

        if (sum > 21 && tuz.includes(11)) {
            if (tuz.indexOf(11) + 1) {
                tuz[tuz.indexOf(11)] = 1
                sum -= 10
            }
        }
    }
    return sum
}

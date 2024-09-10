function countChange(money, coins) {
    const sum = coins.reduce((acc, curr) => acc + curr, 0)

    if (sum !== 20) {
        return 0
    }


    const allPossibleWays = []

    for (const coin of coins) {
        const randomlyNumber = Math.floor(Math.random() * 9)
        console.log(randomlyNumber)
    }
}

console.log(countChange(20, [15, 5]))
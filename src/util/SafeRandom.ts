class SafeRandom {
    digits: number
    store: number[]

    constructor(digits: number) {
        this.digits = digits;
        this.store = new Array(Math.pow(10, this.digits));
    }

    get new() {
        
    }
}
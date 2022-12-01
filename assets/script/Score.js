'use strict';

class Score {
    #date;
    #points;
    #errors;
    #percentage;

    constructor(date, points, errors, percentage) {
        this.#date = date;
        this.#points = points;
        this.#errors = errors;
        this.#percentage = percentage;
    }

    get date() {
        return this.#date;
    }
    
    get points() {
        return this.#points;
    }

    get errors(){
        return this.#errors
    }
    
    get percentage() {
        return this.#percentage;
    }

    getInfo(){
        return `Date: ${this.date} Points: ${this.points} Misses: ${this.errors}Percentage: ${this.percentage}`
    }
}

export { Score }
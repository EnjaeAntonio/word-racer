'use strict';

class Score {
    #date;
    #points;
    #percentage;

    constructor(date, points, percentage) {
        this.#date = date;
        this.#points = points;
        this.#percentage = percentage;
    }

    get date() {
        return this.#date;
    }
    
    get points() {
        return this.#points;
    }
    get percentage() {
        return this.#percentage;
    }

    getInfo(){
        return `Date: ${this.date} Points: ${this.points} Percentage: ${this.percentage}`
    }
}

export { Score }
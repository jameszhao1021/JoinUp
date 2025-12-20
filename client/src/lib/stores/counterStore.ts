import {makeAutoObservable} from 'mobx';

export default class CounterStore {
    title = 'Counter Store';
    count = 42;
    events: string[] = [
        `initial count is ${this.count}`
    ]
    constructor(){
       makeAutoObservable(this)
    }

    increament = (amount:number = 1) => {
        this.count += amount;
        this.events.push(`Incrementetd by ${amount} - count is now ${this.count}`)
    }

    decreament = (amount:number = 1) => {
        this.count -= amount;
        this.events.push(`Decrementetd by ${amount} - count is now ${this.count}`)
    }

    get eventCount(){
        return this.events.length
    }
}
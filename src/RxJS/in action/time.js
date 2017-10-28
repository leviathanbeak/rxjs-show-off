import { Observable } from 'rxjs/Rx'

//INTERVAL property containes the number of miliseconds elapsed btw one interval and the next
Observable.interval(2000)
    .timeInterval()
    .take(5)
    .do(n => console.log(n))
    .map(n => `${n.interval}$`)
    .subscribe(price => {
        console.log(`price is ${price}`)
    })

// all are emitted and after 2 seconds delay received
Observable.of([1, 23, 3, 5, 6])
    .do(x => console.log(`emitted ${x}`))
    .delay(2000)
    .subscribe(s => console.log(`received ${s}`))

// so before they are received total DELAY will be 6 seconds
Observable.from([1, 2])
    .delay(2000)
    .concat(Observable.from([3, 4]))
    .delay(2000)
    .concat(Observable.from([5, 6]))
    .delay(2000)
    .subscribe(x => console.log(x))

// this generic debounce operation allows the emission of an item only after a certain time span has elapsed before another event is emitted
// basically if you keep clicking constantly no event will be received UNTIL you stop clicking (in this case: for a second at least) then the last event will be emitted!
Observable.fromEvent(document, 'click')
    .debounceTime(1000)
    .subscribe(event => {
        console.log(event)
    })

// another debounce example
const box = document.createElement('input')
box.setAttribute('id', 'searchBox')
document.body.appendChild(box)
const searchBox = document.querySelector('#searchBox')

const notEmpty = input => !!input && input.trim().length > 0
const sendRequest = function(arr, query) {
    return arr.filter(item => query.length > 0 && item.startsWith(query))
}

let testData = [
    'elvis',
    'umar',
    'levi'
]

const search$ = Observable.fromEvent(searchBox, 'keyup')
    .debounceTime(1000)
    .pluck('target', 'value')
    .filter(notEmpty)
    .do(query => console.log(`querying for ${query}`))
    .map(query => sendRequest(testData, query))
    .subscribe(result => {
        console.log(result)
    })

//throttling, execute a function at most once very period, so unlike debounce which executes only after certain period AFTER the event has happened,
//THROTTLE happenes immedately and then its disabled for a certain period
Observable.fromEvent(document, 'click')
    .throttleTime(1000)
    .subscribe(event => {
        console.log(`just clicked me ${event}`)
    })
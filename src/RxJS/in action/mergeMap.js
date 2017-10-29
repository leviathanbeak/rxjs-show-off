import { Observable } from 'rxjs/Rx'

// But there are also cases that occur frequently where an observable emits other observables of its own, a situation we call nesting the observable,
// But what happens when the function you’re trying to map also returns an observable? In other words, instead of mapping a function that returns some scalar value as you’ve been doing all along, the mapped function returns another observable—known as projecting an observable onto another, or an observable of observables.

// So the return would be something like this
// Observable<Observable<Array>>

// lets imageine sendRequest returns an observable

const sendRequest = () => Observable.of(1, 2, 3)

Observable.fromEvent(document, 'click')
    .mergeMap(event => sendRequest())
    .subscribe(console.log)

// search app example
const notEmpty = input => !!input && input.trim().length > 0
const input = document.createElement('input')
input.setAttribute('id', 'search')
const ul = document.createElement('ul')
ul.setAttribute('id', 'results')
const label = document.createElement('label')
label.setAttribute('id', 'count')
document.body.appendChild(input)
document.body.appendChild(ul)
document.body.appendChild(label)

const searchBox = document.querySelector('#search') //-> <input>
const results = document.querySelector('#results') //-> <ul>
const count = document.querySelector('#count') //-> <label>
const URL = 'https://en.wikipedia.org/w/api.php?action = query & format = json & list = search & utf8 = 1 & srsearch = '

const search$ = Observable.fromEvent(searchBox, 'keyup')
    .pluck('target', 'value')
    .debounceTime(500)
    .filter(notEmpty)
    .do(term => console.log(`searching with term ${term}`))
    .map(query => URL + query)
    .mergeMap(query =>
        Observable.ajax(query)
        .pluck('response', 'query', 'search')
        .defaultIfEmpty([]))
    // .mergeMap(R.map(R.prop('title'))) // Ramda
    .subscribe(arr => {
        console.log(arr)
    })


// async example
const csv = str => str.split(/,\s*/)
const webservice = 'http://download.finance.yahoo.com/d/quotes.csv?s=$symbol&f=sa&e=.csv'

const requestQuote$ = symbol => Observable.fromPromise(
        ajax(webservice.replace(/\$symbol/, symbol)))
    .map(response => response.replace(/"/g, ''))
    .map(csv)

const twoSecond$ = Observable.interval(2000)

// You can use mergeMap() to accomplish this. You can create a function that takes any stock symbol and creates a stream that requests stock quote data every 2 seconds. You’ll call this resulting observable function fetchDataInterval$, as shown here.

const fetchDataInerval$ = symbol => twoSecond$.mergeMap(() => requestQuote$(symbol))

fetchDataInerval$('FB')
    .subscribe(([symbol, price]) => {
        console.log(`Symbol: ${symbol} and Price: ${price}`)
    })

// multiple stocks

const symbols$ = Observable.of('FB', 'CTXS', 'AAPL') //You start by lifting the stock symbols involved in your component into a stream so that you can begin to fetch their quote data. This technique of lifting or wrapping a scalar value into an observable is beneficial because you can initiate asynchronous processes involving these values. Also, you unlock the power of RxJS when involving blocks of code related to these values.

const ticks$ = symbols$.mergeMap(fetchDataInerval$) //You map an interval (every 2 seconds) to this observable, so that you cycle through the stock symbols every minute. This gives it the appearance of real time.

// At each interval, you execute AJAX calls for each stock symbol against the Yahoo web service.

ticks$.subscribe(([symbol, price]) => {
    console.log(`update DOM here`) //Finally, you map functions that strip out unnecessary company data and leave just the stock symbol and price, before emitting it to subscribers.
})

// distinctUntilChanged()
// distinctUntilChanged() belongs in the category of filtering operators and emits a sequence of distinct, contiguous elements. So the fifth element, a, is skipped because it’s the same as the previous one, and the same for the last, b. You can see this mechanism in action

const fetchDataInterval$ = symbol => twoSecond$
    .mergeMap(() => requestQuote$(symbol))
    .distinctUntilChanged(([symbol, price]) => price)
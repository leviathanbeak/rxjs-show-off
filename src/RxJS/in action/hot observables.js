import { Observable } from 'rxjs/Rx'

// A TV’s live stream is equivalent to a hot observable.

// Hot observables are those that produce events regardless of the presence of subscribers—they are active. 
// In the real world, hot observables are used to model events like clicks, mouse movement, touch, or any other events exposed via event emitters. 
// This means that, unlike the cold counterpart where each subscription triggers a new stream, 
// subscribers to hot observables tend to receive only the events that are emitted after the subscription is created

// A hot observable continues to remain lazy in the sense that without a subscriber, the events are simply emitted and ignored. 
// Only when an observer subscribes to the stream does the pipeline of operators begin to do its job and the data flow downstream.

// A key selling point for using RxJS is that it allows you to build logic independently of the type of data source you need to interact with—we called this a unifying computing model

// DEFINITION: Hot observables are those that produce events regardless of the presence of subscribers.

// COLD is when your observable creates the producer.

// HOT is when your observable closes over the producer.

// Producer object is in scope through the closure formed around the observable declaration
const producer = new Producer()

const hot$ = new Observable.ajax(observer => {
    producer.addEventListener(`some-event`, e => observer.next(e))
        // producer gets disposed of outside of Observable context
})

// Cold -> HOT

// To make a cold observables hot, you need to focus on how they emit data and how subscribers access this data. 

const sub1 = ticks$.subscribe(
    quoteDetails => updatePanel1(quoteDetails.symbol, quoteDetails.price)
);

const sub2 = ticks$.subscribe(
    quoteDetails => updatePanel2(quoteDetails.symbol, quoteDetails.price)
);

// 1 sub1 and sub2 will use their own two-second intervals, which could get out of sync, and also fetch their own copies of stock data. 

const ticker = new StockTicker('FB');
ticker.start();

const tick$ = Rx.Observable.fromEvent(ticker, 'tick',
        (symbol, price) => ({ 'symbol': symbol, 'price': price }))
    .catch(Rx.Observable.throw(new Error('Stock ticker exception')));

const sub1 = ticks$.subscribe( //#E                                 
    quoteDetails => updatePanel1(quoteDetails.symbol, quoteDetails.price)
);

const sub2 = ticks$.subscribe( //#E                                 
    quoteDetails => updatePanel2(quoteDetails.symbol, quoteDetails.price)
);


// making it easy with share()
// Once the observable in front of share() is subscribed to, it’s for all intents and purposes hot; this is known as hot-by-operator, and it’s the best way to heat up a cold observable
const source$ = Rx.Observable.interval(1000)
    .take(10)
    .do(num => {
        console.log(`Running some code with ${num}`);
    });

const shared$ = source$.share();

shared$.subscribe(createObserver('SourceA'));

shared$.subscribe(createObserver('SourceB'));
// WARNING: When dealing with observables that run immediately, this can result in only a single subscriber receiving the events.
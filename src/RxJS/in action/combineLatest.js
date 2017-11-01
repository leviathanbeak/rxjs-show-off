import { Observable } from 'rxjs/Rx'

// lifecycle methods: 
// Observable start (subscription)
// Observable stop (completion or error)
// Observable next (normal event)

Observable.range(1, 5)
    .startWith(7)
    //.subscribe(console.log)

//combineLAtest(), each emission will cause a collective emission of the latest value present in the stream
const letter$ = Observable.interval(1000)
    .map(num => String.fromCharCode(65 + num))
    .map(letter => `Source 1 -> ${letter}`)

const number$ = Observable.interval(1000)
    .map(num => `Source 2 -> ${num}`)

Observable.combineLatest(
    letter$,
    number$
).take(6).subscribe(console.log)

// WARNING: with syncrhonous data source, u have to be careful beacuse RxJS will immediately run through the events of the first source stream and combine its latest value with latest value of the combined stream instead of pairing each number with a letter

Observable.combineLatest(
    Observable.from(['a', 'b', 'c']),
    Observable.from([1, 2, 3])
).subscribe(console.log)

// combineLatest() also allows u to provide a selector function that makes the stream more conformant, so that you can avoid the direct array access
Observable.combineLatest(
    Observable.interval(1000),
    Observable.from([1, 2, 3]),
    (asyncN, three) => asyncN > three ? 'Vece' : 'Manje'
).take(10).subscribe(console.log)
import { Observable } from 'rxjs/Rx'

// map()...concatAll() -->	concatMap()	Similar to mergeMap() with the merging happening serially; in other words, each observable waits for the previous one to complete

const src1$ = Observable.of(['a', 'b'])
const src2$ = Observable.of(1, 2, 3, 4, 5)

// you create a set of simultaneous streams; this means that both streams are subscribed to at the same time and the resulting observable can output from either observable—both are active simultaneously.
Observable.merge(src1$, src2$) // Observers see data emitted from either observable

// Sequential streams, on the other hand, are streams in which the output of one stream generates a new one. In the second case, the observer won’t receive any events from the first stream; an observer will only see the results of the observable projected by mergeMap().
src1$.mergeMap(() => src2$) //Observers see only data from source2$.

const target = document.createElement('div')
target.setAttribute('id', 'dragTarget')
target.style.width = '300px'
target.style.height = '300px'
target.style.backgroundColor = 'red'
document.body.appendChild(target)

const panel = document.querySelector('#dragTarget')
const mouseDown$ = Observable.fromEvent(panel, 'mousedown')
const mouseUp$ = Observable.fromEvent(document, 'mouseup')
const mouseMove$ = Observable.fromEvent(document, 'mousemove')

//  This operator works just like mergeMap() but performs the additional logic of retaining the order of the observable sequences, instead of interleaving the events.

const drag$ = mouseDown$.concatMap(() => mouseMove$.takeUntil(mouseUp$))

drag$.subscribe(event => {
    console.log('anything')
    console.log(event)
    panel.style.left = event.clientX + 'px'
    panel.style.top = event.clientY + 'px'
})

// this one could be also implemented like this
const drag2$ = mouseDown$.map(() => mouseMove$.takeUntil(mouseUp$)).concatAll()
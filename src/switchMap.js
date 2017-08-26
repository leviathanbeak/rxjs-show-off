import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

const button = document.getElementById('button')
const input = document.getElementById('input')

function getGithubUser(username) {
    return new Promise((resolve, reject) => {
        var client = new XMLHttpRequest()
        client.open('GET', `https://api.github.com/users/${username}`, true)
        client.onreadystatechange = () => {
            if (client.readyState == 4 && client.status == 200)
                resolve(client.responseText)
        }
        client.send()
    })
}

//the wrong way
Observable.fromEvent(button, 'click')
    .subscribe(e => {
        Observable.interval(1000)
            .take(10)
            .subscribe(x => console.log(x))
    })

Observable.fromEvent(button, 'click')
    .switchMap(() => Observable.interval(1000).take(10))
    .subscribe(getSubscriber('switchMap'))

const interval$ = Observable.interval(1000).take(10)
const start$ = Observable.fromEvent(button, 'click')

start$.switchMap(() => interval$)
    .subscribe(getSubscriber('switchMap2'))

Observable.fromEvent(input, 'keyup')
    .map(e => e.target.value)
    .switchMap(v => Observable.fromPromise(getGithubUser(v)))
    .subscribe(user => {
        console.log(user)
    })
import { Observable } from 'rxjs/Rx'
import getSubscriber from './getSubscriber'

const myPromise = new Promise((resolve, reject) => {
    console.log('creating promises')
    setTimeout(() => {
        console.log('doing the promise')
        resolve('resolved')
    }, 2000)
})

Observable.fromPromise(myPromise)
    .subscribe(getSubscriber('promsie'))

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

Observable.fromPromise(getGithubUser('leviathan88'))
    .subscribe(getSubscriber('elvis'))
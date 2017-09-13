import { Observable, AsyncSubject } from 'rxjs/Rx'

function getSomething(url) {
    let subject

    return Observable.create(observer => {
        if (!subject) {
            subject = new AsyncSubject()
            Observable.ajax({ method: 'GET', url: url }).subscribe(subject)
        }
        return subject.subscribe(observer)
    })
}

const listOfUsers = getSomething('api.listofusers.ba')
listOfUsers.subscribe(list => console.log(list))

//if later u subscribe to the same thing, u will get the cached result immediately
setTimeout(() => {
    listOfUsers.subscribe(list => console.log(list))
}, 50000)
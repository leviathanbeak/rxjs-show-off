import { Observable } from 'rxjs/Rx'

let githubUrl = 'https://api.github.com/users/leviathan88'
Observable.ajax({ method: 'GET', url: githubUrl })
    .flatMap(result => Observable.of(result.response))
    .map(res => ({ name: res.name, login: res.login }))
    .subscribe(d => console.log(d))

//if we wanted something like constantly updating the UI
Observable.interval(5000)
    .flatMap(() => Observable.ajax({ method: 'GET', url: githubUrl }))
    .flatMap(result => Observable.of(result.response))
    .map(res => ({ name: res.name, login: res.login }))
    .distinct(res => res.name)
    .subscribe(d => console.log(d))

// The last operator we apply is distinct, which emits only elements that haven’t been emitted before. It takes a function that returns the property to check for equality.
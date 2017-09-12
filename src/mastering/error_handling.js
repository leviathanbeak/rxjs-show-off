import { Observable, AjaxRequest } from 'rxjs/Rx'
import {} from 'rxjs/Observable/'

function getJSON(arr) {
    return Observable.from(arr).map(str => JSON.parse(str))
}

let caught = getJSON([`{"1": 1}`, `{"1: 1}`]).catch(
    Observable.of({
        error: 'There was an error parsing JSON'
    })
)

caught.subscribe(json => console.log(json), e => console.log('ERROR', e.message))

//In the preceding code, we create a new Observable, caught, that uses the catch operator to catch errors in the original Observable. If there’s an error it will continue the sequence with an Observable that emits only one item, with an error property describing the error.

//retrying if it fails
Observable.ajax({ method: 'GET', url: 'https://api.github.com/users/leviathan88' }).retry(5).subscribe(d => console.log(d))
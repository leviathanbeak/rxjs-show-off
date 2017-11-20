import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

Observable.from([0, 1, 2], n => n * 2).subscribe(n => console.log(n))
Observable.generate(0, i => i < 3, i => i + 1, i => i).subscribe(i => console.log(i))

//ajax
function get(url) {
    return Observable.create(observer => {
        let clinet = new XMLHttpRequest()
        client.open('GET', url)

        client.onload = () => {
            if (client.status === 200) {
                observer.onNext(client.response)
                observer.onCompleted()
            } else {
                observer.onError(new Error(client.statusText))
            }
        }

        client.onerror = () => observer.onError(new Error('Uknown Error'))
        client.send()
    })
}

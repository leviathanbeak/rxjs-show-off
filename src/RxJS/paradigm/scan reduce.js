import { Observable } from 'rxjs/Rx'
import getSubscriber from '../getSubscriber'

Observable.range(1, 10).scan((acc, value) => acc + value).subscribe(getSubscriber('scan'))
import { Observable } from 'rxjs/Rx'

// Converts a higher-order Observable into a first-order Observable by waiting for the outer Observable to complete, then applying combineLatest.

const source = Observable.interval(1000).take(2)

const example = source.map(val => Observable.interval(1000).map(i => `Result ${val}: ${i}`).take(5))

example.combineAll().subscribe(console.log)

/*
  output:
  ["Result (0): 0", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 0"]
  ["Result (0): 1", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 1"]
  ["Result (0): 2", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 2"]
  ["Result (0): 3", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 3"]
  ["Result (0): 4", "Result (1): 4"]
*/
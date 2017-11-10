import { Observable } from 'rxjs/Rx'

// Schedulers control when a subscription starts and when notifications are published. 
// This abstraction allows work to run immediately or in the future without the calling code being aware of it.

// Generally speaking, a scheduler consists of three main parts:
// 1. A data structure that stores all the actions queued to be executed.
// 2. An execution context that knows where the action will be executed: timer, interval, immediately, callback, a different thread (for server-side Rx frameworks), and so on.
// 3. A virtual clock that provides a notion of time for itself. This point will become very important for testing.

it('Should schedule things in order', function() {
    let stored = [];

    let store = state => () => stored.push(state); //    1

    let scheduler = Rx.Scheduler.queue; //    2

    scheduler.schedule(store(1)); //    3
    scheduler.schedule(store(2));
    scheduler.schedule(store(3));
    scheduler.schedule(store(4));
    scheduler.schedule(store(5));

    scheduler.flush(); //    4

    expect(stored).to.deep.equal([1, 2, 3, 4, 5]); //    5
});

// 1 Temporarily stores the scheduled actions so that you can compare them to what the scheduler remits. Every time an action runs, it stores its value into the stored array.
// 2 Uses a simple scheduler that queues the actions to run
// 3 Schedules actions to run immediately (delay, the second parameter of scheduler.schedule(), defaults to 0)
// 4 Runs all the actions
// 5 Performs a deep comparison of both data structures; looks at the values contained within it
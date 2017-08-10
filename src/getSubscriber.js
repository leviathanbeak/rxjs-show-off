function getSubscriber(id) {
    return {
        next: function(x) {
            console.log(`ID: ${id} - x: ${x}`)
        },
        error: function(err) {
            console.log(`ID: ${id} - x: ${err}`)
        },
        complete: function() {
            console.log('completed')
        }
    }
}

export default getSubscriber
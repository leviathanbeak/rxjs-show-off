require('./helloCanvas.css')

//create a canvas
const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'helloCanvas')

//canvas itself has only two attributes WIDTH and HEIGHT!
// and these methods getContext(), toDataURL(), and toBlob() (could be others too)

const TEXT = `I'm Awesome!`

//get context
const context = canvas.getContext('2d')
context.font = '44px Arial'
context.strokeStyle = 'skyblue'
context.fillStyle = 'blue'

context.textAlign = 'center'
context.textBaseline = 'middle'

context.strokeText(TEXT, canvas.width / 2, canvas.height / 2)
context.fillText(TEXT, canvas.width / 2, canvas.height / 2)
document.body.appendChild(canvas)
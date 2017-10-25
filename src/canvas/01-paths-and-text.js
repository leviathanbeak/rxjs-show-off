require('./style.css')
import { Observable } from 'rxjs/Rx'

const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)


function drawLine({ color, width, cap, xstart, ystart, xend, yend }) {

    ctx.strokeStyle = color // color of the line
    ctx.lineWidth = width // thickness of the line
    ctx.lineCap = cap

    ctx.beginPath() // begin path    
    ctx.moveTo(xstart, ystart) //starting point
    ctx.lineTo(xend, yend) //end point, connects the starting point to this one (straight line)
    ctx.stroke() //stroke the given path with strokeStyle
    ctx.closePath() // end path
}

const parametrs = { color: 'black', xstart: 0, ystart: 0, xend: 500, yend: 50, width: 10, cap: 'square' }

drawLine(parametrs)

// Observable.interval(1000).subscribe(x => {
//     console.log(x)
// })
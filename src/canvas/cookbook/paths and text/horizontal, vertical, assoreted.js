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

//drawLine(parametrs)

function drawVerticalLines() {
    const o = {
        color: 'crimson',
        xstart: 130,
        ystart: 10,
        xend: 130,
        yend: 60,
        width: 2,
        cap: 'square'
    }

    for (let i = 0; i < 10; i++) {
        o.xstart += 15
        o.xend += 15
        drawLine(o)
    }
}

drawVerticalLines()

function drawHorizontalLines() {
    const o = {
        color: 'teal',
        xstart: 10,
        ystart: 10,
        xend: 100,
        yend: 10,
        width: 2,
        cap: 'square'
    }

    for (let i = 0; i < 10; i++) {
        o.ystart += 15
        o.yend += 15
        drawLine(o)
    }
}

drawHorizontalLines()

function drawAssortedLines() {
    // too stupid
}
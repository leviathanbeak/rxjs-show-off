const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

function drawRectangles() {
    ctx.strokeStyle = 'purple'
    ctx.rect(10, 10, 70, 50)
    ctx.fillStyle = 'lightgreen'
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = 'crimson'
    ctx.fillRect(50, 25, 100, 100)

    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 10
    ctx.strokeRect(100, 60, 80, 130)
}

drawRectangles()

// rect(xPos,yPos,width,height)
// fillRect(xPos,yPos,width,height)
// strokeRect(xPos,yPos,width,height)
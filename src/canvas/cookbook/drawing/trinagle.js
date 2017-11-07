const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

function drawTriangle(x, y, width, height, color) {
    ctx.beginPath()
    ctx.moveTo(x, y)

    ctx.lineTo(x + width / 2, y + height)
    ctx.lineTo(x - width / 2, y + height)

    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
}

drawTriangle(100, 20, 100, 100, 'forestgreen')
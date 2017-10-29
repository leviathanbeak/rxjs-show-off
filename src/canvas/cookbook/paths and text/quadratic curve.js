const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)


function drawQuadraticCurve(xStart, yStart, xCtrl, yCtrl, xEnd, yEnd, color, width) {
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineJoin = 'round'
    ctx.lineWidth = width

    ctx.moveTo(xStart, yStart)
    ctx.quadraticCurveTo(xCtrl, yCtrl, xEnd, yEnd)
    ctx.stroke()
    ctx.closePath()
}

drawQuadraticCurve(50, 100, 150, 30, 250, 100, '#df34ef', 7)

// drawing a rainbow
const y = canvas.height / 2
const x = canvas.width - 20
const mid = canvas.width / 2
    //rainbow - vibgyor
drawQuadraticCurve(20, y, mid, 0, x, y, "violet", 7)
drawQuadraticCurve(20, y - 10, mid, -10, x, y - 10, "indigo", 7)
drawQuadraticCurve(20, y - 20, mid, -20, x, y - 20, "blue", 7)
drawQuadraticCurve(20, y - 30, mid, -30, x, y - 30, "green", 7)
drawQuadraticCurve(20, y - 40, mid, -40, x, y - 40, "yellow", 7)
drawQuadraticCurve(20, y - 50, mid, -50, x, y - 50, "orange", 7)
drawQuadraticCurve(20, y - 60, mid, -60, x, y - 60, "red", 7)
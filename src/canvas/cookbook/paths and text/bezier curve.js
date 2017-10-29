const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

function drawBezierCurve(xStart, yStart, xCtrl1, yCtrl1, xCtrl2, yCtrl2, xEnd, yEnd, color, width) {
    ctx.strokeStyle = color
    ctx.lineWidth = width

    ctx.beginPath()
    ctx.moveTo(xStart, yStart)
    ctx.bezierCurveTo(xCtrl1, yCtrl1, xCtrl2, yCtrl2, xEnd, yEnd)
    ctx.stroke()
}

drawBezierCurve(50, 50, 100, 35, 100, 95, 180, 50, 'black', 10)
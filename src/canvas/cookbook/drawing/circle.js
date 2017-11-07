const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

function drawCircle(x, y, raduis) {
    const startAngle = 0 * (Math.PI / 180)
    const endAngle = 360 * (Math.PI / 180)

    ctx.strokeStyle = 'forestgreen'
    ctx.fillStyle = 'lightyellow'
    ctx.lineWidth = 1

    ctx.beginPath()
    ctx.arc(x, y, raduis, startAngle, endAngle, false)
    ctx.fill()
    ctx.stroke()

}

drawCircle(15, 20, 10)
const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const navigation = {
    xPos: 60,
    xctrl: 100,
    yPos: 150,
    yctrl: 80,
    xend: 140,
    yend: 150
}

const style = {
    radius: 45,
    linecolor: 'blue'
}


function drawArc1(navigation, style) {
    const { xPos, xctrl, yPos, yctrl, xend, yend } = navigation
    const { radius, linecolor } = style

    ctx.strokeStyle = linecolor
    ctx.lineWidth = 8

    ctx.beginPath()
    ctx.moveTo(xPos, yPos)
    ctx.arcTo(xctrl, yctrl, xend, yend, radius)
    ctx.stroke()
}

drawArc1(navigation, style)

function drawArc2(xPos, yPos, radius, startAngle, endAngle, linecolor, fillColor, width) {
    const _startAngle = startAngle * (Math.PI / 180)
    const _endAngle = endAngle * (Math.PI / 180)

    ctx.strokeStyle = linecolor
    ctx.fillStyle = fillColor
    ctx.lineWidth = width

    ctx.beginPath()
    ctx.arc(xPos, yPos, radius, _startAngle, _endAngle)

    ctx.fill()
    ctx.stroke()
}

drawArc2(60, 80, 40, 180, 270, 'aqua', 'yellow')
drawArc2(120, 80, 40, 270, 360, 'aqua', 'yellow')
drawArc2(220, 80, 40, 180, 360, 'aqua', 'red')
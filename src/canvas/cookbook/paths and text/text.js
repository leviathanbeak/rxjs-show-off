const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

function drawMyText(X, Y, message, align, baseline, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.font = '20pt Arial'

    ctx.textAlign = align
    ctx.textBaseline = baseline
    ctx.fillText(message, X, Y)
    ctx.closePath()
}

const X = Math.round(canvas.width / 2)
drawMyText(X, 50, 'Tomb Raider', 'center', 'top', 'blue')
drawMyText(X, 100, 'Uncharted', 'left', 'middle', 'green')
drawMyText(X, 100, 'Origins', 'right', 'bottom', 'orange')

function draw3dText(X, Y, message, align, baseline, color, depth) {
    ctx.beginPath()
    let i = 0
    ctx.fillStyle = color
    ctx.font = '20pt Arial'

    ctx.textAlign = align
    ctx.textBaseline = baseline
    ctx.fillText(message, X, Y)
    ctx.shadowColor = 'lightgrey'
    ctx.shadowBlur = 5
    while (i <= depth) {
        ctx.shadowOffsetX = depth + 1
        ctx.shadowOffsetY = depth + 2
        ctx.fillText(message, X, Y)
        i++
    }
    ctx.closePath()
}

draw3dText(X, 50, 'Tomb Raider', 'center', 'top', 'blue', 1)
draw3dText(X, 100, 'Uncharted', 'left', 'middle', 'green', 4)
draw3dText(X, 100, 'Origins', 'right', 'bottom', 'orange', 7)
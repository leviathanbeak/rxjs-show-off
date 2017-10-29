const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const navigation = {
    xstart: 50,
    xnext: 50,
    ystart: 150,
    ynext: 50
}

const style = {
    color: 'red',
    width: 2,
    jointType: 'miter'
}


function drawJoineLines(navigation, style) {
    let { xstart, xnext, ystart, ynext } = navigation
    const { color, width, jointType } = style

    ctx.beginPath()
    ctx.lineJoin = jointType
    ctx.strokeStyle = color
    ctx.lineWidth = width

    ctx.moveTo(xstart, ystart)

    for (let i = 1; i <= 20; i++) {
        ctx.lineTo(xnext, ynext)
        if (i % 2 === 1) {
            xnext += 20
        } else {
            if (ynext > navigation.ynext) {
                ynext = navigation.ynext
            } else {
                ynext += 100
            }
        }
    }

    ctx.stroke()
    ctx.closePath()

}

drawJoineLines(navigation, style)
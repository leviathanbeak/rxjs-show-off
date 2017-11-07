const canvas = document.createElement('canvas')
canvas.setAttribute('id', 'canvas')
const ctx = canvas.getContext('2d')
document.body.appendChild(canvas)

const x1 = 100
const y1 = 100
const r1 = 30

const x2 = 100
const y2 = 100
const r2 = 100

const radGrad = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2)
radGrad.addColorStop(0, 'rgb(110,120,255)')
radGrad.addColorStop(0.5, 'rgb(255,155,20)')
radGrad.addColorStop(1, 'rgb(0,255,220)')
ctx.fillStyle = radGrad
ctx.fillRect(0, 0, 50, 50)

const linGrad = ctx.createLinearGradient(220, 0, 320, 0)
linGrad.addColorStop(0, 'rgb(255,0,110)')
linGrad.addColorStop(0.5, 'rgb(0,110,255)')
linGrad.addColorStop(1, 'rgb(110,255,0)')
ctx.fillStyle = linGrad
ctx.fillRect(220, 10, 100, 100)
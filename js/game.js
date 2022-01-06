let W = window.innerWidth
let H = window.innerHeight
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let score = 0
let len = 1

class Snake {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

let color = {
  red: '#ff7675',
  blue: '#74b9ff',
  dark: '#2d3436',
  green: '#55efc4',
  yellow: '#ffeaa7',
  gray: '#dfe6e9',
}

let background = () => {
  ctx.fillStyle = color.dark
  ctx.fillRect(0, 0, W, H)
}

let clean = () => {
  ctx.clearRect(0, 0, W, H)
}

let main = () => {
  ctx.canvas.width = W
  ctx.canvas.height = H

  background()
  interface(score, len)
}

let interface = (Score, Len) => {
  //score
  ctx.fillStyle = color.gray
  ctx.font = '10vh Arial'
  ctx.textBaseline = 'top'
  ctx.fillText('Score: ' + Score, 0 + 10, 0)

  //len

  ctx.textAlign = 'end'
  ctx.fillText('Len: ' + Len, W - 10, 0)
}

main()

let MainLoop = setInterval(() => {
  // console.log('1 tick')
}, 800)

// event

window.addEventListener(
  'resize',
  function (event) {
    // console.log('resize')
    W = window.innerWidth
    H = window.innerHeight
    main()
  },
  true
)

document.addEventListener('keydown', (e) => {
  if (e.key.toLocaleLowerCase() === 'w') {
    // console.log('w')
  }
})

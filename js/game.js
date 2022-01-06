let W = window.innerWidth
let H = window.innerHeight
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let score = 0
let len = 1

class Snakes {
  static direction = ''

  constructor(x, y) {
    this.x = x
    this.y = y
  }

  Draw() {
    ctx.fillStyle = color.red
    ctx.fillRect(this.x, this.y, 32, 32)
  }
  SetPosition() {
    if (this.direction === 'up') {
      this.y -= 32
    }
    if (this.direction === 'down') {
      this.y += 32
    }
    if (this.direction === 'left') {
      this.x -= 32
    }
    if (this.direction === 'right') {
      this.x += 32
    }
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

let Snake = new Snakes(W / 2, H / 2)

let main = () => {
  ctx.canvas.width = W
  ctx.canvas.height = H

  Draw()
}

let Draw = () => {
  clean()
  background()
  Snake.SetPosition()
  Snake.Draw()
  interface(score, len)
}

let interface = (Score, Len) => {
  //score
  ctx.fillStyle = color.gray
  ctx.font = '5vh Arial'
  ctx.textBaseline = 'top'
  ctx.textAlign = 'start'

  ctx.fillText('Score: ' + Score, 0 + 10, 0 + 10)

  //len

  ctx.textAlign = 'end'
  ctx.fillText('Len: ' + Len, W - 10, 0 + 10)
}

main()

let MainLoop = setInterval(() => {
  Draw()
}, 800)

// event

window.addEventListener(
  'resize',
  function (event) {
    // console.log('resize')
    W = window.innerWidth
    H = window.innerHeight
    Draw()
  },
  true
)

document.addEventListener('keydown', (e) => {
  if (e.key.toLocaleLowerCase() === 'w') {
    Snake.direction = 'up'
  }
  if (e.key.toLocaleLowerCase() === 's') {
    Snake.direction = 'down'
  }
  if (e.key.toLocaleLowerCase() === 'a') {
    Snake.direction = 'left'
  }
  if (e.key.toLocaleLowerCase() === 'd') {
    Snake.direction = 'right'
  }
})

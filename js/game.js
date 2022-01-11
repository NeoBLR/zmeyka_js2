let W = document.body.clientWidth
let H = document.body.clientHeight
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let score = 0
let len = 1
let version = 'govna'
let speed = 2

class Vector {
  constructor(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
  }
  Draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, 32, 32)
  }
  GetPosition() {
    return {
      x: this.x,
      y: this.y,
    }
  }
}

class Apples extends Vector {}

class Tail extends Vector {}

class Snakes extends Vector {
  static direction = ''
  static Tails = []

  SetPosition() {
    if (this.direction === 'up') {
      this.y -= speed
    }
    if (this.direction === 'down') {
      this.y += speed
    }
    if (this.direction === 'left') {
      this.x -= speed
    }
    if (this.direction === 'right') {
      this.x += speed
    }

    // teleport to inverse

    if (this.y / 32 <= -1) {
      this.y = Math.floor(document.body.clientHeight / 32 - 1) * 32
    }

    if (this.x / 32 <= -1) {
      this.x = Math.floor(document.body.clientWidth / 32 - 1) * 32
    }

    if (this.y / 32 >= Math.floor(document.body.clientHeight / 32 + 1)) {
      this.y = 0
    }

    if (this.x / 32 >= Math.floor(document.body.clientWidth / 32)) {
      this.x = 0
    }
    console.log()
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

let Snake = new Snakes(32 * 14, 32 * 14, color.red)
let Apple = new Apples(10, 10, color.green)

let main = () => {
  Move()
}

let DrawOnResize = () => {
  ctx.canvas.width = W
  ctx.canvas.height = H

  clean()
  background()

  Apple.Draw()

  Snake.Draw()

  interface(score, len)
}

let Move = () => {
  ctx.canvas.width = W
  ctx.canvas.height = H

  clean()
  background()

  Apple.Draw()

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

  ctx.font = '3vh Arial'

  //
  ctx.textAlign = 'start'
  ctx.fillText('X: ' + Math.round(Snake.x / 32), 0 + 10, 50 + 10)

  //

  ctx.textAlign = 'end'
  ctx.fillText('Y: ' + Math.round(Snake.y / 32), W - 10, 50 + 10)

  //
  ctx.textAlign = 'start'
  ctx.fillText(
    'maxX: ' + Math.floor(document.body.clientWidth / 32),
    0 + 10,
    100 + 10
  )

  //

  ctx.textAlign = 'end'
  ctx.fillText(
    'maxY: ' + Math.floor(document.body.clientHeight / 32),
    W - 10,
    100 + 10
  )

  //

  ctx.textAlign = 'start'
  ctx.textBaseline = 'bottom'

  ctx.fillText('Version: ' + version, 10, H)
}

main()

let MainLoop = setInterval(() => {
  Move()
}, 1000 / 60)

// event

window.addEventListener('orientationchange', function (event) {
  let ori = window.orientation
  W =
    ori == 90 || ori == -90
      ? document.body.clientHeight
      : document.body.clientWidth
  H =
    ori == 90 || ori == -90
      ? document.body.clientWidth
      : document.body.clientHeight

  // Draw()
  DrawOnResize()
  console.log('orientationchange')
})

window.addEventListener(
  'resize',
  function (event) {
    // console.log('resize')
    W = window.innerWidth
    H = window.innerHeight
    DrawOnResize()
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
  if (e.key.toLocaleLowerCase() === 'f') {
    canvas.requestFullscreen()
  }
})

//swipe not my code

document.addEventListener('touchstart', handleTouchStart, false)
document.addEventListener('touchmove', handleTouchMove, false)

var xDown = null
var yDown = null

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ) // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return
  }

  let xUp = evt.touches[0].clientX
  let yUp = evt.touches[0].clientY

  let xDiff = xDown - xUp
  let yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      Snake.direction = 'left'
    } else {
      /* left swipe */
      Snake.direction = 'right'
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
      Snake.direction = 'up'
    } else {
      /* up swipe */
      Snake.direction = 'down'
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}

//swipe not my code

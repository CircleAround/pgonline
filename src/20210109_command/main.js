class Invoker {
  constructor() {
    this.commands = []
  }

  addCommand(command) {
    this.commands.push(command)
    console.log(this.commands)
  }

  undo() {
    if (this.commands.length === 0) return
    const command = this.commands.pop()
    command.undo()
    console.log(this.commands)
  }
}

class SizeUpCommand {
  constructor(canvas) {
    this.canvas = canvas
  }

  execute() {
    this.canvas.setWidth(this.canvas.width * 2)
    this.canvas.setHeight(this.canvas.height * 2)
  }

  undo() {
    this.canvas.setWidth(this.canvas.width / 2)
    this.canvas.setHeight(this.canvas.height / 2)
  }
}

class SizeDownCommand {
  constructor(canvas) {
    this.canvas = canvas
  }

  execute() {
    this.canvas.setWidth(this.canvas.width / 2)
    this.canvas.setHeight(this.canvas.height / 2)
  }

  undo() {
    this.canvas.setWidth(this.canvas.width * 2)
    this.canvas.setHeight(this.canvas.height * 2)
  }
}

class PaintRedCommand {
  constructor(canvas) {
    this.canvas = canvas
    this.prevColor = this.canvas.bgColor
  }

  execute() {
    this.canvas.setBgColor("red")
  }

  undo() {
    this.canvas.setBgColor(this.prevColor)
  }
}

class PaintBlueCommand {
  constructor(canvas) {
    this.canvas = canvas
    this.prevColor = this.canvas.bgColor
  }

  execute() {
    this.canvas.setBgColor("blue")
  }

  undo() {
    this.canvas.setBgColor(this.prevColor)
  }
}

class Canvas {
  constructor() {
    this.bgColor = 'gray'
    this.width = 300
    this.height = 150
  }

  setWidth(width) {
    this.width = width
  }

  setHeight(height) {
    this.height = height
  }

  setBgColor(color) {
    this.bgColor = color
  }
}

class CanvasDrawer {
  constructor(rootElm) {
    this.rootElm = rootElm
    this.invoker = new Invoker()
    this.canvas = new Canvas()
    this.init()
  }

  init() {
    this.bgRedBtnElm = this.rootElm.querySelector('.bgRedBtn')
    this.bgBlueBtnElm = this.rootElm.querySelector('.bgBlueBtn')
    this.sizeDownBtnElm = this.rootElm.querySelector('.sizeDownBtn')
    this.sizeUpBtnElm = this.rootElm.querySelector('.sizeUpBtn')
    this.backBtnElm = this.rootElm.querySelector('.backBtn')
    this.handleListener()
    this.displayCanvas()
  }

  handleListener() {
    this.bgRedBtnElm.addEventListener('click', () => {
      const command = new PaintRedCommand(this.canvas)
      this.invoker.addCommand(command)
      command.execute()
      this.displayCanvas()
    })

    this.bgBlueBtnElm.addEventListener('click', () => {
      const command = new PaintBlueCommand(this.canvas)
      this.invoker.addCommand(command)
      command.execute()
      this.displayCanvas()
    })

    this.sizeUpBtnElm.addEventListener('click', () => {
      const command = new SizeUpCommand(this.canvas)
      this.invoker.addCommand(command)
      command.execute()
      this.displayCanvas()
    })

    this.sizeDownBtnElm.addEventListener('click', () => {
      const command = new SizeDownCommand(this.canvas)
      this.invoker.addCommand(command)
      command.execute()
      this.displayCanvas()
    })

    this.backBtnElm.addEventListener('click', () => {
      this.invoker.undo()
      this.displayCanvas()
    })
  }

  displayCanvas() {
    const canvasElm = document.createElement('div')
    canvasElm.style.backgroundColor = this.canvas.bgColor
    canvasElm.style.width = `${this.canvas.width}px`
    canvasElm.style.height = `${this.canvas.height}px`
    const canvasWrapElm = this.rootElm.querySelector('.canvasWrap')
    canvasWrapElm.innerHTML = ''
    canvasWrapElm.appendChild(canvasElm)
  }
}

new CanvasDrawer(document.getElementById('app'))
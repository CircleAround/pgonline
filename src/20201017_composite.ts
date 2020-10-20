interface Component {
  name: string
  print(num: number): void
  add(component: Component): void
}

abstract class AbstractComponent implements Component {
  name: string

  getName() {
    return this.name
  }

  createIndent(num: number) {
    return " ".repeat(num)
  }

  add(component: Component) {
    throw new Error("add is not defined")
  }

  abstract print(num: number): void 
}

class Category extends AbstractComponent {
  components: Array<Component>
  name: string

  constructor(name) {
    super()
    this.name = name
    this.components = []
  }

  print(index: number = 0) {
    const indent = this.createIndent(index)
    console.log(`${indent}# ${this.getName()}`)
    index++
    this.components.forEach((component) => {
      component.print(index)
    })
  }

  add(component: Component) {
    this.components.push(component)
  }
}

class Shop extends AbstractComponent {
  name: string

  constructor(name) {
    super()
    this.name = name
  }

  print(index: number = 0) {
    const indent =  this.createIndent(index)
    console.log(`${indent}## ${this.getName()}`)
  }
}

const rootCtegory = new　Category('フレンチ')
const childCategory1 = new　Category('レストラン')
const childCategory2 = new　Category('ビストロ')
const shop1 = new Shop('ショップ1')
const shop2 = new Shop('ショップ2')
const shop3 = new Shop('ショップ3')
const shop4 = new Shop('ショップ4')
const shop5 = new Shop('ショップ5')
const shop6 = new Shop('ショップ6')

rootCtegory.add(shop1)
rootCtegory.add(shop2)
rootCtegory.add(shop3)
rootCtegory.add(childCategory1)
childCategory1.add(shop4)
childCategory1.add(shop5)
rootCtegory.add(childCategory2)
childCategory2.add(shop6)

rootCtegory.print()
console.log('======')
shop1.print()
console.log('======')
childCategory1.print()
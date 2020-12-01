interface Item {
  name: string,
  price: number
}

class UserCart {
  private static instance: UserCart
  private constructor() {}
  private items: Item[]

  static getInstance() {
    if(!UserCart.instance) {
      UserCart.instance = new UserCart()
      UserCart.instance.reset()
    }
    return UserCart.instance
  }

  add(item: Item) {
    console.log(`${item.name}がカートに追加されました`)
    this.items.push(item)
  }

  reset() {
    this.items = []
  }

  getItems() {
    return this.items
  }

  isAdded(itemName: string) {
    const result = this.getItems().find(item => item.name === itemName )
    return result !== undefined
  }

  printItems() {
    console.log('カート -----------')
    if (this.items.length === 0) {
      console.log('カートに商品がありません')
      return
    }
    this.items.forEach((item)=>{
      const printStr = `商品名:${item.name}, 価格:${item.price}`
      console.log(printStr)
    })
  }

  calc() {
    return this.getItems().map((item)=>item.price).reduce((prevPrice, currentPrice)=>prevPrice + currentPrice, 0)
  }
}

class ItemList {
  private data: Item[]

  constructor() {
    this.initData()
  }

  private initData() {
    this.data = [
      { name: 'hoge', price: 3000 },
      { name: 'fuge', price: 5000 },
      { name: 'hoga', price: 2500 },
    ]
  }

  findBy(name: string) {
    return this.data.find(item => item.name === name)
  }

  getData() {
    return this.data
  }

}

class Purchase {
  private cart: UserCart

  constructor() {
    this.cart = UserCart.getInstance()
  }

  payment() {
    console.log('商品を購入しました')
    this.cart.reset()
  }

  printTotalPrice() {
    let totalPrice = 0
    totalPrice = this.cart.calc() * 1.1
    console.log(`購入商品の合計額は${totalPrice}円です`)
  }
}

const displayItemList = (itemList) => {
  console.log('商品リスト -----------')
  itemList.forEach((item)=>{
    let printStr = `商品名:${item.name}, 価格:${item.price}`
    if (UserCart.getInstance().isAdded(item.name)) printStr += '(カート追加済み)'
    console.log(printStr)
  })
}

const purchase = new Purchase()
const itemList = new ItemList()
const userCart = UserCart.getInstance()

displayItemList(itemList.getData())
console.log(userCart.printItems())
userCart.add(itemList.findBy('hoge'))
console.log(userCart.printItems())
userCart.add(itemList.findBy('fuge'))
console.log(userCart.printItems())
displayItemList(itemList.getData())
purchase.printTotalPrice()
purchase.payment()
console.log(userCart.printItems())
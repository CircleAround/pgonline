class Profile {
  constructor(data) {
    this.name = data.name
    this.age = data.age
    this.text = data.text
  }

  printStr() {
    console.log(`name: ${this.name}, age: ${this.age}, text: ${this.text}`)
  }
}

const profiles = [
  {name: '一郎', age: 20, text: 'hogefuge'},
  {name: '二郎', age: 25, text: 'hogefuge'},
  {name: '三郎', age: 30, text: 'hogefuge'}
]

profiles.forEach((data) => {
  const profile = new Profile(data)
  profile.printStr()
})
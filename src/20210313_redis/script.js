class Profile {
  constructor(profile) {
    this.name = profile.name
    this.age = profile.age
    this.text = profile.text
  }

  printStr() {
    console.log(`name: ${this.name}, age: ${this.age}, text: ${this.text}`)
  }
}

const data = [
  {name: '太郎', age: 12, text: 'プロフィール1'},
  {name: '二郎', age: 15, text: 'プロフィール2'},
  {name: '三郎', age: 20, text: 'プロフィール3'},
]

profiles.forEach((datum) => {
  const profile = new Profile(datum)
  profile.printStr()
})
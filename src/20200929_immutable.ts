// Mutableなクラス
class MutableItem {
  private name:string
  private labelLength:number
  
  constructor(name: string, labelLength: number = 5) {
    this.name = name
    this.labelLength = labelLength
  }

  getName():string {
    return this.name
  }

  setName(name: string) {
    this.name = name
  }

  getLabelLength():number {
    return this.labelLength
  }

  setLabelLength(length: number) {
    this.labelLength = length
  }

  // ラベルが印刷の都合で以下の仕様だとします
  // - length文字ごとの配列で取れないといけない
  // - 最低2行は無ければいけない。足りなければ最初が空白文字行
  generateLabel():string[] {
    const length = this.labelLength
    if(this.name.length > length) {
      const label = []
      for(let i = 0; i < this.name.length; i += length) {
        label.push(this.name.substr(i, length))
      }
      return label
    } else {
      return ['', this.name]
    }
  }
}

// Immutableなクラス
class ImmutableItem {
  private name:string
  
  constructor(name: string) {
    this.name = name
  }

  getName():string {
    return this.name
  }

  // ラベルが印刷の都合で以下の仕様だとします
  // - length文字ごとの配列で取れないといけない
  // - 最低2行は無ければいけない。足りなければ最初が空白文字行
  generateLabel(length:number = 5):string[] {
    if(this.name.length > length) {
      const label = []
      for(let i = 0; i < this.name.length; i += length) {
        label.push(this.name.substr(i, length))
      }
      return label
    } else {
      return ['', this.name]
    }
  }
}

{
  console.log('# MutableItem')

  const lemonade = new MutableItem('レモネード')
  console.log(lemonade.getName())
  console.log(lemonade.generateLabel())
  
  lemonade.setName('レモネードプラス')
  console.log(lemonade.getName())
  console.log(lemonade.generateLabel())

  console.log('setLabelLength(3)')
  lemonade.setLabelLength(3)
  console.log(lemonade.generateLabel())
}

{
  console.log('\n# ImmutableItem')

  const lemonade = new ImmutableItem('レモネード')
  console.log(lemonade.getName())
  console.log(lemonade.generateLabel(5))

  const lemonadePlus = new ImmutableItem('レモネードプラス')
  console.log(lemonadePlus.getName())
  console.log(lemonadePlus.generateLabel(5))
}

// これは...？
class UnfortunateItem {
  private labels:string[]

  constructor(labels:string[]) {
    this.labels = labels
  }

  getLabels() {
    return this.labels
  }
}

{
  console.log('\n# UnfortunateItem')
  
  const labels = ['レモネード', 'プラス']
  const item = new UnfortunateItem(labels)
  console.log(item.getLabels())

  labels.push('アルファ！')

  console.log(item.getLabels()) // !!
}

{
  console.log('\n# MutableItem')
  let name = 'レモネード'
  const lemonade = new MutableItem(name)
  console.log(lemonade.getName())

  name = 'コークハイ'
  console.log(lemonade.getName())
}

/*
# Immutableの特徴

○ クラスがシンプルになる
- クラス単体のテストがやりやすくなる。内部条件を持たないのでIN-OUTを一対に考えられる
- バグの原因が絞りやすい。意図しない値が返ってくる場合には生成した時点でおかしい

○ スレッドセーフ
- マルチスレッドのプログラミングでバグを生みにくい
- データの変更を阻止するコードが不要になる

○ 参照を共有しやすい
- 意図しない原因で変更される可能性が無いので複数のオブジェクトで共有しても問題が起こりにくい

× 変更時にはインスタンスの生成を伴う
変更したい場合には新しいインスタンスを作成するので、変更が多い場合には生成のコストを考える必要がある
（ですが、最近の環境でインスタンス生成のコストが大きな問題になる事はかなり減っていると思います）

大抵はメリットがデメリットを上回るはずです
*/

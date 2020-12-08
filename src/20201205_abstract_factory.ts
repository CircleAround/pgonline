let env = 'test'

interface CustomerList {
  getAll(),
  fetch(),
  data
}

interface CustomerItem {
  name: string,
  gender: string
}

class CustomerTable implements CustomerList {
  data: CustomerItem[]

  constructor() {
    this.data = this.fetch()
  }

  getAll() {
    console.log(this.data)
    return this.data
  }

  fetch() {
    // 本来はAPI通信で取得してくる想定
    return [
      {name: "田中一郎", gender: "male"},
      {name: "鈴木二郎", gender: "male"},
      {name: "山田花子", gender: "female"},
      {name: "太田武", gender: "male"},
      {name: "山岡涼子", gender: "female"}
    ]
  }
}

class TestCustomerTable implements CustomerList {
  data: CustomerItem[]
  customer: CustomerList
  
  constructor() {
    this.data = this.fetch()
  }

  getAll() {
    console.log('getAllのテスト実行')
    return this.data
  }

  fetch() {
    // 本来はテスト用のファイルロード等から取得してくる想定
    return [
      {"name": "テスト一郎", gender: "male"},
      {"name": "テスト二郎", gender: "male"},
      {"name": "テスト花子", gender: "female"}
    ]
  }
}

interface Serializer {
  serialize
}

class JsonSerializer implements Serializer {
  serialize(data) { 
    return JSON.stringify(data)
  }
}

class TestJsonSerializer implements Serializer {
  serialize(data) {
    console.log('serializeのテスト実行')
    return JSON.stringify(data)
  }
}

interface CustomerListAbstractFactory {
  createCustomerTable()
  createSerializer()
}

class CustomerTableFactory implements CustomerListAbstractFactory {
  createCustomerTable() {
    return new CustomerTable()
  }

  createSerializer() {
    return new JsonSerializer()
  }
}

class TestCustomerTableFactory implements CustomerListAbstractFactory {
  createCustomerTable() {
    return new TestCustomerTable()
  }

  createSerializer() {
    return new TestJsonSerializer()
  }
}

let factory
if (env !== 'test') {
  factory = new CustomerTableFactory()
} else {
  factory = new TestCustomerTableFactory()
}

const customerTable = factory.createCustomerTable()
const result = customerTable.getAll()
const seriarizer = factory.createSerializer()
console.log(seriarizer.serialize(result))

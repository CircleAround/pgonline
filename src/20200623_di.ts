interface Client {
  connect(products);
}

class TestClient implements Client {
  connect(products) {
    console.log('テスト購入サーバーへ接続しました', products);
    // テスト用情報を返す
    return { result: 'OK' }
  }
}

class ProductionClient implements Client {
  connect(products) {
    console.log('本番購入サーバーへ接続しました', products);
    // 本番用サーバーに通信して情報を保存したりする
    // 本当はもっと複雑
    return { result: 'OK' }
  }
}

class PurchaseProcess {
  private client: Client
  constructor(client:Client) {
    this.client = client;
  }

  perform(products) {
    return this.client.connect(products);
  }
}

// ---------------------------------------------------

const process = new PurchaseProcess(new TestClient());

{
  console.log('--- 一つ購入 ---');
  const products = ['天然水'];
  const result = process.perform(products);
  console.log(result);
}

{
  console.log('--- 複数購入 ---');
  const products = ['コーラ', 'オレンジ', 'ソーダ水'];
  const result = process.perform(products);
  console.log(result);
}


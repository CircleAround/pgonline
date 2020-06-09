// 抽象クラスの基底クラス
abstract class TableCreator {
  // ここから...
  private list: Array<any>

  constructor(list) {
    this.list = list
  }

  // 本当はDBから取ってくるとか
  protected getList(): Array<any> { 
    return this.list;
  }
  // ...ここまで は共通化してしまいたい

  abstract create(): string; // この中身は継承したクラスで作ります。
}

class CsvTableCreator extends TableCreator {
  create(): string {
    const list = this.getList();
    const header = "名前, 得点\n"
    return header + list.map((item) => {
      return `${item.name},${item.score}`;
    }).join('\n');
  }
}

class HtmlTableCreator extends TableCreator {
  create(): string {
    const list = this.getList();
    const header = "<table>\n<tr><th>名前</th><th>得点</th></tr>\n"
    const footer = '\n</table>'
    return header + list.map((item) => {
      return `<tr><td>${item.name}</td><td>${item.score}</td></tr>`;
    }).join('\n') + footer;
  }
}

const items = [
  { name: '佐藤', score: 45 },
  { name: '小笠原', score: 67 },
  { name: '田中', score: 89 }
];

{
  // CSVで情報を出力できる
  const tableCreator = new CsvTableCreator(items);
  console.log('\n-- CSVで出力します -----------------')
  console.log(tableCreator.create());
}

{
  // HTMLのTableで情報を出力できる
  const tableCreator = new HtmlTableCreator(items);
  console.log('\n-- HTMLのテーブルでで出力します  -----------------')
  console.log(tableCreator.create());
}

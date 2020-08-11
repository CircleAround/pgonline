interface Arranger {
  arrange(json):string
}

// 継承
abstract class AbstractArranger implements Arranger {
  public arrange(json):string {
    return json.map((book) => { return this.format(book) }).join(this.delimiter())
  }

  protected abstract format(book)

  protected delimiter() {
    return "\n"
  }
}

class SimpleJsonArrangerExt extends AbstractArranger {
  protected format(book):string {
    return `${book.title}(${book.author})`;
  }
}

// コンポジション
interface BookFormatter {
  format(book):string
}

class SimpleBookFormatter implements BookFormatter {
  format(book):string {
    return `${book.title}(${book.author})`;
  }
}

class JsonArranger implements Arranger {
  private formatter: BookFormatter

  public constructor(formatter: BookFormatter) {
    this.formatter = formatter;
  }

  public arrange(json):string {
    return json.map((book) => { return this.formatter.format(book) }).join("\n")
  }
}

// --- 動作確認 ------------------------------------

const books = [
  { title: '坊ちゃん', author: '夏目漱石' },
  { title: '吾輩は猫である', author: '夏目漱石' },
  { title: '友情', author: '武者小路実篤' },
]

{
  console.log('### 継承版 ###') 
  const arranger:Arranger = new SimpleJsonArrangerExt()
  console.log(arranger.arrange(books))
}

console.log('---');

{
  console.log('### コンポジション版 ###')
  const arranger:Arranger = new JsonArranger(new SimpleBookFormatter())
  console.log(arranger.arrange(books))
}

/*
[クラスの数]
★継承 < コンポジション

[構造の把握しやすさ]
★継承 < コンポジション

[クラスを実装する上での影響範囲の見えやすさ]
継承 < ★コンポジション

[柔軟性]
継承 < ★コンポジション
*/

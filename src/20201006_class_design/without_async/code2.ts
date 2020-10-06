{
  interface TotalResult {
    memberCount: number;
    scoreAverage: number;
    records: TestRecord[];
  }

  interface TestRecord {
    name: string;
    score: number;
  }

  // 読み込んでくるインターフェース
  interface RecordReader {
    read(): TestRecord[]
  }

  // 各Readerの詳細は知らなくて良くなったので
  // 今後新しいReaderが増えてもこのクラスは変更しなくていい。
  class ScoreCalculator {
    private recordReaders: RecordReader[] = []

    addReader(recordReader: RecordReader) {
      this.recordReaders.push(recordReader)
    }

    calc() {
      const records: TestRecord[] = []

      // 各Readerの為にそれぞれ書いていた処理はここからはなくなり、
      // 同じ概念のものを一度に処理できるようになりました。
      // （Promise.allはもし良くわからなければ無視しても大丈夫です。
      // サンプルが通信やファイル読み込み前提なので必要になります。
      // 興味あったら調べてみてください）
      //
      // 抽象度が高まって変更に強くなったので嬉しい。
      // だけど、少しわかりにくくなったと感じる人もいるはずです
      // 柔軟性とわかりやすさがトレードオフになることはそこそこあります。
      this.recordReaders.forEach((recordReader) => {
        const result = recordReader.read()
        result.forEach((result) => {
          records.push(result)
        })
      })

      // recordsの内容をもとに、必要な各種計算をしています
      const memberCount = records.length
      const sumScore = records.map((record) => { return record.score })
        .reduce((sum, current) => { return sum + current })
      const scoreAverage = sumScore / memberCount

      return {
        memberCount,
        records,
        scoreAverage
      }
    }
  }

  // implements RecordReader
  class JsonReader implements RecordReader {
    read() {
      // 決まったWEBサイトへ通信などしていると思ってください

      const ret = {
        results: [
          { name: '鈴木', score: 65 },
          { name: '田中', score: 70 }
        ]
      }
      return ret.results
    }
  }

  // 新しくAdapterを作成
  // もしもCsvReaderに手を加えられるなら直すのもあり
  class CsvReaderAdapter implements RecordReader {
    private path: string
    private csvReader: CsvReader

    constructor(path: string, csvReader: CsvReader) {
      this.path = path
      this.csvReader = csvReader
    }

    read() {
      const results = this.csvReader.readCsv(this.path)
      return results.map((result) => {
        return {
          name: result[0] as string,
          score: result[1] as number
        }
      })

    }
  }

  class CsvReader {
    readCsv(path) {
      // ファイル読み込みなどしていると思ってください

      if (path == 'file1-1.csv') {
        return [
          ['佐藤', 74],
          ['武藤', 56],
          ['加藤', 75]
        ]
      }

      if (path == 'file1-2.csv') {
        return [
          ['徳川', 74],
          ['豊臣', 56],
        ]
      }

      // ファイルが見つからなかった例外の代わり
      throw new Error(`unexpected path: ${path}`)
    }
  }

  function sample() {
    // ScoreCalculatorが読み込みの詳細から切り離されたので、外から与えてあげる
    // コンストラクタで配列で渡せばImmutableですが、ここではaddReaderで後から追加する
    // 方法にしています。
    const calculator = new ScoreCalculator()
    calculator.addReader(new JsonReader())

    // csvReaderはImmutableなクラスなのでいくつも作らずに一つだけにして
    // Adapter内で共有させても問題は発生しません。CsvReaderの初期化が遅いなどの場合にはこういう感じが良いでしょう。
    const csvReader = new CsvReader()
    calculator.addReader(new CsvReaderAdapter('file1-1.csv', csvReader))
    calculator.addReader(new CsvReaderAdapter('file1-2.csv', csvReader))

    const totalResult = calculator.calc()
    console.log(totalResult)
  }

  sample()
}

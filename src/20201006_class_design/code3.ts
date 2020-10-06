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

  interface RecordReader {
    read(records: TestRecord[]) // 外からrecordsが渡されるようにしてここに追加する仕様に変更します
  }

  class ScoreCalculator {
    private recordReader: RecordReader

    constructor(recordReader: RecordReader) {
      this.recordReader = recordReader
    }

    async calc() {
      const records: TestRecord[] = []
      this.recordReader.read(records)

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

  // Compositeパターンで複数のRecordReaderを格納して自分もRecordReaderとして振舞うクラス
  class CompositeRecordReader {
    private recordReaders: RecordReader[] = []

    addReader(recordReader: RecordReader) {
      this.recordReaders.push(recordReader)
    }

    async read(records: TestRecord[]) {
      await Promise.all(this.recordReaders.map(async (recordReader) => {
        await recordReader.read(records)
      }))
    }
  }

  class JsonReader implements RecordReader {
    async read(records: TestRecord[]) {
      // 決まったWEBサイトへ通信などしていると思ってください

      const ret = {
        results: [
          { name: '鈴木', score: 65 },
          { name: '田中', score: 70 }
        ]
      }

      ret.results.forEach((result) => {
        records.push(result)
      })
    }
  }

  class CsvReaderAdapter implements RecordReader {
    private path: string
    private csvReader: CsvReader

    constructor(path: string, csvReader: CsvReader) {
      this.path = path
      this.csvReader = csvReader
    }

    async read(records: TestRecord[]) {
      const results = await this.csvReader.readCsv(this.path)
      return results.map((result) => {
        records.push({
          name: result[0] as string,
          score: result[1] as number
        })
      })
    }
  }

  class CsvReader {
    async readCsv(path) {
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

  // 動作確認テストのためのコード
  {
    class DummyScoreReader implements RecordReader {
      read(records: TestRecord[]) {
        // 例えば10000件とか雑に読ませても良いし、適切なダミー結果を作っても良い
        for (let i = 0; i < 10000; ++i) {
          records.push({ name: `ダミー${i}`, score: 55 })
        }
      }
    }

    class TestScoreCalculatorFactory {
      create(): ScoreCalculator {
        return new ScoreCalculator(new DummyScoreReader())
      }
    }

    // こちらはテスト時の動き（テストライブラリを使うのが本当は良いですが、イメージがわかれば良いかと）
    async function test() {
      const calculator = new TestScoreCalculatorFactory().create()
      const totalResult = await calculator.calc()

      console.log(totalResult)
      console.assert(10000 == totalResult.memberCount, '総和は10000のはずです！')
      console.assert(55 == totalResult.scoreAverage, '平均55のはずです！')
    }

    test()
  }

  // 本番稼働のためのコード
  {
    class ProdScoreCalculatorFactory {
      create(): ScoreCalculator {
        // 例えばこの中身の処理の元データが設定ファイルなどから読まれるように
        // 作るなどするとさらに柔軟なシステムにできます。
        // DIコンテナから作成されるようにする仕様もアリかもしれませんね。
        // 今回はここまでにします。
        const recordReader = new CompositeRecordReader()
        recordReader.addReader(new JsonReader())

        const csvReader = new CsvReader()
        recordReader.addReader(new CsvReaderAdapter('file1-1.csv', csvReader))
        recordReader.addReader(new CsvReaderAdapter('file1-2.csv', csvReader))

        const calculator = new ScoreCalculator(recordReader)
        return calculator
      }
    }

    // こちらは本番で動かす想定の動き
    async function sample() {
      const calculator = new ProdScoreCalculatorFactory().create()
      const totalResult = await calculator.calc()
      console.log(totalResult)
    }

    sample()
  }
}

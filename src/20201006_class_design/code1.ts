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

  class ScoreCalculator {
    private jsonReader: JsonReader
    private csvReader: CsvReader

    constructor() {
      this.jsonReader = new JsonReader()
      this.csvReader = new CsvReader()
    }

    async calc() {
      const records: TestRecord[] = []
      const jsonResult = await this.jsonReader.readJson()
      jsonResult.forEach((result) => {
        records.push(result)
      })

      const csvResult1 = await this.csvReader.readCsv('file1-1.csv')
      csvResult1.forEach((result) => {
        records.push({
          name: result[0] as string,
          score: result[1] as number
        })
      })

      const csvResult2 = await this.csvReader.readCsv('file1-2.csv')
      csvResult2.forEach((result) => {
        records.push({
          name: result[0] as string,
          score: result[1] as number
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


  class JsonReader {
    async readJson() {
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

  async function sample() {
    const calculator = new ScoreCalculator()
    const totalResult = await calculator.calc()
    console.log(totalResult)
  }

  sample()
}
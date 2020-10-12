interface BookShelf {
  books(): [Book]
}

interface Book {
  title: string
  author: string
}

interface BookReader {
  read(): Book[]
}

class BookShelf implements BookShelf {
  reader: BookReader

  constructor(reader: BookReader) {
    this.reader = reader
  }

  books() {
    return this.reader.read()
  }

  printBooks() {
    console.log('-----------')
    this.books().forEach((book) => {
      console.log(`${book.title} / 著者:${book.author}`)
    })
  }
}

class JsonBookReader implements BookReader {
  read() {
    return [
      {"title": "坊っちゃん", "author": "夏目漱石"},
      {"title": "人間失格", "author": "太宰治"},
      {"title": "走れメロス", "author": "太宰治"}
    ]
  }
}

class CsvBookReader {
  readCsv() {
    return [
      ['夏目漱石', '坊っちゃん'],
      ['太宰治', '人間失格'],
      ['太宰治', '走れメロス']
    ]
  }
}

class CsvBookReaderAdapter implements BookReader {
  private csvBookReader: CsvBookReader

  constructor(csvBookReader :CsvBookReader) {
    this.csvBookReader = csvBookReader
  }

  read() {
    const results = this.csvBookReader.readCsv()
    return results.map((result) => {
      return {
        author: result[0] as string,
        title: result[1] as string
      }
    })
  }
}

const bookShelf1 = new BookShelf(new JsonBookReader())
bookShelf1.printBooks()
const bookShelf2 = new BookShelf(new CsvBookReaderAdapter(new CsvBookReader()))
bookShelf2.printBooks()
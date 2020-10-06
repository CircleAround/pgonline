interface MyIterator<T> {
  hasNext(): boolean

  next(): T
}

interface Aggregate<T> {
  getIterator(): MyIterator<T>
}

class BookShelf implements Aggregate<Book> {
  books: Book[]

  constructor() {
    this.books = [];
  }

  getBookAt(index:number) {
    return this.books[index]
  }

  addBook(book:Book) {
    this.books.push(book)
  }

  countBooks() {
    return this.books.length
  }

  getIterator():MyIterator<Book> {
    return new BookShelfIterator(this)
  }
}

class BookShelfIterator implements MyIterator<Book> {
  bookShelf:BookShelf
  index:number

  constructor(bookShelf:BookShelf) {
    this.bookShelf = bookShelf  
    this.index = 0
  }

  hasNext() {
    return this.index < this.bookShelf.countBooks()
  }

  next() {
    const book = this.bookShelf.getBookAt(this.index)
    this.index++

    return book
  }
}

class Book  {
  name:string

  constructor(name:string) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

const bookShelf = new BookShelf()
bookShelf.addBook(new Book('走れメロス'))
bookShelf.addBook(new Book('羅生門'))
bookShelf.addBook(new Book('人間失格'))
const bookShelfIterator = bookShelf.getIterator();
 
while (bookShelfIterator.hasNext()) {
  let book = bookShelfIterator.next();

  console.log(book.getName())
}
//  Before 
// interface MusicList {
//   getAll(): Array<Music>
//   search(word: string, type: string): Array<Music>
// }

// interface Music {
//   title: string
//   artist: string
// }

// class MusicList implements MusicList {
//   musics: Array<Music>

//   constructor(musics: Array<Music>) {
//     this.musics = musics
//   }

//   getAll() {
//     return this.musics
//   }

//   search(word: string, type: string) {
//     switch (type) {
//       case 'title':
//         return this.musics.filter((music)=> {
//           return music.title === word
//         })
//       case 'artist':
//         return this.musics.filter((music)=> {
//           return music.artist === word
//         })
//       default:
//         throw new Error("unknown type"); 
//     }
//   }
// }

// const musicList = new MusicList([
//   {title: "ズルい女", artist: "シャ乱Q"},
//   {title: "ロビンソン", artist: "スピッツ"},
//   {title: "愛の言霊", artist: "サザンオールスターズ"},
//   {title: "みんなのうた", artist: "サザンオールスターズ"}
// ])

// let results = musicList.search('ズルい女', "title")
// console.log('## タイトル検索')
// results.forEach((result)=>{
//   console.log(result.title, result.artist)
//   console.log('----------------')
// })

// results = musicList.search('サザンオールスターズ', "artist")
// console.log('## アーティスト検索')
// results.forEach((result)=>{
//   console.log(result.title, result.artist)
//   console.log('----------------')
// })

// After
interface MusicList {
  getAll(): Array<Music>
  search(text: string): Array<Music>
  setSearcher(searcher: Searcher)
}

interface Music {
  title: string
  artist: string
}

interface Searcher {
  search(musics: Array<Music>, word: string): Array<Music>
}

class ArtistSearcher implements Searcher {
  search(musics: Array<Music>, word: string) {
    return musics.filter((music)=> {
      return music.artist === word
    })
  }
}

class TitleSearcher implements Searcher {
  search(musics: Array<Music>, word: string) {
    return musics.filter((music)=> {
      return music.title === word
    })
  }
}

class MultipleSearcher implements Searcher {
  search(musics: Array<Music>, word: string) {
    let results = []
    results.push(new TitleSearcher().search(musics, word))
    results.push(new ArtistSearcher().search(musics, word))
    return [].concat(...results)
  }
}

class MusicList implements MusicList {
  musics: Array<Music>
  searcher: Searcher

  constructor(musics: Array<Music>) {
    this.musics = musics
  }

  setSearcher(searcher: Searcher) {
    this.searcher = searcher
  }

  getAll() {
    return this.musics
  }

  search(word: string) {
    return this.searcher.search(this.musics, word)
  }
}

const musicList = new MusicList([
  {title: "ズルい女", artist: "シャ乱Q"},
  {title: "ロビンソン", artist: "スピッツ"},
  {title: "愛の言霊", artist: "サザンオールスターズ"},
  {title: "みんなのうた", artist: "サザンオールスターズ"}
])


musicList.setSearcher(new TitleSearcher())
let results = musicList.search("ロビンソン")
console.log('## タイトル検索')
results.forEach((result)=>{
  console.log(result.title, result.artist)
  console.log('----------------')
})

musicList.setSearcher(new ArtistSearcher())
results = musicList.search("サザンオールスターズ")
console.log('## アーティスト検索')
results.forEach((result)=>{
  console.log(result.title, result.artist)
  console.log('----------------')
})

console.log('## 複合検索')
musicList.setSearcher(new MultipleSearcher())
results = musicList.search("サザンオールスターズ")
results.forEach((result)=>{
  console.log(result.title, result.artist)
  console.log('----------------')
})
results = musicList.search("ロビンソン")
results.forEach((result)=>{
  console.log(result.title, result.artist)
  console.log('----------------')
})

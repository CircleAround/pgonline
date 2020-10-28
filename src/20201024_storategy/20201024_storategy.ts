interface Music {
  title: string
  artist: string
}

interface Sorter {
  sort(musics: Music[]): Music[]
}

class RandumSorter implements Sorter {
  sort(musics: Music[]) {
    return musics.sort((current, next) => {
      return Math.random() > 0.5 ? 1 : -1
    })
  }
}

class ArtistSorter implements Sorter {
  sort(musics: Music[]) {
    return musics.sort((current, next) => {
      return current.artist > next.artist ? 1 : -1
    })
  } 
}

interface Exporter {
  export(musics: Music[]): any
}

class JsonExporter implements Exporter {
  export(musics: Music[]) {
    return JSON.stringify(musics)
  }
}

class CsvExporter implements Exporter {
  export(musics: Music[]) {
    return musics.map((music) => {
      return `${music.title}, ${music.artist}`
    }).join('\n')
  }
}

class MusicList {
  exporter: Exporter
  sorter: Sorter

  constructor(sorter: Sorter, exporter: Exporter) {
    this.exporter = exporter
    this.sorter = sorter
  }

  export(musics: Music[]) {
    const sorted = this.sorter.sort(musics)
    return this.exporter.export(sorted)
  }
}

const data = [
  {title: "ズルい女", artist: "シャ乱Q"},
  {title: "ロビンソン", artist: "スピッツ"},
  {title: "愛の言霊", artist: "サザンオールスターズ"},
  {title: "みんなのうた", artist: "サザンオールスターズ"}
]
// const sorter = new ArtistSorter
const sorter = new RandumSorter
// const exporter = new JsonExporter
const exporter = new CsvExporter 
const musicList = new MusicList(sorter, exporter)
console.log(musicList.export(data))

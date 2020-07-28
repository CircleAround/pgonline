/*
【希望】
- なるべくカードの種類は切り替えやすくしておきたい
- 複数のカード属性を好きに付けられるようにしておきたい
*/

class Card {
  private name
  private description
  constructor(name:string, description:string) {
    this.name = name
    this.description = description
  }
  getName() {
    return this.name
  }

  getDescription() {
    return this.description;
  }
}

class SRCard {
  private card
  constructor(card) {
    this.card = card;
  }

  getName() {
    return "[SR]" + this.card.getName();
  }

  getDescription() {
    return `★★★★★★★★★★★★★★★\n${this.card.getDescription()}\n★★★★★★★★★★★★★★★`
  }
}

class RCard {
  private card
  constructor(card) {
    this.card = card;
  }

  getName() {
    return "[R]" + this.card.getName();
  }

  getDescription() {
    return `---------------\n${this.card.getDescription()}\n---------------`
  }
}

class BossCard {
  private card
  constructor(card) {
    this.card = card;
  }

  getName() {
    return "[BOSS]" + this.card.getName();
  }

  getDescription() {
    return this.card.getDescription();
  }
}

function showProperties(card) {
  console.log(`名前: ${card.getName()}`);
  console.log(`詳細:\n${card.getDescription()}`);
}

const cards = [
  new Card("村人", "ほとんど戦力にはならない村人"),
  new SRCard(new Card("傭兵", "金さえ出せば何でもこなす傭兵")),
  new BossCard(new RCard(new Card("勇者", "訓練を積んだ歴戦の勇士"))),
  new BossCard(new SRCard(new Card("レッドドラゴン", "遥か昔から生き続ける火龍"))),
]

console.log("【カードゲームキャラ一覧】\n")
for(let i = 0; i < cards.length; ++i) {
  showProperties(cards[i]);
  console.log("\n");
}

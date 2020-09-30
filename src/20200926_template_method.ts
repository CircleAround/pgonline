abstract class Charactor {
  abstract printJob(): any

  abstract attack(): any

  abstract defence(): any

  strike() {
    this.printJob()
    this.attack()
    this.attack()
    this.attack()
  }

  attack_and_defence() {
    this.printJob()
    this.attack()
    this.defence()
  }
}

class Wizard extends Charactor {
  printJob() {
    console.log(`魔法使い ----------`)
  }

  attack() {
    console.log('サンダーを唱えた')
  }

  defence() {
    console.log('防壁を出現させた')
  }
}

class Solider extends Charactor {
  printJob() {
    console.log(`戦士 ----------`)
  }

  attack() {
    console.log('相手に切りかかった')
  }

  defence() {
    console.log('盾を構えた')
  }
}

const wizard = new Wizard()
wizard.strike()
wizard.attack_and_defence()

const solider = new Solider()
solider.strike()
solider.attack_and_defence()
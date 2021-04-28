const createOptionsElm = (str) => {
  const strs = str.split(',') // ['りんご', 'みかん', 'いちご']
  const optionsElm = document.createDocumentFragment()
  console.log(str.length)

  for(let i = 0; i < strs.length; i++) {
    const optionElm = document.createElement('option')
    const item = strs[i]
    
    optionElm.appendChild(document.createTextNode(item))
    optionElm.value = item
    optionsElm.appendChild(optionElm)
  }

  return optionsElm
}

const getItemsStr = (checkedItem) => {
  let str = ""
  if (checkedItem === "fruit") {
    str = "リンゴ,モモ,イチゴ" 
  } else if (checkedItem === "vegetable") {
    str = "キュウリ,ジャガイモ,ニンジン"
  }

  return str
}

// 必要な要素の取得
const formElm = document.querySelector('#itemForm')
const selectorElm = formElm.querySelector('#itemSelector')
// 選択されたラジオボタンのバリューから選択肢を作成
const checkedItem = formElm.item.value
const checkedVal = getItemsStr(checkedItem)

// optionタグの作成と画面への反映
const optionsElm = createOptionsElm(checkedVal)
selectorElm.appendChild(optionsElm)

// ラジオボタン変更時の処理
document.getElementsByName("item").forEach((itemElm) => {
  itemElm.addEventListener('change', (e) => {
    selectorElm.innerHTML = ''
    const itemStr = getItemsStr(e.target.value)
    const optionsElm = createOptionsElm(itemStr)
    selectorElm.appendChild(optionsElm)    
  })
})
let items = []
let ranking = []
const rootElement = document.getElementById('app')

function fetchItems() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/src/json/items.json")
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        items =  JSON.parse(xhr.responseText)
        xhr = new XMLHttpRequest()
        xhr.open("GET", "http://localhost:8080/src/json/ranking.json");
        xhr.onload = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              ranking =  JSON.parse(xhr.responseText)
              displayView()
            }
          }
        }
        xhr.send(null)
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.log(e);
  };
  xhr.send(null); 
}

// function fetchItems() {
//   fetch('http://localhost:8080/src/json/items.json')
//     .then((res)=>{
//       return res.json()
//     })
//     .then((json)=>{
//       items = json
//       return fetch('http://localhost:8080/src/json/ranking.json')
//     })
//     .then((res)=>{
//       return res.json()
//     })
//     .then((json)=>{
//       ranking = json
//       displayView()
//     })
//     .catch(err=>console.log(err))
// }

// async function fetchItems() {
//   try {
//     const itemsRes = await fetch('http://localhost:8080/src/json/items.json')
//     items = await itemsRes.json()
//     const RankingRes = await fetch('http://localhost:8080/src/json/ranking.json')
//     ranking = await RankingRes.json()
//     displayView()
//   } catch(e) {
//     console.log(e)
//   }
// }

function displayView() {
  let fragment = document.createDocumentFragment()
  for(let i = 0; i < items.length; i++) {
    let item = items[i].name
    let price = items[i].price
    let evaluationAvg = items[i].evaluationAvg
    let rank = ranking.find(rank=>rank.name===item).rank
    let liElement = document.createElement('li')
    liElement.appendChild(document.createTextNode(`商品:${item},価格:${price},評価:${evaluationAvg},ランク:${rank}`))
    fragment.appendChild(liElement)
  }
  
  rootElement.appendChild(fragment)
}

fetchItems()
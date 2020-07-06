const $dispayBtn = document.getElementById('dispayBtn')
const $fruitList = document.getElementById('fruitList')

$dispayBtn.addEventListener('click', function() {
	
	axios.get('/fruits')
		.then(function(response) {
			console.log(response)
			displayFruits(response.data.fruits)
		})
		.catch(function(error) {
			console.error(error)
		})
})

function displayFruits(fruits) {
	for(let i = 0; i < fruits.length; i++) {
		const $li = document.createElement('li')
		$li.innerText = fruits[i]
		$fruitList.appendChild($li)
	}
}

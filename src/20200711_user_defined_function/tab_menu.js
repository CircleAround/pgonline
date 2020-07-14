const $tabContnt1 = document.getElementById('tab_content1')
const $menus1 = $tabContnt1.getElementsByClassName('menu');
const $contents1 = $tabContnt1.getElementsByClassName('content');
let activeIndex1 = 0

for(let i = 0; i < $menus1.length; i++) {
	const $menu = $menus1[i]
	$menu.addEventListener('click', function(e) {
		$contents1[activeIndex1].classList.remove('active')
		$contents1[i].classList.add('active')
		activeIndex1 = i
	})
}

const $tabContnt2 = document.getElementById('tab_content2')
const $menus2 = $tabContnt2.getElementsByClassName('menu');
const $contents2 = $tabContnt2.getElementsByClassName('content');
let activeIndex2 = 0

for(let i = 0; i < $menus2.length; i++) {
	const $menu = $menus2[i]
	$menu.addEventListener('click', function(e) {
		$contents2[activeIndex2].classList.remove('active')
		$contents2[i].classList.add('active')
		activeIndex2 = i
	})
}
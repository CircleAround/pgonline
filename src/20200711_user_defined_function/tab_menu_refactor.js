function toggleTabMenu ($root) {
  const $menus = $root.getElementsByClassName('menu');
  const $contents = $root.getElementsByClassName('content');
  let activeIndex = 0

  for(let i = 0; i < $menus.length; i++) {
    const $menu = $menus[i]
    $menu.addEventListener('click', function(e) {
      $contents[activeIndex].classList.remove('active')
      $contents[i].classList.add('active')
      activeIndex = i
    })
  }
}

toggleTabMenu(document.getElementById('tab_content1'))
toggleTabMenu(document.getElementById('tab_content2'))
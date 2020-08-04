// var -------------
var hoge = 'hoge'

function func() {
	var fuge = 'fuge'
	console.log(`関数スコープ ${hoge}`)
	console.log(`関数スコープ ${fuge}`)
}

func()
console.log(`グローバルスコープ ${hoge}`)
console.log(`グローバルスコープ ${fuge}`) // エラーが出ます

// let -------------
// let hoge = 'hoge'

// function func() {
// 	let fuge = 'fuge'
// 	let piyo = 'test'

// 	if (true) {
// 		let piyo = 'piyo'
// 		console.log(`ブロックスコープ ${hoge}`)
// 		console.log(`ブロックスコープ ${fuge}`)
// 		console.log(`ブロックスコープ ${piyo}`)
// 	}

// 	console.log(`関数スコープ ${hoge}`)
// 	console.log(`関数スコープ ${fuge}`)
// 	console.log(`関数スコープ ${piyo}`) // エラーが出ます
// }

// func()
// console.log(`グローバルスコープ ${hoge}`)
// console.log(`グローバルスコープ ${fuge}`) // エラーが出ます
// console.log(`グローバルスコープ ${piyo}`) // エラーが出ます

// const -------------
// const hoge = 'hoge'
// hoge = 'hogehoge' // エラーが出ます
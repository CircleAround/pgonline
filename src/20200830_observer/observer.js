class Subject {
	constructor() {
		this.observers = []
	}

	add (observer) {
		this.observers.push(observer)
	}

	notify () {
		for(let i = 0; i < this.observers.length; i++) {
			this.observers[i].update()
		}
	}
}

class GraphModel extends Subject {
	constructor() {
		super()
		this.data = []
	}

	sync (data) {
		this.data = data
		this.notify()
	}
}

class ChartView {
	constructor($root, model) {
		this.model = model
		this.$root = $root
		this.model.add(this)
	}

	generateGraphData() {
		this.labels = []
		this.vals = []
		this.model.data.forEach(function(datum){
			this.labels.push(`${datum.age}代`)
			this.vals.push(datum.num)
		}.bind(this))
	}

	update() {
		this.render()
	}
}

class LineChartView extends ChartView {  
	constructor($root, model) {
		super($root, model)
	}
	
	render() {
		this.generateGraphData()
		const data = {
			datasets: [{
				data: this.vals
			}],
			labels: this.labels
		};

		new Chart(this.$root,{
			type: 'line',
			data: data,
		});
	}
}

class BarChartView extends ChartView{  
	constructor($root, model) {
		super($root, model)
	}
	
	render() {
		this.generateGraphData()
		const data = {
			datasets: [{
				data: this.vals
			}],
			labels: this.labels
		};

		new Chart(this.$root,{
			type: 'bar',
			data: data,
		});
	}
}

class PieChartView extends ChartView {  
	constructor($root, model) {
		super($root, model)
	}    

	render() {
		this.generateGraphData()
		const data = {
			datasets: [{
				data: this.vals
			}],
			labels: this.labels
		};

		new Chart(this.$root,{
			type: 'pie',
			data: data,
		});
	}
}

const model = new GraphModel()
new PieChartView(document.getElementById('pieChart') , model)
new LineChartView(document.getElementById('lineChart') , model)
new BarChartView(document.getElementById('barChart') , model)

model.sync([{age: 10, num: 30}, {age: 20, num: 20}, {age: 30, num: 40}])

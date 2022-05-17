// create chart bars in the chart container
function createChartBars() {
	// get item with id chart-container
	const chartContainer = document.getElementById('chart-container');

	// add 20 divs to chart-container with class chart-bar and set width to 1/20 %
	for (let i = 0; i < 20; i++) {
		const chartBar = document.createElement('div');
		chartBar.classList.add('chart-bar');
		chartBar.style.width = `${100 / 25}%`;
		chartContainer.append(chartBar);
	}

	updateChartBars();
}

// function that update randomly the chart bars height between 0 and 100 percent each seconds with ease out animation
function updateChartBars() {
	const chartBars = document.querySelectorAll('.chart-bar');

	let randomHeight = 0;

	// set height to randomHeight
	chartBars.forEach((chartBar) => {
		// get random number between 10 and 100
		randomHeight = Math.floor(Math.random() * (100 - 10 + 1)) + 20;
		chartBar.style.height = `${randomHeight}%`;
	});

	// setTimeout to call updateChartBars function again after 1 second
	setTimeout(() => {
		updateChartBars();
	}, 1500);
}

window.onload = function () {
	createChartBars();
};

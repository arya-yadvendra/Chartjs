let ctx = document.getElementById('myChart');
let myChart;
let Jsondata;

fetch("data.json")
// Checking for the response request, if it's ok proceed further.
.then(function(response){
   if(response.status == 200){
      return response.json();
   }
})
.then(function(data){ 
	// temp saving data from the object before destroying that
   Jsondata = data; 
   createChart(Jsondata, 'bar');
});	

function createChart(data, type){
	myChart = new Chart(ctx, {
		type: type, 
		data: {
		  labels: data.map(row => row.year), 
		  datasets: [{
		    label: 'Population of Delhi over the decade, Since 1900',
		    data: data.map(row => row.population),
		    borderWidth: 1
		  }]
		},
		options: {
		  scales: {
		    y: {
		      beginAtZero: true
		    }
		  },
		  responsive: true,
		  maintainAspectRatio: false,
		  // Can use plugin, to dowload chart
		}
	});
}

// setChart event button function, from index file
function setChartType(chartType){
	myChart.destroy();		// Destroying current chart before creating new chart
	createChart(Jsondata, chartType);
}

document.getElementById('download').addEventListener('click', function() {
	const canvas = document.querySelector('canvas');
	const imageURL = canvas.toDataURL('image/png');
	const link = document.createElement('a');
	link.href = imageURL;
	link.download = 'chart.png';
	link.click();
  });

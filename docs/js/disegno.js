JSC.Chart('chartDiv', {
    type: 'horizontal column',
    series: [
       {
          points: [
             {x: 'Mele', y: 40},
             {x: 'Arancie', y: 52}
          ]
       }
    ]
});

JSC.Chart('chartDiv2', {
   type: 'horizontal column',
   series: [
      {
         name:'Andrea',
         points: [
            {x: 'Mele', y: 60},
            {x: 'Arancie', y: 42}
         ]
      },{
         name:'Anna',
         points: [
            {x: 'Mele', y: 40},
            {x: 'Arancie', y: 32}
         ]
      }
   ]
});

fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
	.then(function (response) {
		return response.text();
	})
	.then(function (text) {
		let series = csvToSeries(text);
		let series2 = csvToSeries2(text); 
		console.log(series);
		renderChart(series);
		console.log(series2);
		renderChart2(series2);
	})
	.catch(function (error) {
		// Qualcosa è andato storto
		console.log(error);
});

function csvToSeries(text) {
	const lifeExp = 'average_life_expectancy';
	let dataAsJson = JSC.csv2Json(text);
	let male = [], female = [];
	dataAsJson.forEach(function (row) {
		// Aggiungi a 'male', 'female' o scarta
		if (row.race === 'All Races') {
			if (row.sex === 'Male') {
				male.push({ x: row.year, y: row[lifeExp] });
			} else if (row.sex === 'Female') {
				female.push({ x: row.year, y: row[lifeExp] });
			}
		}
	});
	return [
		{ name: 'Male', points: male },
		{ name: 'Female', points: female }
	];
}

function csvToSeries2(text) {
	const lifeExp = 'average_life_expectancy';
	let dataAsJson = JSC.csv2Json(text);
	let white = [], black = [];
	dataAsJson.forEach(function (row) {
		// Aggiungi a 'black', 'white' o scarta
		if (row.sex === 'Both Sexes') {
			if (row.race === 'Black') {
				black.push({ x: row.year, y: row[lifeExp] });
			} else if (row.race === 'White') {
				white.push({ x: row.year, y: row[lifeExp] });
			}
		}
	});
	return [
		{ name: 'Black', points: black },
		{ name: 'White', points: white },
	];
}

function renderChart(series) {
	JSC.Chart('chartDiv3', {
		title_label_text: 'Aspettativa di vita negli Stati Uniti',
		annotations: [{
			label_text: 'Fonte: Centro nazionale per le statistiche sanitarie',
			position: 'bottom left'
		}],
		legend_visible: false,
		defaultSeries_lastPoint_label_text: '<b>%seriesName</b>',
		defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
		xAxis_crosshair_enabled: true,
		series: series
	});
}

function renderChart2(series2) {
	JSC.Chart('chartDiv4', {
		title_label_text: 'Aspettativa di vita negli Stati Uniti',
		annotations: [{
			label_text: 'Fonte: Centro nazionale per le statistiche sanitarie',
			position: 'bottom left'
		}],
		legend_visible: false,
		xAxis_crosshair_enabled: true,
		defaultSeries_firstPoint_label_text: '<b>%seriesName</b>',
		defaultPoint_tooltip: '%seriesName <b>%yValue</b> years',
		series: series2 
	});
}

let btn = document.querySelector("button");
btn.addEventListener("click", () => {
  fetch('https://data.cdc.gov/resource/w9j2-ggv5.csv')
    .then(response => response.text())
    .then(data => {
      visualizzaContenuto(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

function visualizzaContenuto(contenuto) {
  var righe = contenuto.split('\n');
  var table = '<table>';

  righe.forEach(function(riga) {
    var colonne = riga.split(',');
    table += '<tr>';
    colonne.forEach(function(colonna) {
      table += '<td>' + colonna + '</td>';
    });
    table += '</tr>';
  });

  table += '</table>';
  document.getElementById('contenutoCSV').innerHTML = table;
}
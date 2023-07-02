// Creazione del grafico
JSC.Chart('chartContainer', {
  title_label_text: 'Parabola',
  xAxis: { 
      scale_type: 'linear', 
      defaultTick: { visible: false }
  },
  yAxis: { 
      scale_type: 'linear', 
      defaultTick: { visible: false }
  },
  series: [{
      type: 'line',
      points: createParabolaPoints(),
      defaultPoint_marker: {
          shape: 'circle',
          size: 4
      }
  }]
});

// Funzione per generare i punti della parabola
function createParabolaPoints() {
  var points = [];

  for (var x = -10; x <= 10; x += 0.1) {
      var y = x * x; // Formula della parabola

      points.push([x, y]);
  }

  return points;
}
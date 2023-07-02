let submitBtn = document.getElementById("submitBtn");
let chart2;

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    let xInput = document.getElementById("x");
    let yInput = document.getElementById("y");

    let xValue = xInput.value;
    let yValue = yInput.value;

    if (xValue && !isNaN(yValue)) {
        updateChart2(xValue, yValue);
    }
});

function updateChart2(x, y) { // retta con il valore medio
    if (!chart2) {
        chart2 = JSC.Chart("chartDiv2", {
            type: "line",
            series: [
                {
                    name: "Retta con il valore medio",
                    line_width: 2,
                    points: [
                        { x: 0, y: 0 },
                        { x: 1, y: y / x }
                    ]
                }
            ],
            yAxis: {
                defaultTick: { enabled: true }
            }
        });
    } else {
        chart2.series[0].points[1] = { x: 1, y: y / x };
        chart2.update();
    }
}
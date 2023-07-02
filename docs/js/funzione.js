document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector("button");
    let btn2 = document.getElementById("btn2")
  
    btn.addEventListener("click", () => {
      let input = document.getElementById('numbersInput').value;
      let numbers = input.split(',').map(Number);
  
      let data = numbers.map((value, index) => {
        return { y: value };
      });
  
      let chart = JSC.Chart('chartContainer', {
        series: [{ points: data }]
      });
    });

    btn2.addEventListener("click", () => {
    let chart2;
    
    function updateChart() {
        let numbers = generateRandomNumbers(10, 1, 100); // Genera 10 numeri casuali compresi tra 1 e 100

        let data = numbers.map((value, index) => {
            return { y: value };
        });

        if (chart2) {
            chart2.destroy();
        }

        chart2 = JSC.Chart('chartContainer2', {
            series: [{ points: data }]
        });
    }

    updateChart(); // Genera il grafico iniziale

    setInterval(updateChart, 2000); // Aggiorna il grafico ogni 2 secondi
  });
});

function generateRandomNumbers(count, min, max) {
  let randomNumbers = [];
  for (let i = 0; i < count; i++) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}
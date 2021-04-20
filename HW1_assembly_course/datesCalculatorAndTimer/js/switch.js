//this module switches between dates calculator and timer

const datesCalculatorEl = document.getElementById('datesCalculator');
const timerEl = document.getElementById('timer');
const btnDatesCalculator = document.getElementById('btnDatesCalculator');
const btnTimer = document.getElementById('btnTimer');

datesCalculatorEl.style.display = 'block';
timerEl.style.display = 'none';

btnDatesCalculator.addEventListener('click', () => {
    datesCalculatorEl.style.display = 'block';
    timerEl.style.display = 'none';
});

btnTimer.addEventListener('click', () => {
    timerEl.style.display = 'block';
    datesCalculatorEl.style.display = 'none';

});
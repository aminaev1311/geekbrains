//считает промежуток между двумя датами и выводит ошибку, если одно из полей пустое
import {formatError} from "./error.js";
import {calculateDatesDiff, diffToHtml} from "./calculateDatesDiff.js";

let firstDateEl = document.getElementById('firstDate');
let secondDateEl = document.getElementById('secondDate');
let form = document.getElementById('datesForm');
let result = document.getElementById('result');

result.innerHTML = 'result will be displayed here. Enter two dates and press <i>Submit</i>';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let [date1, date2] = [firstDateEl.value, secondDateEl.value ];
    if (!date1 || !date2) {
        result.innerHTML = formatError("Error: date cannot be empty");
    } else {
        let diffObj = calculateDatesDiff(date1, date2);//returns date obj
        result.innerHTML = diffToHtml(diffObj);
    }
});
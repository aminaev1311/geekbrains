import {DateTime} from "./luxon.js";

export const calculateDatesDiff =  (date1, date2) =>
    DateTime.fromISO(date1).diff( DateTime.fromISO(date2), ['years', 'months', 'days'] ).values;

export const diffToHtml = diff => `
        <span>
            ${diff.years ? 'Лет: ' + Math.abs(diff.years) : ''}
            ${diff.months ? 'Месяцев: ' + Math.abs(diff.months) : ''}
            ${diff.days ? 'Дней: ' + Math.abs(diff.days) : ''}
        </span>`;
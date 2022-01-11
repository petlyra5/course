'use strict'

window.addEventListener('DOMContentLoaded', function() {

  const tableKurs = document.querySelector('.table'),
        h2 = document.querySelector('h2'),
        date = new Date();

  h2.append(`Актуальный курс на: ${addingZero(date.getDate())}.${addingZero(date.getMonth() + 1)}.${date.getFullYear()}`);

  fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      
      for (let keys in data.Valute) {
        const li = document.createElement('li'),
              valutaName = data.Valute[keys].Name,
              valutaKyrs = data.Valute[keys].Value;

        li.innerHTML = `${valutaName} = ${Math.trunc(valutaKyrs* 100) / 100} руб.`;
        tableKurs.append(li);
      }

    })
    .catch(() => {
      const li = document.createElement('li');
      li.innerHTML = 'Данный сервер в данный момент не доступен, обратитесь позже';
      tableKurs.append(li);
    });

});

const addingZero = (num) => {
  return num = (num < 10) ? num = `0${num}` : num
} 
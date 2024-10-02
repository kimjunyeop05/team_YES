let currentYear;
let currentMonth;

function createCalendar(year, month) {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const controls = document.createElement('div');
    controls.className = 'controls';

    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.onclick = () => changeMonth(-1);
    controls.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.onclick = () => changeMonth(1);
    controls.appendChild(nextButton);

    calendar.appendChild(controls);

    const title = document.createElement('h2');
    title.textContent = `${monthNames[month]} ${year}`;
    calendar.appendChild(title);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const daysRow = document.createElement('tr');
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    days.forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        daysRow.appendChild(th);
    });
    thead.appendChild(daysRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    let row = document.createElement('tr');

    for (let i = 0; i < firstDay.getDay(); i++) {
        const cell = document.createElement('td');
        row.appendChild(cell);
    }

    for (let date = 1; date <= lastDay.getDate(); date++) {
        if (row.children.length === 7) {
            tbody.appendChild(row);
            row = document.createElement('tr');
        }

        const cell = document.createElement('td');
        cell.textContent = date;
        row.appendChild(cell);
    }

    tbody.appendChild(row);
    table.appendChild(tbody);
    calendar.appendChild(table);
}

function changeMonth(step) {
    currentMonth += step;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(currentYear, currentMonth);
}

const today = new Date();
currentYear = today.getFullYear();
currentMonth = today.getMonth();
createCalendar(currentYear, currentMonth);
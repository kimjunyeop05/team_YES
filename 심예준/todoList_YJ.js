// script.js
document.addEventListener('DOMContentLoaded', function() {
    const addBtn = document.getElementById('addBtn');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');

    // 할 일 추가 기능
    addBtn.addEventListener('click', function() {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const li = document.createElement('li');
            li.textContent = todoText;
            todoList.appendChild(li);
            todoInput.value = '';
        } else {
            alert('할 일을 입력해주세요.');
        }
    });

    // Enter 키로 할 일 추가
    todoInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addBtn.click();
        }
    });
});

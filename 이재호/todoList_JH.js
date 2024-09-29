let categories = [];

document.addEventListener('DOMContentLoaded', () => {
  const addCategoryButton = document.querySelector('#add-category-button');
  const categoryInput = document.querySelector('#category-input');
  const categoriesContainer = document.querySelector('#categories-container'); // 초기화 시점

  loadCategories();  // 로컬 스토리지에서 데이터 불러오기, 이 시점에서는 categoriesContainer가 초기화된 상태입니다.

  addCategoryButton.addEventListener('click', addCategory);
  categoryInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addCategory();
    }
  });

  function addCategory() {
    const categoryName = categoryInput.value.trim();
    if (categoryName === '') {
      alert("카테고리 이름을 입력해주세요");
      return;
    }

    const category = {
      id: Date.now(),
      name: categoryName,
      tasks: []
    };

    categories.push(category);
    renderCategory(category);
    saveCategories();  // 카테고리 추가 후 저장
    categoryInput.value = '';
  }

  function renderCategory(category) {
    const categoryBox = document.createElement('div');
    categoryBox.className = 'category-box';
    categoryBox.dataset.id = category.id;

    const categoryHeader = document.createElement('h2');
    categoryHeader.textContent = category.name;

    const deleteCategoryButton = document.createElement('button');
    deleteCategoryButton.textContent = '삭제';
    deleteCategoryButton.className = 'delete-category';
    deleteCategoryButton.addEventListener('click', () => {
      deleteCategory(category.id);
    });

    categoryHeader.appendChild(deleteCategoryButton);
    categoryBox.appendChild(categoryHeader);

    const todoInputContainer = document.createElement('div');
    todoInputContainer.className = 'todo-input-container';

    const todoInput = document.createElement('input');
    todoInput.type = 'text';
    todoInput.placeholder = '할 일을 입력하세요';

    const addTodoButton = document.createElement('button');
    addTodoButton.textContent = '추가';
    addTodoButton.addEventListener('click', () => {
      addTodo(category.id, todoInput.value);
    });

    todoInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        addTodo(category.id, todoInput.value);
      }
    });

    todoInputContainer.appendChild(todoInput);
    todoInputContainer.appendChild(addTodoButton);
    categoryBox.appendChild(todoInputContainer);

    const todoList = document.createElement('ul');
    todoList.id = `todo-list-${category.id}`;
    categoryBox.appendChild(todoList);

    categoriesContainer.appendChild(categoryBox);  // 이 시점에서는 categoriesContainer가 초기화되어 있습니다.
  }

  function addTodo(categoryId, todoText) {
    const trimmedText = todoText.trim();
    if (trimmedText === '') {
      alert("할 일을 입력해주세요");
      return;
    }

    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    const task = {
      id: Date.now(),
      text: trimmedText
    };

    category.tasks.push(task);
    renderTodo(categoryId, task);
    saveCategories();  // 할 일 추가 후 저장
    
  }

  function renderTodo(categoryId, task) {
    const todoList = document.querySelector(`#todo-list-${categoryId}`);
    if (!todoList) return;

    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = task.id;

    const span = document.createElement('span');
    span.textContent = task.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', () => {
      deleteTodo(categoryId, task.id);
    });

    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  }

  function deleteCategory(categoryId) {
    categories = categories.filter(cat => cat.id !== categoryId);

    const categoryBox = document.querySelector(`.category-box[data-id='${categoryId}']`);
    if (categoryBox) {
      categoriesContainer.removeChild(categoryBox);
    }

    saveCategories();  // 카테고리 삭제 후 저장
  }

  function deleteTodo(categoryId, taskId) {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return;

    category.tasks = category.tasks.filter(task => task.id !== taskId);

    const todoItem = document.querySelector(`.category-box[data-id='${categoryId}'] .todo-item[data-id='${taskId}']`);
    if (todoItem) {
      const todoList = document.querySelector(`#todo-list-${categoryId}`);
      todoList.removeChild(todoItem);
    }

    saveCategories();  // 할 일 삭제 후 저장
  }

  function saveCategories() {
    localStorage.setItem('categories', JSON.stringify(categories));
  }

  function loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      categories = JSON.parse(storedCategories);
      categories.forEach(category => {
        renderCategory(category);
        category.tasks.forEach(task => {
          renderTodo(category.id, task);
        });
      });
    }
  }
});

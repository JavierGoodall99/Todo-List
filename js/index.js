// Get references to the HTML elements we need to interact with
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

// Retrieve the todos from local storage, or initialize an empty array if none exist
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render the todo items on the page
function renderTodos() {
  // Clear out the existing list items
  todoList.innerHTML = "";

  // Loop through the todos array and create a new list item for each one
  todos.forEach((todo, index) => {
    // Create the necessary HTML elements for each todo item
    const todoItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const todoText = document.createElement("span");
    const deleteButton = document.createElement("button");

    // Set up the checkbox element
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => {
      toggleCompleted(index);
    });

    // Set up the todo text element
    todoText.innerText = todo.text;
    todoText.classList.add("todo-text");

    // Set up the delete button element
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTodo(index);
    });

    // Add the necessary classes to the todo item element
    todoItem.classList.add("todo-item");

    // Append the necessary elements to the todo item element
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);

    // Append the todo item element to the todo list
    todoList.appendChild(todoItem);
  });
}

// Add a new todo item to the list
function addTodo() {
  // Get the value of the input field and trim any whitespace
  const todoText = todoInput.value.trim();

  // If the input field is not empty, create a new todo object and add it to the todos array
  if (todoText) {
    const todo = {
      text: todoText,
      completed: false,
    };

    todos.push(todo);

    // Store the updated todos array in local storage
    localStorage.setItem("todos", JSON.stringify(todos));

    // Clear the input field
    todoInput.value = "";

    // Render the updated todo list
    renderTodos();
  }
}

// Delete a todo item from the list
function deleteTodo(index) {
  // Use the splice method to remove the todo item from the todos array
  todos.splice(index, 1);

  // Store the updated todos array in local storage
  localStorage.setItem("todos", JSON.stringify(todos));

  // Render the updated todo list
  renderTodos();
}

// Toggle the completed status of a todo item
function toggleCompleted(index) {
  // Invert the completed status of the specified todo item
  todos[index].completed = !todos[index].completed;

  // Store the updated todos array in local storage
  localStorage.setItem("todos", JSON.stringify(todos));

  // Render the updated todo list
  renderTodos();
}

// Set up an event listener for the "Add" button
addButton.addEventListener("click", addTodo);

// Render the initial todo list
renderTodos();
// Selecting DOM elements for the form, input field, and the list to display todos
const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

// Get all todos from localStorage when the page loads, and update the todo list
let allTodos = getTodos();
updateTodoList();

// Event listener for form submission to add a new todo
todoForm.addEventListener('submit', function(e){
    e.preventDefault();  // Prevent the default form submission behavior
    addTodo();  // Call function to add a new todo
})

// Function to add a new todo to the list
function addTodo(){
    const todoText = todoInput.value.trim();  // Get and trim the input value
    if(todoText.length > 0){  // Check if the input is not empty
        const todoObject = {
            text: todoText,  // The text entered by the user
            completed: false  // Initially, the todo is not completed
        }
        allTodos.push(todoObject);  // Add the new todo to the allTodos array
        updateTodoList();  // Update the displayed todo list
        saveTodos();  // Save the updated todo list to localStorage
        todoInput.value = "";  // Clear the input field after adding the todo
    }  
}

// Function to update the todo list in the UI
function updateTodoList(){
    todoListUL.innerHTML = "";  // Clear the existing todo list
    allTodos.forEach((todo, todoIndex) => {  // Loop through all todos
        const todoItem = createTodoItem(todo, todoIndex);  // Create a new todo item for each todo
        todoListUL.append(todoItem);  // Append the todo item to the list
    })
}

// Function to create a single todo item element
function createTodoItem(todo, todoIndex){
    const todoId = "todo-"+todoIndex;  // Unique ID for each todo
    const todoLI = document.createElement("li");  // Create a new <li> element
    const todoText = todo.text;  // Get the text of the todo
    todoLI.className = "todo";  // Add a class to the todo item for styling
    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">  <!-- Checkbox to mark todo as completed -->
        <label class="custom-checkbox" for="${todoId}">  <!-- Custom checkbox label with a checkmark icon -->
            <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
        </label>
        <label for="${todoId}" class="todo-text">
            ${todoText}  <!-- The text of the todo -->
        </label>
        <button class="delete-button">  <!-- Delete button for removing the todo -->
            <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
            </svg>
        </button>
    `;  // HTML for the todo item with checkbox, text, and delete button

    // Event listener for the delete button to remove the todo item
    const deleteButton = todoLI.querySelector(".delete-button");
    deleteButton.addEventListener("click", () => {
        deleteTodoItem(todoIndex);  // Call the delete function when the delete button is clicked
    })

    // Event listener for checkbox to toggle completion status
    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener("change", () => {
        allTodos[todoIndex].completed = checkbox.checked;  // Update the completed status of the todo
        saveTodos();  // Save the updated todo list to localStorage
    })

    // Set the checkbox state based on whether the todo is completed
    checkbox.checked = todo.completed;

    return todoLI;  // Return the created todo item element
}

// Function to delete a todo item by its index
function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i) => i !== todoIndex);  // Filter out the todo at the specified index
    saveTodos();  // Save the updated todo list to localStorage
    updateTodoList();  // Update the displayed todo list
}

// Function to save the todo list to localStorage
function saveTodos(){
    const todosJson = JSON.stringify(allTodos);  // Convert the todo list to a JSON string
    localStorage.setItem("todos", todosJson);  // Save the JSON string in localStorage
}

// Function to retrieve the todo list from localStorage
function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";  // Get todos from localStorage (default to an empty array if none exist)
    return JSON.parse(todos);  // Parse and return the todo list as an array
}

const input = document.querySelector("#create-todo")
const mainList = document.querySelector(".todo-list")
const container = document.querySelector(".container")
const navigation = document.querySelector(".navigation")
const numberLeft = document.querySelector("#number-left")
const navListConatiner = document.querySelector(".nav-list-conatiner")
const listItem = document.getElementsByClassName("list-item")
const allBtn = document.querySelector("#all")
const activeBtn = document.querySelector("#active")
const completeBtn = document.querySelector("#completed")

const themeToggle = document.querySelector(".theme-switcher")
const themeIcon = document.querySelector(".theme-icon")
const wrapper = document.querySelector(".wrapper")

const allBtnMobile = document.querySelector("#all-mobile")
const activeBtnMobile = document.querySelector("#active-mobile")
const completeBtnMobile = document.querySelector("#completed-mobile")
const clearBtn = document.querySelector("#clear")
let todoList = JSON.parse(localStorage.getItem("todoList")) || []



if (localStorage.getItem("todoList")) {
    todoList.map((todo) => {
        createTodo(todo)
    })
}

input.addEventListener("keypress", (e) => {
    let Value = input.value
    
    if (e.key === "Enter") {
        if (Value.trim().length === 0) {
            return
        } 

        const todo = {
        id: new Date().getTime(),
        name: Value,
        isCompleted: false
        }

        todoList.push(todo)
        localStorage.setItem("todoList", JSON.stringify(todoList))
        createTodo(todo)
    }
})

function createTodo(todo) {
    let number = todoList.length

    input.value = ""
    mainList.style.cssText = "visibility: visible;"
    navigation.style.cssText= "visibility: visible;"
    navListConatiner.style.cssText= "visibility: visible;"

    const listItem = document.createElement("li") //LIST ITEM
    listItem.classList.add("list-item")
    listItem.id = todo.id
    listItem.classList.add(todo.isCompleted)

    const left = document.createElement("div") //DIV WITH CLASS LEFT CHECK HTML FILE TO UNDERSTAND
    left.classList.add("left")

    const checkbox = document.createElement("span") //CHECK CONTAINER
    checkbox.classList.add("checkbox")

    const checkimg = document.createElement("img") //CHECK ICON
    checkimg.src = "./images/icon-check.svg"
    checkimg.alt = "check-icon"

    const paragraph = document.createElement("p") //PARAGRAPH HOLDING VALUES
    paragraph.classList.add("todo-display")
    paragraph.textContent = todo.name

    const del = document.createElement("span") //DELETE BTN
    del.classList.add("delete")

    const delimg = document.createElement("img") //DELETE ICON
    delimg.src = "./images/icon-cross.svg"
    delimg.alt = "delete-icon"
    delimg.classList.add("del-icon")


    mainList.appendChild(listItem);
    mainList.appendChild(navigation)

    listItem.appendChild(left)
    listItem.appendChild(del)

    left.appendChild(checkbox)
    left.appendChild(paragraph)

    checkbox.appendChild(checkimg)
    del.appendChild(delimg)
    container.appendChild(mainList)
    container.appendChild(navListConatiner)

    totalTask()
    
    // Delete todo item
    del.addEventListener("click", (e) => {
        const todoId = e.target.closest("li").id

        removeTodo(todoId)
    })

    listItem.addEventListener("click", (e) => {
        const todoId = e.target.closest("li").id
        const parent = e.target.closest("li")
        
        completeTodo(todoId, parent)
    })

    if(listItem.classList.contains(true)){
       listItem.classList.add("completed")
    }

    completeBtn.addEventListener("click", () => {
        if(listItem.classList.contains("completed")){
            listItem.classList.remove("hidden")
        }else{
            listItem.classList.add("hidden")
        }

        allBtn.classList.remove("active")
        activeBtn.classList.remove("active")
        completeBtn.classList.add("active")
    })

    activeBtn.addEventListener("click", () => {
        if(listItem.classList.contains("completed")){
            listItem.classList.add("hidden")
        }else{
            listItem.classList.remove("hidden")
        }

        allBtn.classList.remove("active")
        activeBtn.classList.add("active")
        completeBtn.classList.remove("active")
    })

    allBtn.addEventListener("click", () => {
        listItem.classList.remove("hidden")

        allBtn.classList.add("active")
        activeBtn.classList.remove("active")
        completeBtn.classList.remove("active")
    })


    completeBtnMobile.addEventListener("click", () => {
        if(listItem.classList.contains("completed")){
            listItem.classList.remove("hidden")
        }else{
            listItem.classList.add("hidden")
        }

        allBtnMobile.classList.remove("active")
        activeBtnMobile.classList.remove("active")
        completeBtnMobile.classList.add("active")
    })

    activeBtnMobile.addEventListener("click", () => {
        if(listItem.classList.contains("completed")){
            listItem.classList.add("hidden")
        }else{
            listItem.classList.remove("hidden")
        }

        allBtnMobile.classList.remove("active")
        activeBtnMobile.classList.add("active")
        completeBtnMobile.classList.remove("active")
    })

    allBtnMobile.addEventListener("click", () => {
        listItem.classList.remove("hidden")

        allBtnMobile.classList.add("active")
        activeBtnMobile.classList.remove("active")
        completeBtnMobile.classList.remove("active")
    })

    function clearTodo() {
    todoList = todoList.filter((todo) => todo.isCompleted !== true)
    
    localStorage.setItem("todoList", JSON.stringify(todoList))
    
    if (listItem.classList.contains("completed")) {
        listItem.style.cssText = "display: none;"
    }

    totalTask()
    }

    clearBtn.addEventListener("click", () => {
        clearTodo()
    })
}

function removeTodo(todoId) {
    let number = todoList.length - 1
    console.log(number);
    todoList = todoList.filter((todo) => todo.id !== parseInt(todoId))

    localStorage.setItem("todoList", JSON.stringify(todoList))
    document.getElementById(todoId).remove()

    if (number === 0) {
        navigation.style.cssText = "display: none"
        navListConatiner.style.cssText = "display: none"
    }

    totalTask()
}

function completeTodo(todoId, parent) {
    const task = todoList.find((item) => item.id === parseInt(todoId))

    task.isCompleted = !task.isCompleted

    if (task.isCompleted) {
        parent.classList.add("completed")
    }else{
        parent.classList.remove("completed")
    }

    localStorage.setItem("todoList", JSON.stringify(todoList))

    totalTask()
}

function totalTask() {
    let completed = todoList.filter((todo) => todo.isCompleted === true)
    let number = todoList.length

    numberLeft.textContent = `${number - completed.length} items left`
}


themeToggle.addEventListener("click", () => {
    wrapper.classList.toggle("light")

    if (wrapper.classList.contains("light")) {
       themeIcon.src = "./images/icon-moon.svg" 
    }else{
        themeIcon.src = "./images/icon-sun.svg"
    }
})

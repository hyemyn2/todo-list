function todoList() {

    const addBtn = document.getElementById('addBtn')
    const inputTodo = document.getElementById('inputTodo')
    const clearBtn = document.getElementById('clearBtn')
    const ulTodo = document.getElementById('todoList')
    const middleSection = document.getElementById('middleSection')
    const lowerSection = document.getElementById('lowerSection')

    // event listener
    addBtn.addEventListener('click', clickAddBtn)
    clearBtn.addEventListener('click', clearTodoList)
    ulTodo.addEventListener('click', function(e) { clickTodoBtn(e) })


    function getLocalStorage() {
        let savedArr = JSON.parse(localStorage.getItem('todo')) || []
        return savedArr
    }

    function setLocalStorage(list) {
        localStorage.setItem('todo', JSON.stringify(list))
    }

    function clickAddBtn(e) {
        e.preventDefault()
        if (inputTodo.value === '') {
            return
        }
        addTodo()
    }

    function addTodo() {
        const newTodo = { text: inputTodo.value, checked: false }
        inputTodo.value = ''
        const newArr = [...getLocalStorage(), newTodo]
        showTodoList(newArr)

    }

    function clickTodoBtn(e) {
        if (e.target.id === 'checkBtn') {
            checkTodo(e)
        } else if (e.target.id === 'deleteBtn') {
            deleteTodo(e)
        }
    }

    function deleteTodo(e) {
        const deleteNum = e.target.closest('li').dataset.num
        const savedArr = getLocalStorage()
        const newArr = savedArr.filter((todo, i) => i !== Number(deleteNum))
        showTodoList(newArr)
    }

    function checkTodo(e) {
        const checkNum = e.target.closest('li').dataset.num
        const savedArr = getLocalStorage()
        const newArr = [...savedArr]
        newArr[checkNum].checked = !savedArr[checkNum].checked
        showTodoList(newArr)
    }

    function clearTodoList() {
        showTodoList([])
    }

    function showTodoList(list) {
        setLocalStorage(list)
        renderTodoList(list)
    }

    function renderTodoList(list) {
        sectionInactive(list)
        const liTodo = list.map((todo, i) => `<li class="todo ${todo.checked===true ? "checked" : ""}" data-num="${i}">
            <button id="checkBtn"><i class="fa-solid fa-check"></i></button>
            <span>${todo.text}</span>
            <button id="deleteBtn"><i class="fa-solid fa-xmark"></i></button
        </li>`).join('')
        ulTodo.innerHTML = liTodo
    }

    function sectionInactive(list) {
        if (list.length === 0) {
            middleSection.classList.add('inactive')
            lowerSection.classList.add('inactive')
        } else {
            middleSection.classList.remove('inactive')
            lowerSection.classList.remove('inactive')
        }
    }

    function init() {
        const initArr = getLocalStorage()
        renderTodoList(initArr)
    }
    init()
}

window.addEventListener('DOMContentLoaded', todoList)
const todoList = () => {
    const addBtn = document.getElementById('addBtn')
    const inputTodo = document.getElementById('inputTodo')
    const clearBtn = document.getElementById('clearBtn')
    const ulTodo = document.getElementById('todoList')
    const listBox = document.getElementById('app')

    addBtn.addEventListener('click', e => clickAddBtn(e))
    clearBtn.addEventListener('click', () => clearTodoList())
    ulTodo.addEventListener('click', e => clickTodoBtn(e))

    // 로컬스토리지 불러오기 & 저장하기
    const getLocalStorage = () => JSON.parse(localStorage.getItem('todo')) || []
    const setLocalStorage = (list) => localStorage.setItem('todo', JSON.stringify(list))

    // 클릭 이벤트 : 리스트 추가 실행
    const clickAddBtn = (e) => {
        e.preventDefault()
        if (inputTodo.value !== '') addTodo()
    }

    // 리스트 추가
    const addTodo = () => {
        const newTodo = { text: inputTodo.value, checked: false }
        const newArr = [...getLocalStorage(), newTodo]
        inputTodo.value = ''
        showTodoList(newArr)
    }

    // 리스트 렌더링 & 로컬스토리지 저장 실행
    const showTodoList = (list) => {
        setLocalStorage(list)
        renderTodoList(list)
        sectionInactive(list)
    }

    // 리스트 렌더링
    const renderTodoList = (list) => {
        ulTodo.innerHTML = list.map((todo, i) => `<li class="todo ${todo.checked === true ? 'checked' : ''}" data-num="${i}">
            <button id="checkBtn"><i class="fa-solid fa-check"></i></button>
            <span>${todo.text}</span>
            <button id="deleteBtn"><i class="fa-solid fa-xmark"></i></button
        </li>`).join('')
    }

    // 리스트가 없는 경우 secton에 display : none 처리
    const sectionInactive = (list) => (list.length === 0) ? listBox.classList.add('inactive') : listBox.classList.remove('inactive')

    // 초기 화면 로딩
    const init = () => showTodoList(getLocalStorage())
    init()

    // 클릭 이벤트 : 해당 투두 체크 또는 삭제
    const clickTodoBtn = (e) => {
        if (e.target.id === 'checkBtn') checkTodo(e)
        if (e.target.id === 'deleteBtn') deleteTodo(e)
    }

    // 해당 투두 삭제
    const deleteTodo = (e) => {
        const deleteNum = e.target.closest('li').dataset.num
        const newArr = getLocalStorage().filter((todo, i) => i !== Number(deleteNum))
        showTodoList(newArr)
    }

    // 해당 투두 체크 표시
    const checkTodo = (e) => {
        const checkNum = e.target.closest('li').dataset.num
        const savedArr = getLocalStorage()
        const newArr = [...savedArr]
        newArr[checkNum].checked = !savedArr[checkNum].checked
        showTodoList(newArr)
    }

    // 클릭이벤트 : 투두리스트 전체 삭제 실행
    const clearTodoList = () => showTodoList([])
}
window.addEventListener('DOMContentLoaded', () => todoList())
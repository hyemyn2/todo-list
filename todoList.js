function todoList () {
    const inputList = document.getElementById('inputList')
    const addBtn = document.getElementById('addBtn')
    const clearBtn = document.getElementById('clearBtn')
    const ulTodo = document.getElementById('todos')
    const middleSection = document.getElementById('middleSection')
    const bottomSection = document.getElementById('bottomSection')
    let listArr = []
    let dataNum = 0

    // -------------------- event handler --------------------

    addBtn.addEventListener('click', function (e) { addTodo(e) })
    clearBtn.addEventListener('click', function (e) { clearLocal(e) })
    ulTodo.addEventListener('click', function (e) { clickTodo(e) })

    // -------------------- event function --------------------

    // click button(delete/check)
    function clickTodo (e) {

        if (e.target.className.includes('delBtn') === true) {
            deleteTodo(e)
        } else if (((e.target.className.includes('checkBtn') === true) || (e.target.className.includes('todo') === true)) && (e.target.className.includes('delBtn') === false)) {
            checkTodo(e)
        }
    }

    // add list
    function addTodo (e){
        e.preventDefault();
        const newTodo = {text: inputList.value, checked: false}
        if(inputList.value !== '') {
            listArr.push(newTodo);
            saveLocalStorage()
            inputList.focus()
        }
            inputList.value = '';
    }

    // check list
    function checkTodo(e){
        dataNum = e.target.closest('li').dataset.num
        const localData = JSON.parse(localStorage.getItem('todolist'))
        localData[dataNum].checked = !localData[dataNum].checked
        listArr = localData
        saveLocalStorage()
    }
    
    // delete list
    function deleteTodo(e){
            dataNum = e.target.closest('li').dataset.num
            listArr.splice(dataNum, 1)
            saveLocalStorage()
    }

    // save localstorage
    function saveLocalStorage () {
        localStorage.setItem('todolist', JSON.stringify(listArr))
        showTodo()
    }

    // list rendering
    function showTodo (){
        console.log(localStorage.todolist)
        if (listArr.length === 0) {
            middleSection.classList.add('noArray')
            bottomSection.classList.add('noArray')
        } else {
            middleSection.classList.remove('noArray')
            bottomSection.classList.remove('noArray')

        }
        const renderLi = listArr.map( (obj, i) => {
            return `<li class="todo ${obj.checked===true ? 'checked' : ''}" data-num="${i}">
                    <button class="btn checkBtn"><i class="fa-solid fa-check"></i></button>
                    <span class="todoText">${obj.text}</span>
                        <button class="btn delBtn"><i class="fa-solid fa-xmark"></i></button>
                    </li>`
        }).join('')
        ulTodo.innerHTML = renderLi;
    }



    function clearLocal (){
        localStorage.clear()
        listArr = []
        showTodo()
    }
    
    // init
    function initTodo (){
        if (localStorage.todolist){
            const getList = localStorage.getItem('todolist')
            const initList = JSON.parse(getList)
                listArr.push(...initList)
        }
        showTodo();
    }
    initTodo()
}
window.addEventListener('DOMContentLoaded', todoList)
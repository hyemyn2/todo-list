function todoList (){
    var inputList = document.querySelector('input[id=inputList]')
    var addBtn = document.querySelector('.addBtn')
    var clearBtn = document.querySelector('.clearBtn')
    var ulTodo = document.querySelector('.todos')
    var listArr = []
    var dataNum = 0
    const middleSection = document.querySelector('.middleSection')
    const bottomSection = document.querySelector('.bottomSection')

    // -------------------- event handler --------------------

    addBtn.addEventListener('click', function (e) { addTodo(e) })
    clearBtn.addEventListener('click', function (e) { clearLocal(e) })
    ulTodo.addEventListener('click', function (e) { deleteTodo(e) })
    ulTodo.addEventListener('click', function (e) { checkTodo(e) })

    // -------------------- event function --------------------

    // add list
    function addTodo (e){
        e.preventDefault();
        // const newTodo = inputList.value
        const newTodo = {text: inputList.value, checked: false}

        if(inputList.value !== '') {
            listArr.push(newTodo);
            saveLocal()
            inputList.focus()
        }
            inputList.value = '';
    }

    // 

    // delete list
    function deleteTodo(e){
        if (e.target.className.includes('delBtn') === true) {
            dataNum = e.target.closest('li').dataset.num
            listArr.splice(dataNum, 1)
            // console.log(listArr)

            saveLocal()
        }
    }

    // check list
    function checkTodo(e){
        if(!e.target.classList.contains('checkBtn')){
            return
        }
    // var ulTodo = document.querySelector('.todos')

        dataNum = e.target.closest('li').dataset.num
        const localData = JSON.parse(localStorage.getItem('testing'))
        localData[dataNum].checked = !localData[dataNum].checked
        listArr = localData
        // console.log(listArr)
        saveLocal()
    }

    // save localstorage
    function saveLocal () {
        localStorage.setItem('testing', JSON.stringify(listArr))
        showTodo()
    }

    // list rendering
    function showTodo (){
        console.log(localStorage.testing)
        if (listArr.length === 0) {
            middleSection.classList.add('noArray')
            bottomSection.classList.add('noArray')
        } else {
            middleSection.classList.remove('noArray')
            bottomSection.classList.remove('noArray')

        }

        const renderLi = listArr.map( (obj, i) => {

            // ----------------------------------------------------------------- //

            return `<li class="todo ${obj.checked===true ? 'checked' : ''}" data-num="${i}">
                        <span class="todoText">${obj.text}</span>
                        <button class="btn checkBtn"><i class="fa-solid fa-check"></i></button>
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
        if (localStorage.testing){
            const getList = localStorage.getItem('testing')
            const initList = JSON.parse(getList)
                listArr.push(...initList)
        }
        showTodo();

    }
    initTodo()
}

window.addEventListener('DOMContentLoaded', todoList)










        // let newList;
        // if(!localStorage.test){
        //     newList = { num: 1, txt: newTodo}
        // } else {
        //     newList = { num: localStorage.test.length+1, txt: newTodo}
        // }

        // listArr.push(newList)

        // localStorage.setItem('test', JSON.stringify(listArr))
        // // JSON.parse( localstorage key )
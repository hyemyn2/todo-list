/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var todoList = function todoList() {
  var addBtn = document.getElementById('addBtn');
  var inputTodo = document.getElementById('inputTodo');
  var clearBtn = document.getElementById('clearBtn');
  var ulTodo = document.getElementById('todoList');
  var listBox = document.getElementById('app');
  addBtn.addEventListener('click', function (e) {
    return clickAddBtn(e);
  });
  clearBtn.addEventListener('click', function () {
    return clearTodoList();
  });
  ulTodo.addEventListener('click', function (e) {
    return clickTodoBtn(e);
  }); // 로컬스토리지 불러오기 & 저장하기

  var getLocalStorage = function getLocalStorage() {
    return JSON.parse(localStorage.getItem('todo')) || [];
  };

  var setLocalStorage = function setLocalStorage(list) {
    return localStorage.setItem('todo', JSON.stringify(list));
  }; // 클릭 이벤트 : 리스트 추가 실행


  var clickAddBtn = function clickAddBtn(e) {
    e.preventDefault();
    if (inputTodo.value !== '') addTodo();
  }; // 리스트 추가


  var addTodo = function addTodo() {
    var newTodo = {
      text: inputTodo.value,
      checked: false
    };
    var newArr = [].concat(_toConsumableArray(getLocalStorage()), [newTodo]);
    inputTodo.value = '';
    showTodoList(newArr);
  }; // 리스트 렌더링 & 로컬스토리지 저장 실행


  var showTodoList = function showTodoList(list) {
    setLocalStorage(list);
    renderTodoList(list);
    sectionInactive(list);
  }; // 리스트 렌더링


  var renderTodoList = function renderTodoList(list) {
    ulTodo.innerHTML = list.map(function (todo, i) {
      return "<li class=\"todo ".concat(todo.checked === true ? 'checked' : '', "\" data-num=\"").concat(i, "\">\n            <button id=\"checkBtn\"><i class=\"fa-solid fa-check\"></i></button>\n            <span>").concat(todo.text, "</span>\n            <button id=\"deleteBtn\"><i class=\"fa-solid fa-xmark\"></i></button\n        </li>");
    }).join('');
  }; // 리스트가 없는 경우 secton에 display : none 처리


  var sectionInactive = function sectionInactive(list) {
    return list.length === 0 ? listBox.classList.add('inactive') : listBox.classList.remove('inactive');
  }; // 초기 화면 로딩


  var init = function init() {
    return showTodoList(getLocalStorage());
  };

  init(); // 클릭 이벤트 : 해당 투두 체크 또는 삭제

  var clickTodoBtn = function clickTodoBtn(e) {
    if (e.target.id === 'checkBtn') checkTodo(e);
    if (e.target.id === 'deleteBtn') deleteTodo(e);
  }; // 해당 투두 삭제


  var deleteTodo = function deleteTodo(e) {
    var deleteNum = e.target.closest('li').dataset.num;
    var newArr = getLocalStorage().filter(function (todo, i) {
      return i !== Number(deleteNum);
    });
    showTodoList(newArr);
  }; // 해당 투두 체크 표시


  var checkTodo = function checkTodo(e) {
    var checkNum = e.target.closest('li').dataset.num;
    var savedArr = getLocalStorage();

    var newArr = _toConsumableArray(savedArr);

    newArr[checkNum].checked = !savedArr[checkNum].checked;
    showTodoList(newArr);
  }; // 클릭이벤트 : 투두리스트 전체 삭제 실행


  var clearTodoList = function clearTodoList() {
    return showTodoList([]);
  };
};

window.addEventListener('DOMContentLoaded', function () {
  return todoList();
});
/******/ })()
;
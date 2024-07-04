import './index.css'
import {v4} from 'uuid'
import {useState, useEffect} from 'react'
import TodoItem from '../TodoItem'

const QuickTodo = () => {
  const [todoList, setTodoList] = useState([])
  const [todoUserInput, setTodoUserInput] = useState('')

  useEffect(() => {
    const stringifiedTodoList = localStorage.getItem('todoList')
    const parsedTodoList = JSON.parse(stringifiedTodoList)
    if (parsedTodoList !== null) {
      setTodoList(parsedTodoList)
    }
  }, [])

  const onClickSaveButton = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList))
  }

  const onAddTodoItem = () => {
    if (todoUserInput === '') {
      alert('Enter Valid Text')
    } else {
      const newTodo = {
        id: v4(),
        text: todoUserInput,
        isChecked: false,
        createdTime: new Date(),
      }

      setTodoList(prevTodoList => [...prevTodoList, newTodo])
      setTodoUserInput('')
    }
  }

  const changeTodoUserInput = event => {
    setTodoUserInput(event.target.value)
  }

  const changeCheckboxStatus = id => {
    setTodoList(prevTodoList =>
      prevTodoList.map(eachTodo =>
        eachTodo.id === id
          ? {...eachTodo, isChecked: !eachTodo.isChecked}
          : eachTodo,
      ),
    )
  }

  const deleteTodoItem = id => {
    setTodoList(prevTodoList =>
      prevTodoList.filter(eachTodo => eachTodo.id !== id),
    )
  }

  const emptyView = () => (
    <div className="empty-view">
      <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png" />
      <p className="empty-view-paragraph">
        Your list is clear! Add some tasks to get started, or take a
        well-deserved break from your conquering ways.
      </p>
    </div>
  )

  const todoItemsList = () => {
    if (todoList.length === 0) {
      return emptyView()
    }

    return (
      <ul className="todo-items-container" id="todoItemsContainer">
        {todoList.map(eachTodo => (
          <TodoItem
            key={eachTodo.id}
            todoItem={eachTodo}
            changeCheckboxStatus={changeCheckboxStatus}
            deleteTodoItem={deleteTodoItem}
          />
        ))}
      </ul>
    )
  }

  return (
    <div className="todos-bg-container">
      <h1 className="todos-heading">Quick Todo</h1>
      <h1 className="create-task-heading">
        Add <span className="create-task-heading-subpart">Task</span>
      </h1>
      <input
        type="text"
        value={todoUserInput}
        className="todo-user-input"
        placeholder="What needs to be done?"
        onChange={changeTodoUserInput}
      />
      <button className="button" onClick={onAddTodoItem}>
        Add
      </button>
      <h1 className="todo-items-heading">
        My <span className="todo-items-heading-subpart">Tasks</span>
      </h1>
      {todoItemsList()}
      <button className="button" onClick={onClickSaveButton}>
        Save
      </button>
    </div>
  )
}

export default QuickTodo

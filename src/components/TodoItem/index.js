import './index.css'
import {RiDeleteBin6Line, RiProgress5Line} from 'react-icons/ri'
import {IoIosCheckmarkCircle} from 'react-icons/io'

const getTimeDistance = date => {
  const then = new Date(date)
  const now = new Date()
  const diffInMilliseconds = Math.abs(now - then)

  const secondInMilli = 1000
  const minuteInMilli = secondInMilli * 60
  const hourInMilli = minuteInMilli * 60
  const dayInMilli = hourInMilli * 24
  const monthInMilli = dayInMilli * 30
  const yearInMilli = monthInMilli * 12

  let duration

  if (diffInMilliseconds < secondInMilli) {
    duration = 'just now'
  } else if (diffInMilliseconds < minuteInMilli) {
    duration = `${Math.floor(diffInMilliseconds / secondInMilli)} seconds ago`
  } else if (diffInMilliseconds < hourInMilli) {
    duration = `${Math.floor(diffInMilliseconds / minuteInMilli)} minutes ago`
  } else if (diffInMilliseconds < dayInMilli) {
    duration = `${Math.floor(diffInMilliseconds / hourInMilli)} hours ago`
  } else if (diffInMilliseconds < monthInMilli) {
    duration = `${Math.floor(diffInMilliseconds / dayInMilli)} days ago`
  } else if (diffInMilliseconds < yearInMilli) {
    duration = `${Math.floor(diffInMilliseconds / monthInMilli)} months ago`
  } else {
    duration = `${Math.floor(diffInMilliseconds / yearInMilli)} years ago`
  }
  return duration
}

const TodoItem = props => {
  const {todoItem, changeCheckboxStatus, deleteTodoItem} = props
  const {id, text, isChecked, createdTime} = todoItem
  const completedTaskClassName = isChecked ? 'checked' : ''

  const onClickCheckbox = () => {
    changeCheckboxStatus(id)
  }

  const onClickDeleteIcon = () => {
    deleteTodoItem(id)
  }

  const duration = getTimeDistance(createdTime)

  const todoStatus = () => {
    if (isChecked) {
      return (
        <div className="status-container">
          <IoIosCheckmarkCircle className="completed-icon" />
          <p className="completed-status-para">Completed</p>
        </div>
      )
    }
    return (
      <div className="status-container">
        <RiProgress5Line className="progress-icon" />
        <p className="progress-status-para">In Progress</p>
      </div>
    )
  }

  return (
    <li className="todo-item-container">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        className="checkbox-input"
        onChange={onClickCheckbox}
      />
      <div className="label-container">
        <div className="label-text-container">
          <label
            className={`checkbox-label ${completedTaskClassName}`}
            htmlFor={id}
          >
            {text}
          </label>
          <div className="time-status-container">
            <p className="duration-para">{duration}</p>
            {todoStatus()}
          </div>
        </div>

        <div className="delete-icon-container">
          <RiDeleteBin6Line
            className="delete-icon"
            onClick={onClickDeleteIcon}
          />
        </div>
      </div>
    </li>
  )
}

export default TodoItem

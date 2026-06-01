import clsx from 'clsx';
import style from './TodoItem.module.css';
import trashIcon from '../../assets/trash.svg';

export function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={style.todoItem}>
      <span
        className={clsx(style.todoText, todo.isDone && style.done)}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button className={style.deleteButton} onClick={() => onDelete(todo.id)}>
        <img src={trashIcon} />
      </button>
    </li>
  );
}

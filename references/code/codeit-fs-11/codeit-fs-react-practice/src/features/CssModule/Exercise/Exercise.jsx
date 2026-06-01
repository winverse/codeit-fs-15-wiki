// ✋ 일반 CSS를 CSS Module로 변경해보세요!

import { useState } from 'react';
import { nanoid } from 'nanoid';
import trashIcon from '../../ImageUsage/assets/trash.svg';

// TODO 1: 일반 CSS import를 CSS Module import로 변경하세요
// 현재: import './Panel.css';
// 변경: import styles from './Panel.module.css';
import './Panel.css';
import './TodoItem.css';
import './App.css';

function Panel({ children }) {
  // TODO 2: className을 CSS Module 방식으로 변경하세요
  // 현재: className="panel"
  // 변경: className={styles.panel}
  return <section className="panel">{children}</section>;
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    // TODO 3: TodoItem의 className들을 CSS Module 방식으로 변경하세요
    <li className="todoItem">
      <span
        className={`todoText ${todo.isDone ? 'done' : ''}`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button className="deleteButton" onClick={() => onDelete(todo.id)}>
        <img src={trashIcon} alt="삭제" />
      </button>
    </li>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      text: '리액트 기초 배우기',
      isDone: true,
    },
    {
      id: nanoid(),
      text: 'CSS Module 익히기',
      isDone: false,
    },
  ]);

  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) {
      return;
    }
    handleAddTodo();
  };

  const handleAddTodo = () => {
    if (inputText.trim() === '') return;
    const newTodo = {
      id: nanoid(),
      text: inputText,
      isDone: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInputText('');
  };

  const handleDelete = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const handleToggle = (todoId) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  return (
    // TODO 4: App의 className들을 CSS Module 방식으로 변경하세요
    <div className="appContainer">
      <div className="titleContainer">
        <h1 className="title">오늘의 할 일</h1>
        <p className="today">{new Date().toLocaleDateString()}</p>
      </div>

      <Panel>
        <div className="inputContainer">
          <input
            type="text"
            className="todoInput"
            placeholder="새로운 할 일을 입력하세요"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="addButton" onClick={handleAddTodo}>
            추가
          </button>
        </div>
      </Panel>

      <Panel>
        {todos.length === 0 ? (
          <p className="empty">할 일이 없습니다</p>
        ) : (
          <ul className="todoList">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

export default App;

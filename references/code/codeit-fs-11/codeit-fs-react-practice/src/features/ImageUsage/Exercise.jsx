// ✋ 이미지를 import해서 사용해보세요!

// TODO 1: trash.svg 파일을 import 하세요
// 힌트: import trashIcon from './assets/trash.svg';

import { useState } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

function Panel({ children }) {
  return <section className="panel">{children}</section>;
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <span
        className={`todo-text ${todo.isDone ? 'done' : ''}`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button className="delete-button" onClick={() => onDelete(todo.id)}>
        {/* TODO 2: 텍스트(×) 대신 <img src={trashIcon} alt="삭제" />로 변경하세요 */}
        ×
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
      text: '이미지 사용법 익히기',
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
    <div className="app-container">
      <h1 className="title">오늘의 할 일</h1>

      <Panel>
        <div className="input-container">
          <input
            type="text"
            className="todo-input"
            placeholder="새로운 할 일을 입력하세요"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="add-button" onClick={handleAddTodo}>
            추가
          </button>
        </div>
      </Panel>

      <Panel>
        <ul className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export default App;

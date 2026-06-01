// ✋ 참조형 State의 불변성을 지켜보세요!

// TODO 1: nanoid import 하기
// 힌트: import { nanoid } from 'nanoid';

import { useState } from 'react';
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
        ×
      </button>
    </li>
  );
}

function App() {
  // TODO 2: todos state를 객체 배열로 변경하세요
  // 힌트: { id: nanoid(), text: '...', isDone: false }
  const [todos, setTodos] = useState([
    '리액트 기초 배우기',
    '참조형 State 이해하기',
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

  // TODO 3: handleAddTodo 수정
  // 힌트: newTodo 객체 생성 { id: nanoid(), text: inputText, isDone: false }
  const handleAddTodo = () => {
    if (inputText.trim() === '') return;
    setTodos((prev) => [...prev, inputText]); // 문자열 대신 객체로 변경하세요
    setInputText('');
  };

  // TODO 4: handleDelete 함수 구현
  // 힌트: setTodos(todos.filter(todo => todo.id !== todoId))
  const handleDelete = (todoId) => {
    // 여기에 구현하세요
  };

  // TODO 5: handleToggle 함수 구현
  // 힌트: map을 사용하여 해당 id의 isDone을 반전
  const handleToggle = (todoId) => {
    // 여기에 구현하세요
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
          {/* TODO 6: key를 todo.id로, todo 객체와 함수들을 props로 전달 */}
          {todos.map((todoText, index) => (
            <li key={index} className="todo-item">
              {todoText}
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export default App;

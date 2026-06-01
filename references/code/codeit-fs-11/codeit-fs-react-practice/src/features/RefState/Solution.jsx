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
        ×
      </button>
    </li>
  );
}

function App() {
  // todos state를 객체 배열로 변경
  const [todos, setTodos] = useState([
    {
      id: nanoid(),
      text: '리액트 기초 배우기',
      isDone: true,
    },
    {
      id: nanoid(),
      text: '참조형 State 이해하기',
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

  // 할 일 추가 - 새로운 객체를 배열에 추가
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

  // 할 일 삭제 - filter로 새로운 배열 생성
  const handleDelete = (todoId) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  // 할 일 완료/미완료 토글 - map으로 새로운 배열 생성
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

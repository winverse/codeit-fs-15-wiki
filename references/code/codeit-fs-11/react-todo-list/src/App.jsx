import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Panel } from './components/Panel';
import { TodoItem } from './components/TodoItem';

import './App.css';

// type () => JSX
function App() {
  const [todos, setTodos] = useState([
    { id: nanoid(), text: '리액트 기초 배우기', isDone: false },
    { id: nanoid(), text: 'To-Do List 만들어보기', isDone: false },
  ]);

  const [input, setInput] = useState('');

  const handleKeyDown = (event) => {
    setInput(event.target.value);
  };

  const handleAddTodo = () => {
    if (input.trim() === '') return;
    const newTodo = {
      id: nanoid(),
      text: input,
      isDone: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput('');
  };

  return (
    <div className="app-container">
      <div className="title-container">
        <h1 className="title">오늘의 할 일</h1>
        <p className="today">
          오늘은 {new Date().toLocaleDateString()} 입니다.
        </p>
      </div>

      <Panel>
        <div className="input-section">
          <input
            type="text"
            placeholder="새로운 할 일을 입력하세요"
            value={input}
            onChange={(event) => handleKeyDown(event)}
          />
          <button onClick={handleAddTodo}>추가</button>
        </div>
      </Panel>

      <Panel>
        {todos.length === 0 ? (
          <p className="no-todos">할 일이 없어요! 새 할일을 추가해 보세요!</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} text={todo.text} />
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

export default App;

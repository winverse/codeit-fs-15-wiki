// ✋ 문자열 템플릿을 clsx로 개선해보세요!

import { useState } from 'react';
import { nanoid } from 'nanoid';
import trashIcon from '../../ImageUsage/assets/trash.svg';
import panelStyles from './Panel.module.css';
import todoItemStyles from './TodoItem.module.css';
import appStyles from './App.module.css';

// TODO 1: clsx를 import 하세요
// 힌트: import clsx from 'clsx';

function Panel({ children }) {
  return <section className={panelStyles.panel}>{children}</section>;
}

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todoItemStyles.todoItem}>
      {/* TODO 2: 아래 className을 clsx를 사용해서 개선하세요 */}
      {/* 방법 1: clsx(todoItemStyles.todoText, { [todoItemStyles.done]: todo.isDone }) */}
      {/* 방법 2: clsx(todoItemStyles.todoText, todo.isDone && todoItemStyles.done) */}
      <span
        className={`${todoItemStyles.todoText} ${
          todo.isDone ? todoItemStyles.done : ''
        }`}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </span>
      <button
        className={todoItemStyles.deleteButton}
        onClick={() => onDelete(todo.id)}
      >
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
      text: 'clsx 라이브러리 익히기',
      isDone: false,
    },
    {
      id: nanoid(),
      text: '조건부 클래스명 관리하기',
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
    <div className={appStyles.appContainer}>
      <div className={appStyles.titleContainer}>
        <h1 className={appStyles.title}>오늘의 할 일</h1>
        <p className={appStyles.today}>{new Date().toLocaleDateString()}</p>
      </div>

      <Panel>
        <div className={appStyles.inputContainer}>
          <input
            type="text"
            className={appStyles.todoInput}
            placeholder="새로운 할 일을 입력하세요"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className={appStyles.addButton} onClick={handleAddTodo}>
            추가
          </button>
        </div>
      </Panel>

      <Panel>
        {todos.length === 0 ? (
          <p className={appStyles.empty}>할 일이 없습니다</p>
        ) : (
          <ul className={appStyles.todoList}>
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

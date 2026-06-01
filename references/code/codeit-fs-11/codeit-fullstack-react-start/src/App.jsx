import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Panel } from './components/Panel';
import { TodoItem } from './components/TodoItem';
import style from './App.module.css';

function App() {
  const [todos, setTodos] = useState([
    { id: nanoid(), text: '리액트 기초 배우기', isDone: true },
    { id: nanoid(), text: '컴포넌트 스타일링하기', isDone: false },
  ]);

  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event) => {
    // 한글 입력 중일 때는 Enter 키 동작을 무시
    if (event.nativeEvent.isComposing) return;
    if (event.key !== 'Enter') return;
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
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  };

  const handleToogle = (todoId) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === todoId ? { ...todo, isDone: !todo.isDone } : todo)),
    );
  };

  return (
    <div className={style.appContainer}>
      <div className={style.titleContainer}>
        <h1 className={style.title}>오늘의 할 일</h1>
        <p className={style.today}>오늘은 {new Date().toLocaleDateString()} 입니다.</p>
      </div>
      <Panel>
        <div className={style.inputContainer}>
          <input
            type="text"
            className={style.todoInput}
            placeholder="새로운 할 일을 입력하세요"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className={style.addButton} onClick={handleAddTodo}>
            추가
          </button>
        </div>
      </Panel>
      <Panel>
        {todos.length === 0 ? (
          <p className={style.empty}>할 일이 없습니다!</p>
        ) : (
          <ul className={style.todoList}>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} onToggle={handleToogle} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

export default App;

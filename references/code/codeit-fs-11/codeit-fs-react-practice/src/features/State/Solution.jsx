import { useState } from 'react';
import './App.css';

function Panel({ children }) {
  return <section className="panel">{children}</section>;
}

function App() {
  // 1. 할 일 목록을 관리할 state
  const [todos, setTodos] = useState(['리액트 기초 배우기', 'State 이해하기']);

  // 2. 입력창의 값을 관리할 state
  const [inputText, setInputText] = useState('');

  // input 값이 바뀔 때마다 상태 업데이트
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Enter 키 처리
  const handleKeyDown = (event) => {
    // 한글 입력 중일 때는 Enter 키 동작을 무시
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) {
      return;
    }
    handleAddTodo();
  };

  // '추가' 버튼 클릭 시 todos 업데이트
  const handleAddTodo = () => {
    if (inputText.trim() === '') return; // 빈 값은 추가하지 않음
    setTodos((prev) => [...prev, inputText]); // 기존 배열 복사 + 새 값 추가
    setInputText(''); // 입력창 비우기
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

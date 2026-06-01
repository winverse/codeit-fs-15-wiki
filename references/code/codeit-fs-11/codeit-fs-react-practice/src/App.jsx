import { useState } from 'react';
import styles from './App.module.css';
import Welcome from './features/Welcome';
import Placeholder from './features/Placeholder';
import JsxBasics from './features/JsxBasics';
import CssBasics from './features/CssBasics';
import JsxWithJs from './features/JsxWithJs';
import Props from './features/Props';
import Fragment from './features/Fragment';
import Children from './features/Children';
import State from './features/State';
import RefState from './features/RefState';
import ImageUsage from './features/ImageUsage';
import CssModule from './features/CssModule';
import ClsxUsage from './features/ClsxUsage';

function App() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    { id: 'jsx', label: 'JSX 기초' },
    { id: 'css', label: 'CSS 스타일' },
    { id: 'jsxjs', label: 'JSX+JavaScript' },
    { id: 'props', label: 'Props' },
    { id: 'fragment', label: 'Fragment' },
    { id: 'children', label: 'Children' },
    { id: 'state', label: 'State' },
    { id: 'refstate', label: '참조형 State' },
    { id: 'image', label: '이미지 사용' },
    { id: 'cssmodule', label: 'CSS Module' },
    { id: 'clsx', label: 'clsx' },
  ];

  const renderContent = () => {
    if (!activeSection) {
      return <Welcome />;
    }

    const sectionTitle =
      sections.find((s) => s.id === activeSection)?.label ?? '기본값';

    // 각 섹션별 컴포넌트 렌더링
    switch (activeSection) {
      case 'jsx':
        return <JsxBasics />;
      case 'css':
        return <CssBasics />;
      case 'jsxjs':
        return <JsxWithJs />;
      case 'props':
        return <Props />;
      case 'fragment':
        return <Fragment />;
      case 'children':
        return <Children />;
      case 'state':
        return <State />;
      case 'refstate':
        return <RefState />;
      case 'image':
        return <ImageUsage />;
      case 'cssmodule':
        return <CssModule />;
      case 'clsx':
        return <ClsxUsage />;
      default:
        return <Placeholder title={sectionTitle} />;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <a href="/">⚛️ React 학습 플레이그라운드</a>
        </h1>
        <p className={styles.subtitle}>주제별 실습으로 React 마스터하기</p>
      </header>

      <nav className={styles.navigation}>
        {sections.map((section) => (
          <button
            key={section.id}
            className={`${styles.navButton} ${
              activeSection === section.id ? styles.active : ''
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <main className={styles.content}>{renderContent()}</main>
    </div>
  );
}

export default App;

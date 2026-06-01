import { PostProvider } from '@/providers/PostProvider';
import { HomeLayout } from './pages/HomePage/HomeLayout';

function App() {
  return (
    <PostProvider>
      <HomeLayout />
    </PostProvider>
  );
}

export default App;

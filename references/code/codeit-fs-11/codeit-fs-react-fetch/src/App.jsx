import { PostProvider } from '@/providers/PostProvider';
import { HomeLayout } from './features/Home/HomeLayout';

function App() {
  return (
    <PostProvider>
      <HomeLayout />
    </PostProvider>
  );
}

export default App;

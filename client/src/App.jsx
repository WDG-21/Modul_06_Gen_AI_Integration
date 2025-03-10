import { Route, Routes } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './pages/Home';
import ImageGenerator from './components/ImageGenerator';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='image' element={<ImageGenerator />} />
          <Route path='chat' element={<ChatWindow />} />

          <Route path='*' element={<h2>NotFound</h2>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

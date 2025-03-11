import { Route, Routes } from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import Home from './pages/Home';
import PokemonDetail from './pages/PokemonDetail';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* <Route path='/pokemon/:id' element={<PokemonDetail />} /> */}
          <Route
            path='/pokemon/:id'
            element={
              <ProtectedRoute>
                <PokemonDetail />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<h2>Not found</h2>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

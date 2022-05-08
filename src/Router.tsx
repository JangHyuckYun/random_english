import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import WordList from './routes/WordList';
import { Header } from './Header';

function Router() {
  return (
    <BrowserRouter basename={'/random_english'}>
      <Header />
      <Routes>
        <Route path="/wordList" element={<WordList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

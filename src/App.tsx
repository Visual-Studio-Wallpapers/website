import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';

import Home from './pages/Home';
import Desktop from './pages/Desktop';
import Phone from './pages/Phone';
import Watch from './pages/Watch';
import Archive from './pages/Archive';
import SweepstakesRules from './pages/SweepstakesRules';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter basename="/">
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="desktop" element={<Desktop />} />
              <Route path="phone" element={<Phone />} />
              <Route path="watch" element={<Watch />} />
              <Route path="archive" element={<Archive />} />
              <Route path="sweepstakesrules/sweepstakesrules" element={<SweepstakesRules />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

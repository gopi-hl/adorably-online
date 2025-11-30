import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PromptDetailPage from './pages/PromptDetailPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prompt/:id" element={<PromptDetailPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;

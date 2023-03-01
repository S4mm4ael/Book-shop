import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';

import { Layout } from './components/layout';
import { LayoutMainPage } from './components/layout-main-page';
import { ScrollToTop } from './hooks/scroll-to-top';
import { AuthPage } from './pages/auth';
import { BookPage } from './pages/book';
import { MainPage } from './pages/main';
import { ProfilePage } from './pages/profile';
import { RegistrationPage } from './pages/registration';
import { TermsPage } from './pages/terms';
import { booksApi } from './redux/features/books-slice';
import { store } from './redux/store';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApiProvider api={booksApi}>
    <HashRouter>
      <ScrollToTop />
      <Provider store={store}>
        <Routes>
          <Route path='/registration' element={<RegistrationPage />} />
          <Route path='/auth' element={<AuthPage contentView='auth' />} />
          <Route path='/forgot-pass' element={<AuthPage contentView='restore' />} />
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<LayoutMainPage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/all' element={<MainPage />} />
              <Route path='/books/:category' element={<MainPage />} />
              <Route path='/terms' element={<TermsPage contentView='terms' />} />
              <Route path='/contract' element={<TermsPage contentView='contract' />} />
            </Route>
            <Route path='/books/:category/:bookId' element={<BookPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
        </Routes>
      </Provider>
    </HashRouter>
  </ApiProvider>
);

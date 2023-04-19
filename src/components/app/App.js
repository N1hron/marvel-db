import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import Page404 from '../pages/404';
import MainPage from '../pages/MainPage';
import ComicsPage from '../pages/ComicsPage';
import SingleComicPage from '../pages/SingleComicPage';
import SingleCharPage from '../pages/SingleCharPage';


import './App.scss';

// const Page404 = lazy(() => import('../pages/404')),
//       MainPage = lazy(() => import('../pages/MainPage')),
//       ComicsPage = lazy(() => import('../pages/ComicsPage')),
//       SingleComicPage = lazy(() => import('../pages/SingleComicPage')),
//       SingleCharPage = lazy(() => import('../pages/SingleCharPage'));


function App() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <Router>
        <div className='app'>
          <AppHeader/>
          <main>
            <Routes>
              <Route path='/' element={<MainPage/>}/>       
              <Route path='/comics' element={<ComicsPage/>}/> 
              <Route path='/comics/:id' element={<SingleComicPage/>}/>
              <Route path='/characters/:id' element={<SingleCharPage/>}/>
              <Route path='*' element={<Page404/>}/>
            </Routes>
          </main>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;

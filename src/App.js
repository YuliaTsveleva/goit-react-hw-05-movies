import './App.css';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from './Components/Container/Container';
import Header from './Components/Header/Header';
import Loader from './Components/Loader/Loader';

const HomepageView = lazy(() =>
  import(
    './Views/HomepageView/HomepageView' /* webpackChunkName: "Homepage" */
  ),
);
const SearchbarView = lazy(() =>
  import(
    './Views/SearchbarView/SearchbarView' /* webpackChunkName: "Searchbar" */
  ),
);
const MovieDetailsView = lazy(() =>
  import(
    './Views/MovieDetailsView/MovieDetailsView' /* webpackChunkName: "MovieDetails" */
  ),
);
const NotFoundView = lazy(() =>
  import(
    './Views/NotFoundView/NotFoundView' /* webpackChunkName: "NotFound" */
  ),
);

export default function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/" exact>
              <HomepageView />
            </Route>
            <Route path="/movies" exact>
              <SearchbarView />
            </Route>
            <Route path="/movies/:slug">
              <MovieDetailsView />
            </Route>
            <Route>
              <NotFoundView />
            </Route>
          </Switch>
        </Suspense>
        <ToastContainer autoClose="3000" position="top-right" theme="colored" />
      </Container>
    </div>
  );
}

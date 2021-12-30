import './App.css';
import { Switch, Route } from 'react-router-dom';
import Container from './Components/Container/Container';
import Header from './Components/Header/Header';
import HomepageView from './Views/Homepage/HomepageView';
import SearchbarView from './Views/SearchbarView/SearchbarView';
import NotFoundView from './Views/NotFoundView/NotFoundView';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <Switch>
          <Route path="/" exact>
            <HomepageView />
          </Route>
          <Route path="/movie">
            <SearchbarView />
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
        <ToastContainer autoClose="3000" position="top-right" theme="colored" />
      </Container>
    </div>
  );
}

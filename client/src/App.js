import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import Profile from './pages/Profile';
import StubHubLogin from './pages/StubHubLogin';
import Events from './pages/Events';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/login/stubhub">
          <StubHubLogin />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path = "/events/:type">
          <Events/>
        </Route>
        <Route path = "/search/:num/:param">
          <SearchResults />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

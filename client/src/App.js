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
import GoogleMaps from './components/GoogleMaps';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/' exact>
          <Navigation />
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/login/stubhub">
          <Navigation />
          <StubHubLogin />
        </Route>
        <Route path="/profile">
          <Navigation />
          <Profile />
        </Route>
        <Route path = "/events/:type">
          <Navigation />
          <Events/>
        </Route>
        <Route path = "/search/:num/:param">
          <Navigation />
          <SearchResults />
        </Route>
        <Route path='/directions'>
          <Navigation />
          <GoogleMaps />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

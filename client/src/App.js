import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <NavBar />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

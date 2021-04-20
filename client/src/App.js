import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-bootstrap/esm/Switch';

function App() {
  return (
    <div className="App">
      <Switch>
        <NavBar />
      </Switch>
    </div>
  );
}

export default App;

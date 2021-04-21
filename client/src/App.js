import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SeatGeek from './components/SeatGeek';

function App() {
  return (
    <div className="App">
      <SeatGeek />
      <NavBar />
    </div>
  );
}

export default App;

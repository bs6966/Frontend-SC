import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Kyc from './pages/Kyc';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/kyc' element={<Kyc />} />
    </Routes>
  );
}

export default App;

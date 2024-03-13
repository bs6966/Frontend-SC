import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Kyc from './pages/Kyc';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/400.css"; // Specify weight
import "@fontsource/poppins/400-italic.css"; // Specify weight and style
import Webcam from './components/Webcam';

function App() {
  return (
    <div>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path='/kyc' element={<Kyc />} />
      <Route path='/webcam' element={<Webcam />} />
    </Routes>
    </div>
  );
}

export default App;

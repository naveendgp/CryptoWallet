import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './page/Register.jsx'; // Make sure the path is correct
import Login from './page/Login.jsx';
import Home from "./page/Home.jsx";
import MetaMask from './page/MetaMask.jsx';

function App() {
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path='/login' element={<Login/>}/> 
                <Route path='/meta' element={<MetaMask/>}/>
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;

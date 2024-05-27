import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/log/Login';

function App() {
 

  return (
   <div>
    <Routes>
      <Route path='/' element={<Login/>}/>
    </Routes>
   </div>
  )
}

export default App

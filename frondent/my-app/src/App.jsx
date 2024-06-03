import { Route, Routes } from 'react-router-dom';
import './App.css'
import Login from './pages/log/Login';
import Sign from './pages/sign/Sign';

function App() {
 

  return (
   <div>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/sign' element={<Sign/>}/>
    </Routes>
   </div>
  )
}

export default App

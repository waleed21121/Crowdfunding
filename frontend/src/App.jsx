import './App.css'
import {Route, Routes} from 'react-router'
import Campaigns from './pages/Campaigns'
import Campaign from './pages/Campaign'
import Login from './pages/Login'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Campaigns/>} />
        <Route path='/campaign/:id' element={<Campaign/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  )
}

export default App

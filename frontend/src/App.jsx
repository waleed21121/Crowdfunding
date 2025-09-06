import './App.css'
import {Route, Routes} from 'react-router'
import Campaigns from './pages/Campaigns'
import Campaign from './pages/Campaign'
import Login from './pages/Login'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import AddProject from './pages/AddProject'

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Campaigns/>} />
        <Route path='/campaign/:id' element={<Campaign/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/add-project' element={<AddProject/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App

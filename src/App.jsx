import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Nav'
import Landing from './Landing'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Pnf from './Pnf'
import Screenzaa_r from './Screenzaa_r'
import Billing_r from './Billing_r'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<><Nav></Nav><Landing></Landing></>}/>
          <Route path="*" element = {<><Nav></Nav><Pnf></Pnf></>}/>
          <Route path="/screenzaa_r" element = {<><Nav></Nav><Screenzaa_r></Screenzaa_r></>}/>
          <Route path="/Billing_r" element = {<><Nav></Nav><Billing_r></Billing_r></>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

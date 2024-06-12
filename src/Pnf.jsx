import React from 'react'
import { useLocation } from 'react-router-dom'

const Pnf = () => {
    let loc = useLocation()
  return (
    <>
        <div className="container">
            <div className="ccenter">
            404_ <span style={{color:"red"}}> {loc.pathname} </span>_ Page Not Found
            </div>
        </div>
    </>
  )
}

export default Pnf
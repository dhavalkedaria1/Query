import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from '@gsap/react'

const Nav = () => {
  const brand = useRef()
    
  let ref
  let [serch,setsearch]=useState()
  
  let getsearch = (e)=>{
    setsearch(e.target.value)
  }
  let Url=()=>{
    return <Link className="btn btn-outline-primary" to={serch?"/"+serch:"/"}>Search</Link>
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" ref={brand} href="#">
            <span>S</span>
            <span>c</span>
            <span>r</span>
            <span>e</span>
            <span>e</span>
            <span>n</span>
            <span>z</span>
            <span>a</span>
            <span>a</span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" onChange={getsearch} placeholder="Search" aria-label="Search" id="ser"/>
              <Url/>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
import React, { useState } from 'react'
import {screenzaa} from './data'


const Screenzaa_r = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
   let date=`${year}-${month}-${day}`
  let [dates,setdates]=useState(date)
  
  let setDate=(e)=>{
    setdates(e.target.value)
  }

  const MyComponent = () => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: screenzaa(dates) }}
      />
    );
  };

  const Dpick = () => {
    return (
      <div className="My-4">
          <div className="row">
              <div className="col-md-4 mx-auto">
              <input type="date" className="form-control mb-3" name="date" id="date" onBlur={setDate}/>
              </div>
          </div>
      </div>
    )
  }
  return (
    <>
    <div className="container my-5">
        <Dpick/>
        <MyComponent/>
    </div>
    </>
  )
}


export default Screenzaa_r
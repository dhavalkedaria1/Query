import React, { useState } from 'react'
import {billr} from './data'


const Billing_r = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
     let date=`${year}-${month}-${day}`
    let [dates,setdates]=useState(month)
    
    let setDate=(e)=>{
      setdates(e.target.value)
    }
  
    const MyComponent = () => {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: billr(dates) }}
        />
      );
    };
  
    const Dpick = () => {
      return (
        <div className="My-4">
            <div className="row">
                <div className="col-md-4 mx-auto">
                
                <select name="month" id="month" onChange={setDate} className='form-select mb-4'>
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
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

export default Billing_r
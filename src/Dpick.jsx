import React from 'react'

const Dpick = () => {
  return (
    <div className="My-4">
        <div className="row">
            <div className="col-md-4 mx-auto">
            <input type="date" className="form-control" name="date" id="date" />
        <button className='btn btn-outline-success my-3' onClick={getDate}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Dpick
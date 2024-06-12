import React from 'react'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <>
     <div className="container">
        <div className="grid-view">
            <div className="pallet">
                <h6>Billing Report</h6><br/>
                <Link to="Billing_r" className="cbtn">Generate</Link>
                <details className="h10">
                    <summary>Billing Report Queries</summary>
                    <p>this query usually used for query generation</p>
                </details>
            </div>
            <div className="pallet">
                <h6>Screenzaa <span className="text-warning">Full</span> Report</h6><br/>
                <Link to="Screenzaa_r" className="cbtn">Generate</Link>
                <details className="h10">
                    <summary>Screenzaa Reports All Query</summary>
                    <p>this query usually used for query generation</p>
                </details>
            </div>
            <div className="pallet">
                <h6>Screenzaa <span className="text-success">Shorted</span> Report</h6><br/>
                <a href="/" className="cbtn">Generate</a>
                <details className="h10">
                    <summary>Screenzaa Reports Shorted Query</summary>
                    <p>this query usually used for query generation</p>
                </details>
            </div>
            <div className="pallet">
                <h6>Screenzaa <span className="text-danger">Specialized</span> Queries</h6><br/>
                <a href="/" className="cbtn">Generate</a>
                <details className="h10">
                    <summary>Screenzaa Specialized Query</summary>
                    <p>this query usually used for query generation</p>
                </details>
            </div>
            <div className="pallet">
                <h6>Screenzaa <span className="text-danger">Selected-date</span> Queries</h6><br/>
                <a href="/" className="cbtn">Generate</a>
                <details className="h10">
                    <summary>Screenzaa Selected-date Query</summary>
                    <p>This Queries used for multi-date or monthy Screenzaa data</p>
                </details>
            </div>
            <div className="pallet">
                <h6><span className="text-success">Windows | Linux</span> Usefull commands</h6><br/>
                <a href="/" className="cbtn">Generate</a>
                <details className="h10">
                    <summary>Screenzaa Selected-date Query</summary>
                    <p>This Queries used for multi-date or monthy Screenzaa data</p>
                </details>
            </div>
            <div className="pallet"></div>
            <div className="pallet"></div>
        </div>
    </div>
    </>
  )
}

export default Landing
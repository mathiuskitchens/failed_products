import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { useState, useEffect } from "react";
import HitResults from "./HitResults";


const client = algoliasearch('PT2XCZUVLX', '93884bad811c587038992d98cc0767c1');
const index = client.initIndex('failed_products');


export default function App() {
const checkoutFunnies = [
  "Buy this Garbage", 
  "Are you sure?", 
  "This stuff actually IS useless", 
  "Whoops, emptied your cart!"
]

const [counter, setCounter] = useState(0)
const [cartTotal, setCartTotal] = useState(0.00)
const [cartCounter, setCartCounter] = useState(0)
const [results, setResults] = useState([]);
const [searchParams, setSearchParams] = useState('');

useEffect(() => {
  index.search(searchParams).then(({ hits }) => {
    setResults(hits);
  }).catch(error => {
    console.error('Error fetching results:', error);
 
  });
}, [searchParams]); 

const handleFinalCart = (newItem) => {
  setCartCounter(cartCounter + 1);
  setCartTotal(cartTotal + newItem.Price)
  console.log("Recieved to top parent: ", newItem)
}

  return (
    <>
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <a className="text-3xl btn btn-ghost">Failed Products Warehouse</a>
  </div>
  <div className="flex-none m-4">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">{cartCounter}</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{cartCounter} Items</span>
          <span className="text-info">Subtotal: ${cartTotal}</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block" onClick={() => {
              if(counter <= 2) {
                setCounter(counter + 1)
              } else if (counter === 3){
                setCounter(0)
                setCartTotal(0)
                setCartCounter(0)
              } else {
                setCounter(0)
                setCartTotal(0)
                setCartCounter(0)
              }
            }}>{checkoutFunnies[counter]}</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
<div className="m-4">




<label className="flex items-center gap-2 mx-auto mb-8 w-96 input input-bordered">
  <input 
    type="text" 
    className="grow" 
    placeholder="Search" 
    onChange={(e) => {
        setSearchParams(e.target.value);
  }} />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-4 h-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
      clipRule="evenodd" />
  </svg>
</label>
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {results.map((result) => (
          <HitResults hit={result} onBuyNow={handleFinalCart}/> 
            
        ))}
      </div>
    


</div>
    </>
  )
}






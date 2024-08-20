import algoliasearch from "algoliasearch/lite";
import "instantsearch.css/themes/satellite.css";
import { useState, useEffect } from "react";
import HitResults from "./HitResults";


const client = algoliasearch(import.meta.env.VITE_CLIENT_KEY, import.meta.env.VITE_CLIENT_TOKEN);
const index = client.initIndex('failed_products');

export const Search = () => {
    const [results, setResults] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [cartCounter, setCartCounter] = useState(0);
    const [cartTotal, setCartTotal] = useState(0.00)
  
    useEffect(() => {
      index.search(searchParams).then(({ hits }) => {
        setResults(hits);
      }).catch(error => {
        console.error('Error fetching results:', error);
     
      });
    }, [searchParams]); 

    const handleAddToCart = (newItem) => {
      setCartCounter(cartCounter + 1);
      setCartTotal(cartTotal + newItem.price)
    }
  
    return (
        <>
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
          <HitResults key={result.objectID} hit={result} onBuyNow={handleAddToCart}/> 
            
        ))}
      </div>
      </>
    );
  };
  
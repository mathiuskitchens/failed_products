
const HitResults = ({hit, onBuyNow}) => {

    const buyNowFunnies = [
        "Buy Later", 
        "Add to Wish List",
    ]


    const handleClick = () => {
      onBuyNow(hit)
    }
    
  return (
    <div className="shadow-2xl card bg-base-100 w-96">
  <div className="m-6 w-72 card-body">
    <h2 className="card-title">{hit.Name}</h2>
    <p>{hit.Description}</p>
    <div className="justify-end card-actions">
        <span className="pt-2 pr-8">${hit.Price}</span>
      <button className="btn btn-primary" onClick={(hit) => {
        handleClick(hit)
      }}>Buy Now</button>
    </div>
  </div>
</div>


  )
}

export default HitResults
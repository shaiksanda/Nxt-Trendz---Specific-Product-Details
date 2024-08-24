// Write your code here
const SimilarProductItem = props => {
  const {data} = props
  const updatedData = {
    imageUrl: data.image_url,
    title: data.title,
    brand: data.brand,
    price: data.price,
    rating: data.rating,
  }
  return (
    <li className="product-item-similar">
      <img src={updatedData.imageUrl} alt="product" className="thumbnail" />
      <h1 className="title">{updatedData.title}</h1>
      <p className="brand">by {updatedData.brand}</p>
      <div className="product-details">
        <p className="price">Rs {updatedData.price}/-</p>
        <div className="rating-container">
          <p className="rating">{updatedData.rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem

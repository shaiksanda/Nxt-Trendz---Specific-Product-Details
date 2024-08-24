// Write your code here
import {Component} from 'react'
import {BsPlusSquareFill} from 'react-icons/bs'
import {FaMinusCircle} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {productData: [], quantity: 1, isLoading: true, isFailure: false}

  componentDidMount() {
    this.getProductItemDetails()
  }

  handleContinueClick = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderLoaderView = () => (
    <div data-testid="loader" style={{textAlign: 'center'}}>
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="error view"
        className="error-image"
      />
      <h1>Product Not Found</h1>
      <button
        onClick={this.handleContinueClick}
        className="continue"
        type="button"
      >
        Continue Shopping
      </button>
    </div>
  )

  renderProductItemDetails = (productData, similarProducts) => {
    const {quantity} = this.state
    return (
      <div>
        <div className="product-item-details-container">
          <div style={{width: '100%'}}>
            <img src={productData.imageUrl} alt="" className="product-image" />
          </div>
          <div style={{width: '100%'}}>
            <h1>{productData.title}</h1>
            <p>Rs {productData.price} /-</p>
            <div className="ratings-container">
              <div className="ratings">
                <p>{productData.rating}</p>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="star-icon"
                />
              </div>
              <div>
                <p>{productData.totalReviews} Reviews</p>
              </div>
            </div>
            <p>{productData.description}</p>
            <p>Available: {productData.availability}</p>
            <p>Brand: {productData.brand}</p>
            <hr />
            <div className="quantity">
              <FaMinusCircle style={{marginRight: '35px', cursor: 'pointer'}} />
              <p style={{marginRight: '35px'}}>{quantity}</p>
              <BsPlusSquareFill style={{cursor: 'pointer'}} />
            </div>
            <button className="add-to-cart-button" type="button">
              ADD TO CART
            </button>
          </div>
        </div>
        <h1 style={{paddingLeft: '30px', margin: '5px'}}>Similar Products</h1>
        <div className="similar-products">
          {similarProducts.map(each => (
            <SimilarProductItem data={each} key={each.id} />
          ))}
        </div>
      </div>
    )
  }

  getProductItemDetails = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        imageUrl: data.image_url,
        price: data.price,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
        similarProducts: data.similar_products,
      }
      this.setState({productData: updatedData, isLoading: false})
    } else {
      this.setState({isLoading: false, isFailure: true})
    }
  }

  render() {
    const {productData, isLoading, isFailure} = this.state
    const {similarProducts = []} = productData

    let content
    switch (true) {
      case isLoading:
        content = this.renderLoaderView()
        break
      case isFailure:
        content = this.renderFailureView()
        break

      default:
        content = this.renderProductItemDetails(productData, similarProducts)
        break
    }

    return (
      <div style={{width: '100%'}}>
        <Header />
        {content}
      </div>
    )
  }
}

export default withRouter(ProductItemDetails)

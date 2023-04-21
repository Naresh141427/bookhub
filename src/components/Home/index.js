import Cookies from 'js-cookie'
import {Component} from 'react'
import Slider from 'react-slick'
import './index.css'

import Header from '../Header'

class Home extends Component {
  state = {topBooksList: []}

  componentDidMount() {
    this.getBooksDetails()
  }

  onSuccessfullFetching = data => {
    const updatedData = data.map(each => ({
      id: each.id,
      authorName: each.author_name,
      title: each.title,
      coverPic: each.cover_pic,
    }))

    this.setState({topBooksList: updatedData})
  }

  renderSlider = () => {
    const {topBooksList} = this.state

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings}>
        {topBooksList.map(eachBook => (
          <div className="slick-item" key={eachBook.id}>
            <img
              src={eachBook.coverPic}
              className="cover-pic"
              alt="cover pic"
            />
            <h1 className="book-title">{eachBook.title}</h1>
            <p className="book-author">{eachBook.authorName}</p>
          </div>
        ))}
      </Slider>
    )
  }

  getBooksDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSuccessfullFetching(data.books)
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="main-section">
          <div className="find-books-container">
            <h1 className="main-section-tag">Find Your Next Favorite Books?</h1>
            <p className="main-section-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button type="button" className="find-button">
              Find Books
            </button>
          </div>
          <div className="slider-container">
            <h1 className="top-books-header">Top Rated Books</h1>
            <div className="slider-wrapper">{this.renderSlider()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Home

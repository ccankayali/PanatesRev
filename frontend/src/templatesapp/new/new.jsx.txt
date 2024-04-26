import React, { useState, useEffect } from 'react';
import toastr from 'toastr';
import './new.css';

export function New() {
  const [bookList, setBookList] = useState([]);
  const [basketList, setBasketList] = useState([]);

  useEffect(() => {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: 'toast-bottom-right',
      preventDuplicates: false,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '5000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'fadeIn',
      hideMethod: 'fadeOut',
    };
  }, []);

  const getBooks = () => {
    fetch('./products.json')
      .then((response) => response.json())
      .then((books) => setBookList(books));
  };

  useEffect(() => {
    getBooks();
  }, []);

  const createBookStars = (starRate) => {
    let starRateHtml = '';
    for (let i = 1; i <= 5; i++) {
      if (Math.round(starRate) >= i) starRateHtml += '<i className="bi bi-star-fill active"></i>';
      else starRateHtml += '<i className="bi bi-star-fill"></i>';
    }

    return starRateHtml;
  };

  const createBookItemsHtml = () => {
    const bookListEl = document.querySelector('.booknew__list');
    let bookListHtml = '';
    bookList.forEach((book, index) => {
      bookListHtml += (
        <div className={`col-5 ${index % 2 === 0 && 'offset-2'} my-5`} key={book.id}>
          <div className="row booknew__card">
            <div className="col-6">
              <img
                className="img-fluid shadow"
                src={book.imgSource}
                alt={book.name || ''}
                width="258"
                height="400"
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-between">
              <div className="booknew__detail">
                <span className="fos gray fs-5">{book.author}</span><br />
                <span className="fs-4 fw-bold">{book.name}</span><br />
                <span className="book__star-rate">
                  {createBookStars(book.starRate)}
                  <span className="gray">{book.reviewCount} reviews</span>
                </span>
              </div>
              <p className="booknew__description fos gray">
                {book.description}
              </p>
              <div>
                <span className="black fw-bold fs-4 me-2">{book.price}₺</span>
                {book.oldPrice && (
                  <span className="fs-4 fw-bold old__price">{book.oldPrice}</span>
                )}
              </div>
              <button className="btnnew__purple" onClick={() => addBookToBasket(book.id)}>ADD BASKET</button>
            </div>
          </div>
        </div>
      );
    });

    bookListEl.innerHTML = bookListHtml;
  };

  const BOOK_TYPES = {
    ALL: 'Tümü',
    NOVEL: 'Roman',
    CHILDREN: 'Çocuk',
    SELFIMPROVEMENT: 'Kişisel Gelişim',
    HISTORY: 'Tarih',
    FINANCE: 'Finans',
    SCIENCE: 'Bilim',
  };

  const createBookTypesHtml = () => {
    const filterEl = document.querySelector('.filter');
    let filterHtml = '';
    let filterTypes = ['ALL'];
    bookList.forEach((book) => {
      if (filterTypes.findIndex((filter) => filter === book.type) === -1)
        filterTypes.push(book.type);
    });

    filterTypes.forEach((type, index) => {
      filterHtml += (
        <li className={index === 0 ? 'active' : null} onClick={() => filterBooks(type)} data-type={type} key={type}>
          {BOOK_TYPES[type] || type}
        </li>
      );
    });

    filterEl.innerHTML = filterHtml;
  };

  const filterBooks = (bookType) => {
    const activeFilter = document.querySelector('.filter .active');
    activeFilter.classList.remove('active');
    getBooks();
    if (bookType !== 'ALL')
      setBookList(bookList.filter((book) => book.type === bookType));
    createBookItemsHtml();
  };

  const listBasketItems = () => {
    localStorage.setItem('basketList', JSON.stringify(basketList));
    const basketListEl = document.querySelector('.basket__list');
    const basketCountEl = document.querySelector('.basket__count');
    basketCountEl.innerHTML = basketList.length > 0 ? basketList.length : null;
    const totalPriceEl = document.querySelector('.total__price');

    let basketListHtml = '';
    let totalPrice = 0;
    basketList.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
      basketListHtml += (
        <li className="basket__item" key={item.product.id}>
          <img src={item.product.imgSource} alt={item.product.name} width="100" height="100" />
          <div className="basket__item-info">
            <h3 className="book__name">{item.product.name}</h3>
            <span className="book__price">{item.product.price}₺</span><br />
            <span className="book__remove" onClick={() => removeItemToBasket(item.product.id)}>remove</span>
          </div>
          <div className="book__count">
            <span className="decrease" onClick={() => decreaseItemToBasket(item.product.id)}>-</span>
            <span className="my-5">{item.quantity}</span>
            <span className="increase" onClick={() => increaseItemToBasket(item.product.id)}>+</span>
          </div>
        </li>
      );
    });

    basketListEl.innerHTML = basketListHtml
      ? basketListHtml
      : <li className="basket__item">No items to Buy again.</li>;
    totalPriceEl.innerHTML = totalPrice > 0 ? 'Total : ' + totalPrice.toFixed(2) + '₺' : null;
  };

  const addBookToBasket = (bookId) => {
    const findedBook = bookList.find((book) => book.id === bookId);
    if (findedBook) {
      const basketAlreadyIndex = basketList.findIndex((basket) => basket.product.id === bookId);
      if (basketAlreadyIndex !== -1) {
        toastr.warning('Book already added to basket.');
      } else {
        const updatedBasketList = [...basketList, { product: findedBook, quantity: 1 }];
        setBasketList(updatedBasketList);
        toastr.success('Book added to basket successfully.');
      }
    }
  };

  const removeItemToBasket = (bookId) => {
    const updatedBasketList = basketList.filter((basket) => basket.product.id !== bookId);
    setBasketList(updatedBasketList);
    listBasketItems();
  };

  const decreaseItemToBasket = (bookId) => {
    const updatedBasketList = basketList.map((basket) => {
      if (basket.product.id === bookId) {
        if (basket.quantity !== 1) basket.quantity -= 1;
        else return null;
      }
      return basket;
    }).filter(Boolean);
    setBasketList(updatedBasketList);
    listBasketItems();
  };

  const increaseItemToBasket = (bookId) => {
    const updatedBasketList = basketList.map((basket) => {
      if (basket.product.id === bookId) {
        if (basket.quantity < basket.product.stock) basket.quantity += 1;
        else toastr.error("Sorry, we don't have enough stock.");
      }
      return basket;
    });
    setBasketList(updatedBasketList);
    listBasketItems();
  };

  useEffect(() => {
    listBasketItems();
  }, [basketList, listBasketItems]);

  useEffect(() => {
    createBookItemsHtml();
    createBookTypesHtml();
  }, [bookList, createBookItemsHtml, createBookTypesHtml]);

  return (
    <div>
      <nav className="navbarnew">
        <h2 className="titlenew">PANATES</h2>
        <ul className="menunew">
          <li className="active">ÜRÜNLER</li>
          <li className="active">
            <a href="/about">ABOUT</a>
          </li>
        </ul>
        <ul className="menunew__icons">
          <li className="nav-item">
            <a className="nav-link deactive" aria-current="page" href="#">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link deactive" aria-current="page" href="#">
              Register
            </a>
          </li>
          <li className="basketnew__icon" /*onclick={toggleModal()}*/>
            <i className="bi bi-bag" />
            <span className="basketnew__count" />
          </li>
        </ul>
      </nav>
      <section className="slider">
        <div
          id="carouselBookSlider"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://www.panates.com/assets/image/veri-danismanligi.jpg"
                className="d-block w-100"
                alt="Data Consultant"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.panates.com/assets/image/satis-sonrasi-destek.jpg"
                className="d-block w-100"
                alt="After Sales Support"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.panates.com/assets/image/crm-sistemi.jpg"
                className="d-block w-100"
                alt="CRM System"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselBookSlider"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselBookSlider"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
      <section className="storenew my-5">
        <div className="filternew__background" />
        <ul className="filternew">
          <li className="active">Tümü</li>
          <li>Roman</li>
          <li>Kişisel Gelişim</li>
          <li>Fantastik</li>
        </ul>
        <div className="row booknew__list" />
      </section>
      <div className="basketnew__modal">
        <div className="basketnew__items">
          <i className="bi bi-x" /*onclick={toggleModal()}*/ />
          <h2 className="basketnew__title">Your Items</h2>
          <ul className="basketnew__list">
            <li className="basketnew__item">No items to Buy again.</li>
          </ul>
          <div className="basketnew__total">
            <span className="fw-bold mb-3 fs-4 total__price" />
            <button className="btnnew__purple">CHECOKUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

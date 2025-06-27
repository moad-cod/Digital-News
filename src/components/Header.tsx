'use client';


import React, { useState } from 'react';
import './header.css';
import Nav from './Nav';
import Sci from './Sci';
import SearchForm from './SearchForm';
export default function Header() {

  const [open, setOpen] = useState(false);
  const [on, setOn] =useState(false);
  const handleFormOpen = (e: Event | unknown) => {
    if (e && typeof (e as Event).preventDefault === 'function') {
      (e as Event).preventDefault();
    }
    setOpen(!open);
  };

  const handleToggleMenu=( ) => {
    setOn(!on);
    const body: HTMLElement | null = document.querySelector('body');
    body?.classList.toggle('mobile-nav-active');
  };

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <a href="/" className='logo d-flex align-items'>
          <h1>DigitalNews</h1>
        </a>
        <Nav/>

        <div className="position-relative">
          <Sci></Sci>
          <a className='mx-2 js-search-open' onClick={handleFormOpen}>
            <span className='bi-search'></span>
          </a>
          {
            on ? (
              <i className='bi bi-x mobile-nav-toggle' onClick={handleToggleMenu}></i>
              
            ) : (
              <i className='bi bi-list mobile-nav-toggle'
                onClick={handleToggleMenu}
              ></i>
            )
          }
          <SearchForm active={open} formOpen={handleFormOpen}></SearchForm>
        </div>
      </div>
    </header>
  )
}

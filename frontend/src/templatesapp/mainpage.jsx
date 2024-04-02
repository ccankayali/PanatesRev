import React from 'react';
import "./mainpage.css";

export function MainPage() {
  return (
    <div>
      <a href="https://panates.com" className="logomain" target="_blank" rel="noreferrer">
                <img src="https://avatars.githubusercontent.com/u/27950435?s=200&v=4" alt="" />
            </a>

      <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" />
      <label htmlFor="menu-icon"></label>

      <nav className="nav">
        <ul className="pt-5">
          <li><a href="/pure">Login-SignUp</a></li>
          <li><a href="#">Studio</a></li>
          <li><a href="#">News</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <div className="section-center">
        <h1 className="mb-0">PANATES</h1>
      </div>
    </div>
  );
}



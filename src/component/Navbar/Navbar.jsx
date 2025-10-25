import React, { useState } from 'react'
import './Navbar.scss'
import { useNavigate } from "react-router-dom";
import logo from "../../assets/sdm-logo.png"
import { useLanguage } from '../../context/LanguageContext'
import { t } from '../../translations'
import kannada from "../../assets/kannada.jpeg"
import hindi from "../../assets/hindi.jpeg"
import english from "../../assets/english.jpeg"

function Navbar(props) {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', image: english },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳', image: kannada },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', image: hindi }
  ]

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language) || languages[0]
  }

  const currentLang = getCurrentLanguage()

  const changeLogin = () => {
    navigate("/login");
  }

  const handleClick = (e) => {

    const currentClass = document.getElementsByClassName('naving');
    for (let i = 0; i < currentClass.length; i++) {
      currentClass[i].classList.remove('active');
    }
    currentClass[e].classList.add('active');
  }



  return (
    <div className='navbar-div'>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <h2 style={{ color: "var(--red)", fontWeight: "600", textDecoration: "underline" }}>{t('hopeRecoveryCenter', language)}</h2>
          {/* <a className="navbar-brand" href="/#"><img src={logo} alt="" /></a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
            <a className="nav-link naving active" aria-current="page" onClick={() => {navigate('/menu'); handleClick(0)}}>Menu</a>
          </li> */}
              <li className="nav-item">
                <a className="nav-link naving active" onClick={() => { navigate('/about'); handleClick(0); }}>{t('aboutUs', language)}</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link naving" onClick={() => handleClick(1)}>Contact</a>
              </li> */}
              {/* <li className="nav-item">
            <a className="nav-link naving" onClick={() => {handleClick(3)}}>Contact</a>
          </li> */}
              <li className="nav-item dropdown">
                {/* <button className="btn btn-language dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className='bx bx-world'></i> {currentLang.flag} {currentLang.name}
                </button> */}
                <ul className="dropdown-menu">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <a
                        className={`dropdown-item ${language === lang.code ? 'active' : ''}`}
                        href="javascript:void(0)"
                        onClick={() => changeLanguage(lang.code)}
                      >
                        <img src={lang.image} alt="" style={{ width: '20px', marginRight: '8px' }} />
                        <span className="align-middle">{lang.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>

            </ul>
            <button className="btn btn-register" type="submit" onClick={changeLogin}>{t('login', language)}</button>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

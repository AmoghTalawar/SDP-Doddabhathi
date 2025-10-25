import React from "react";
import "./Home.scss";
import Navbar from "../../component/Navbar/Navbar"
import cr1 from "../../assets/b2.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../translations";
import cr2 from "../../assets/banner1.png";




function Home() {
  const { language } = useLanguage();

  return (
    <div className="home-page">

      <Navbar />

      <div className="scroller">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-bs-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={cr1} class="d-block w-100" alt="..." />
            </div>
            
            <div class="carousel-item">
              <img src={cr2} class="d-block w-100" alt="..." />
            </div>
            
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="content">

        <h3 style={{ color: "var(--red)", textAlign: "center" }}>{t('homeQuote', language)}</h3>

        <br></br>
        <hr></hr>

        <h2>{t('aboutUs', language)}</h2>

        <p>{t('hopeDescription', language)}</p>

        <br></br>

        <h2>{t('vision', language)}</h2>

        <p>{t('visionDescription', language)}</p>
        <br></br>

        <h2>{t('mission', language)}</h2>

        <ul>
          <li>
            <p>{t('missionPoint1', language)}</p>
          </li>
          <li>
            <p>{t('missionPoint2', language)}</p>
          </li>
          <li>
            <p>{t('missionPoint3', language)}</p>
          </li>
          <li>
            <p>{t('missionPoint4', language)}</p>
          </li>
        </ul>





        <br>
        </br>

        <div className="item">
          <div className="left">
            <img src="https://www.tapovana.org.in/public/nusrat-assets/images/about/about-us.jpg" alt="" />
          </div>
          <div className="right">
            <h4>{t('ShashiKumar', language)}</h4>
            <p>{t('frPradeepDescription', language)}</p>
          </div>
        </div>

        <hr />




        <div className="item">
          <div className="left">
            {/* <img src={cr7} alt="" /> */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247228.92243732026!2d75.850494!3d14.48745!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba2edec8f1cde9%3A0x53f2bf5ecbd22881!2sTapovana%20Medical%20College%20Of%20Naturopathy%20And%20Yogic%20Science%20%7C%7C%20Doddabathi!5e0!3m2!1sen!2sus!4v1748080871538!5m2!1sen!2sus" width="100%" height="250px" style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="right">
            <h4>{t('contactUs', language)}</h4>
            <p><strong>{t('address', language)}:</strong> {t('hopeRecoveryCenter', language)},
              {t('janathaPlot', language)}
              <br />
              <strong>{t('phone', language)}:</strong> 08192-291822
              <br></br>
              <strong>{t('mobile', language)}:</strong> +91 9538889838
              <br></br>

              <strong>{t('email', language)}:</strong> tapovanamedicalcollege@gmail.com
            </p>
          </div>
        </div>

        

      </div>

    </div>
  );
}

export default Home;

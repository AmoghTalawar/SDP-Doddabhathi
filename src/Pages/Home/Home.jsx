import React from "react";
import "./Home.scss";
import Navbar from "../../component/Navbar/Navbar"
import cr1 from "../../assets/b2.jpg";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../translations";
import cr2 from "../../assets/banner1.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Home() {
  const { language } = useLanguage();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* Enhanced Hero Section with Modern Wellness Aesthetic */}
      <motion.div
        className="scroller"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="carousel-inner">
            <motion.div
              className="carousel-item active"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.img
                src={cr1}
                className="d-block w-100"
                alt="Wellness Center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="carousel-item"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <motion.img
                src={cr2}
                className="d-block w-100"
                alt="Medical Care"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>

          <motion.button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </motion.button>

          <motion.button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <div className="content">
        <div className="floating-elements">
          <div className="float-1">🌸</div>
          <div className="float-2">🌱</div>
          <div className="float-3">🕉️</div>
          <div className="float-4">🌺</div>
        </div>
        <div className="wellness-patterns"></div>
        {/* Enhanced Quote Section with Wellness Aesthetic */}
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          {t('homeQuote', language)}
        </motion.h3>

        <motion.hr
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        ></motion.hr>

        {/* About Us Section with Modern Card Design */}
        <motion.div
          className="wellness-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {t('aboutUs', language)}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {t('hopeDescription', language)}
          </motion.p>
        </motion.div>

        <motion.hr
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        ></motion.hr>

        {/* Vision Section with Enhanced Layout */}
        <motion.div
          className="wellness-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {t('vision', language)}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            {t('visionDescription', language)}
          </motion.p>
        </motion.div>

        <br></br>

        {/* Services Section */}
        <motion.div
          className="services-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>Our Wellness Services</motion.h2>
          <motion.div className="services-grid" variants={staggerContainer}>
            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">🌿</div>
              <h3>Naturopathy</h3>
              <p>Holistic healing through natural therapies and lifestyle modifications.</p>
            </motion.div>
            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">🧘</div>
              <h3>Yoga Therapy</h3>
              <p>Ancient practices for modern wellness, combining physical postures and meditation.</p>
            </motion.div>
            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">🌸</div>
              <h3>Acupuncture</h3>
              <p>Traditional Chinese medicine techniques for pain relief and healing.</p>
            </motion.div>
            <motion.div className="service-card" variants={fadeInUp}>
              <div className="service-icon">🌱</div>
              <h3>Herbal Medicine</h3>
              <p>Natural remedies using medicinal plants and herbs for various health conditions.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        <br></br>

        {/* Mission Section with Modern List Design */}
        <motion.div
          className="wellness-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {t('mission', language)}
          </motion.h2>
          <motion.ul variants={staggerContainer}>
            <motion.li variants={fadeInLeft}>
              <p>{t('missionPoint1', language)}</p>
            </motion.li>
            <motion.li variants={fadeInRight}>
              <p>{t('missionPoint2', language)}</p>
            </motion.li>
            <motion.li variants={fadeInLeft}>
              <p>{t('missionPoint3', language)}</p>
            </motion.li>
            <motion.li variants={fadeInRight}>
              <p>{t('missionPoint4', language)}</p>
            </motion.li>
          </motion.ul>
        </motion.div>

        {/* Leadership Section with Modern Card */}
        <motion.div
          className="item"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="left" variants={fadeInLeft}>
            <img
              src="https://www.tapovana.org.in/public/nusrat-assets/images/about/about-us.jpg"
              alt="Dr. Shashi Kumar"
            />
          </motion.div>
          <motion.div className="right" variants={fadeInRight}>
            <h4>{t('ShashiKumar', language)}</h4>
            <p>{t('frPradeepDescription', language)}</p>
            <div className="actions">
              <button className="btn btn--primary">
                Learn More
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.hr
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        />

        {/* Contact Section with Modern Design */}
        <motion.div
          className="item"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="left" variants={fadeInLeft}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d247228.92243732026!2d75.850494!3d14.48745!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bba2edec8f1cde9%3A0x53f2bf5ecbd22881!2sTapovana%20Medical%20College%20Of%20Naturopathy%20And%20Yogic%20Science%20%7C%7C%20Doddabathi!5e0!3m2!1sen!2sus!4v1748080871538!5m2!1sen!2sus"
              width="100%"
              height="250px"
              style={{border: 0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tapovana Medical College Location"
            ></iframe>
          </motion.div>
          <motion.div className="right" variants={fadeInRight}>
            <h4>{t('contactUs', language)}</h4>
            <p>
              <strong>Address:</strong> {t('hopeRecoveryCenter', language)}, {t('janathaPlot', language)}
              <br />
              <strong>Phone:</strong> 08192-291822
              <br />
              <strong>Mobile:</strong> +91 9538889838
              <br />
              <strong>Email:</strong> tapovanamedicalcollege@gmail.com
            </p>
            <div className="actions">
              <button className="btn">
                Get Directions
              </button>
              <button className="btn btn--primary">
                Contact Us
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          className="testimonials-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp}>What Our Patients Say</motion.h2>
          <motion.div className="testimonials-grid" variants={staggerContainer}>
            <motion.div className="testimonial-card" variants={fadeInUp}>
              <div className="testimonial-content">
                <p>"The naturopathy treatments at Tapovana have transformed my health. I feel more energetic and balanced than ever before."</p>
                <div className="testimonial-author">
                  <strong>Sarah Johnson</strong>
                  <span>Wellness Patient</span>
                </div>
              </div>
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            </motion.div>
            <motion.div className="testimonial-card" variants={fadeInUp}>
              <div className="testimonial-content">
                <p>"The yoga therapy sessions helped me manage my stress and anxiety. The instructors are knowledgeable and caring."</p>
                <div className="testimonial-author">
                  <strong>Michael Chen</strong>
                  <span>Yoga Therapy Patient</span>
                </div>
              </div>
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            </motion.div>
            <motion.div className="testimonial-card" variants={fadeInUp}>
              <div className="testimonial-content">
                <p>"Amazing facility with dedicated professionals. The herbal treatments have significantly improved my overall well-being."</p>
                <div className="testimonial-author">
                  <strong>Priya Sharma</strong>
                  <span>Herbal Medicine Patient</span>
                </div>
              </div>
              <div className="testimonial-rating">⭐⭐⭐⭐⭐</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          className="cta-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <motion.div
            className="cta-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h3 variants={fadeInUp}>Start Your Wellness Journey Today</motion.h3>
            <motion.p variants={fadeInUp}>Experience the healing power of natural medicine and holistic care at our premier wellness center.</motion.p>
            <motion.div className="actions" variants={staggerContainer}>
              <motion.button className="btn btn--primary" variants={fadeInUp}>Book Consultation</motion.button>
              <motion.button className="btn" variants={fadeInUp}>Learn More</motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;

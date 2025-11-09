import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import { motion } from "framer-motion";

import axios from "axios";

import { useNavigate } from "react-router";
import { GET_PATIENT_USER, GET_USER_CAMP } from "../../../utils/apiConstant";
import Loader from "../../Loader/Loader";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";

// import SoberPeriodPrediction from "../../../Pages/Faculty/PredictPatient/SoberPeriodPrediction";

function Dashboard() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const auth = localStorage.getItem("facultyAuth");
  const [activeCamps, setActiveCamps] = useState([]);
  const [inactiveCamps, setInactiveCamps] = useState([]);

  // const [patients, setPatients] = useState();
  const [locationId, setLocationId] = useState();
  const [patientData, setPatients] = useState([]);
  const [translatedPatients, setTranslatedPatients] = useState(null);

  const currentDate = new Date().toISOString();

  const [loading, setLoading] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Function to translate text using Google Translate API
  const translateText = async (text, targetLang) => {
    if (!text) return text;
    try {
      const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await response.json();
      return data[0][0][0];
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  const getCamps = async () => {
    await axios
      .get(GET_USER_CAMP, { headers: headers })
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setLocationId(res.data.data[0].locationId);
          console.log("CAMP : ", res.data.data[0].locationId);
        } else {
          console.error("No camp data available");
          setLocationId(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPatients = async () => {
    await axios
      .get(GET_PATIENT_USER, { headers: headers })
      .then((res) => {
        console.log(res);
        setPatients(res.data.data);
        localStorage.setItem("patients", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setPatient = (id) => {
    console.log(id);
    navigate(`/patientview/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    getPatients();
    getCamps();

    setLoading(false);
  }, []);

  // Translate patient data when language is Kannada
  useEffect(() => {
    if (language === 'kn' && patientData && patientData.length > 0) {
      const translateData = async () => {
        const translated = await Promise.all(
          patientData.map(async (p) => {
            const translatedName = await translateText(p.name, 'kn');
            const translatedAddress = await translateText(p.address, 'kn');
            const translatedDate = await translateText(p.createdAt.split("T")[0], 'kn');
            return {
              ...p,
              translatedName,
              translatedAddress,
              translatedDate
            };
          })
        );
        setTranslatedPatients(translated);
      };
      translateData();
    } else {
      setTranslatedPatients(null);
    }
  }, [language, patientData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const handleClearBtn = () => {
    setSearchQuery("");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Add a small delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 300));
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.clear();
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const filteredPatients = patientData.filter((data) => {
    if (!data || !data.name) return false;
    const name = data.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    console.log("data : ", name.includes(query));
    return name.includes(query);
    // data.phone.includes(searchQuery) ||
    // data.patientId.includes(searchQuery)
    // Add more fields here as needed
  });

  // return (
  //   <div className="faculty-dashboard">
  //     <div className="header">
  //       <button
  //         onClick={() => {
  //           localStorage.clear();
  //           navigate("/login");
  //         }}
  //       >
  //         <i class="bi bi-box-arrow-left"></i>
  //       </button>
  //     </div>
  //     {loading ? <Loader /> : null}

  //     <div className="camps-list">
  //       <h6>Patients List</h6>
  //       {activeCamps
  //         ? activeCamps.map((data, key) => {
  //             console.log("hi");
  //             console.log("Key : ", key);
  //             return (
  //               <div className="camp">
  //                 <p>
  //                   {data.name} - (<span>{data.createdAt.split("T")[0]}</span>){" "}
  //                 </p>
  //                 <div className="controls">
  //                   <button
  //                     onClick={() => navigate(`/patientAdd/${data.faculty[0]}`)}
  //                   >
  //                     Add Patient
  //                   </button>
  //                   <button onClick={() => setPatient(data.faculty[0])}>
  //                     View Patients
  //                   </button>
  //                 </div>
  //               </div>
  //             );
  //           })
  //         : null}
  //     </div>

  //     {/* <div className="camps-list">
  //       <h6>Past Camp Data</h6>
  //       {inactiveCamps
  //         ? inactiveCamps.map((data, key) => {
  //             return (
  //               <div className="camp">
  //                 <p>
  //                   {data.name} - (<span>{data.createdAt.split("T")[0]}</span>){" "}
  //                 </p>
  //                 <div className="controls">
  //                   <button onClick={() => setPatient(data._id)}>
  //                     View Patients
  //                   </button>
  //                 </div>
  //               </div>
  //             );
  //           })
  //         : null}
  //     </div> */}

  //     {/* <div className="prediction-buttons">
  //       <h6>Prediction models</h6>
  //       <div class="controls">
  //         <button onClick={() => navigate(`/predictSoberPeriod`)}>
  //           Sober Period Prediction
  //         </button>
  //         <button>AAI Prediction</button>
  //         <button>Quality Of Lfe Prediction</button>
  //       </div>
  //     </div> */}
  //   </div>
  // );

  return (
    <motion.div
      className="patientData"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.i
          class={`bi bi-arrow-left-square-fill ${isLoggingOut ? 'logging-out' : ''}`}
          onClick={handleLogout}
          disabled={isLoggingOut}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        ></motion.i>
      </motion.div>

      <motion.div
        className="patient-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="header">
          <h6>{t('patientsList', language)}</h6>
          <div className="buttons1">
            <motion.button
              onClick={() => navigate(`/patientAdd/${locationId}`)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {t('addPatient', language)}
            </motion.button>

            <div className="input-wrap1">
              <i className="fas fa-search"></i>

              <input
                onChange={handleSearchChange}
                value={searchQuery}
                type="text"
                name="product-search"
                id="product-search"
                placeholder={t('searchPatients', language)}
              />
              <i onClick={handleClearBtn} className="fas fa-times"></i>
            </div>
          </div>
        </div>
      </motion.div>

      {filteredPatients.length != 0 ? (
        <motion.div
          className="patient-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {filteredPatients.map((data, key) => {
            const translatedData = translatedPatients?.find(tp => tp._id === data._id) || data;
            return (
              <motion.div
                className="patient"
                key={data._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: key * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <p>
                  {translatedData.translatedName || data.name} - ({translatedData.translatedAddress || data.address}), {translatedData.translatedDate || data.createdAt.split("T")[0]}{" "}
                </p>
                <div className="controls">
                  <motion.button
                    onClick={() => navigate(`/patient/${data._id}`)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <i class="bi bi-eye"></i>
                  </motion.button>
                  <motion.button
                    onClick={() => navigate(`/patient/${data._id}`)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <i class="bi bi-pencil-square"></i>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.p
          className="no-patient"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          No Patients To Display
        </motion.p>
      )}

      {/* <div className="prediction-buttons">
        <h6>Prediction models</h6>
        <div class="controls">
          <button onClick={() => navigate(`/predictSoberPeriod`)}>
            Sober Period Prediction
          </button>
          <button>AAI Prediction</button>
          <button>Quality Of Lfe Prediction</button>
        </div>
      </div> */}
    </motion.div>
  );
}

export default Dashboard;

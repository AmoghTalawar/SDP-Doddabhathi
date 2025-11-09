import React, { useState, useEffect } from "react";
import PatientModal from "../Modal/PatientModal";
import axios from "axios";
import { GET_CAMP, GET_FACULTY, GET_LOCATIONS } from "../../utils/apiConstant";
import { useLanguage } from "../../context/LanguageContext";
import { t } from "../../translations";
import { motion } from "framer-motion";

function Camp({
  setLoading,
  unallocatedPatientsList,
  faculty,
  location,
  setTrigger,
}) {
  const [product, setProduct] = useState();
  const [showModal, setShowModal] = useState(false);
  //   const [trigger, setTrigger] = useState();
  const [data, setData] = useState();

  const [unallocatedPatients, setUnallocatedPatients] = useState([]);
  const [translatedPatients, setTranslatedPatients] = useState(null);

  const { language } = useLanguage();

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

  useEffect(() => {
    if (unallocatedPatientsList) {
      var obj = [];
      for (var i of unallocatedPatientsList) {
        const a = {
          value: i._id,
          label: i.name,
          patientId: i.patientId,
        };
        if (!i.isAdmin) {
          obj.push(a);
        }
      }

      setUnallocatedPatients(obj);
    }
  }, [unallocatedPatientsList]);

  // Translate patient data when language is Kannada
  useEffect(() => {
    if (language === 'kn' && unallocatedPatientsList && unallocatedPatientsList.length > 0) {
      const translateData = async () => {
        const translated = await Promise.all(
          unallocatedPatientsList.map(async (p) => {
            const translatedName = await translateText(p.name, 'kn');
            return {
              ...p,
              translatedName
            };
          })
        );
        setTranslatedPatients(translated);
      };
      translateData();
    } else {
      setTranslatedPatients(null);
    }
  }, [language, unallocatedPatientsList]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <motion.div
      className="content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <PatientModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
        setData={setData}
        setTrigger={setTrigger}
        location={location}
        unallocatedPatients={unallocatedPatients}
        faculties={faculty}
      />

      <motion.div
        className="header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h4>{t('nonAllocatedPatients', language)}</h4>
        <motion.button
          className="add-btn"
          onClick={openModal}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {t('allocatePatient', language)}
        </motion.button>
      </motion.div>

      <motion.div
        className="table-div"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <table className="table">
          <thead className="table-header">
            <tr>
              <th scope="col">Patient ID</th>
              <th scope="col">Patient Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {unallocatedPatientsList &&
              unallocatedPatientsList.filter(data => data).map((data, key) => {
                const translatedData = translatedPatients?.find(tp => tp._id === data._id) || data;
                return (
                  <motion.tr
                    key={key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: key * 0.1 }}
                    whileHover={{ scale: 1.01, backgroundColor: 'rgba(16, 185, 129, 0.05)' }}
                  >
                    <th scope="row">{data.patientId}</th>
                    <td>
                      <p>{translatedData.translatedName || data.name}</p>
                    </td>
                    <td>
                      <div className="patient-list">
                        {unallocatedPatients.length > 0 && (
                          <p className="allocation-status">Allocated</p>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}

export default Camp;

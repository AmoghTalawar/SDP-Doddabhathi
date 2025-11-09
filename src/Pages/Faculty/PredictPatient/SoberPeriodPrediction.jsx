import React, { useState } from "react";
import axios from "axios";
import "./soberPeriodPrediction.scss";
import { SOBER_PERIOD } from "./../../../utils/apiConstant.js";
import { useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";

const SoberPeriodPrediction = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "Marital Status": -1,
    "smoking/smokeless": -1,
    "Motivation factor": -1,
    "Willingness for treatment": -1,
    "Sugar(mg)": -1,
    "Risk Level": -1,
    "RCA_liked the effect and wanted more of it": -1,
    MPPR_no: -1,
    "Number of relapses (based on period of treatment)": 0,
    "Period of sober": 0,
  });
  const [outputData, setOutputData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;

    if (type === "number") {
      // For number inputs, parse as float and handle empty values
      const numValue = value === "" ? 0 : parseFloat(value, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: isNaN(numValue) ? 0 : numValue,
      }));
    } else {
      // For radio buttons, convert string values to numbers, keep -1 for no selection
      const numValue = value === "" ? -1 : parseInt(value, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: isNaN(numValue) ? -1 : numValue,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log("hello");
      console.log("Form : ", formData);
      const response = await axios.post(SOBER_PERIOD, formData);
      // console.log("data sent");

      setOutputData(response.data.result);
      // console.log(outputData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="question-box">
      <div className="header1">
        <i
          className="bi bi-arrow-left-square-fill"
          onClick={() => {
            localStorage.clear();
            navigate(-1);
          }}
        ></i>
      </div>
      
      <div className="form-container">
        <div className="page-header">
          <div className="header-icon">⏱️</div>
          <h1>{t('soberPeriodPrediction', language)}</h1>
          <p className="subtitle">Predict the period of sobriety for patient recovery</p>
          <div className="instructions">
            <p>
              <strong>How to use:</strong> Click on each option to select your answers.
              For questions with numbers, enter the appropriate value. All questions must be answered to get accurate predictions.
            </p>
          </div>
        </div>

        <div className="progress-indicator">
          <div className="step completed">1</div>
          <div className="step">2</div>
          <div className="step">3</div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">👤</span>
              Personal Information
            </h3>
            
            <div className="question">
              <label>{t('areYouMarried', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Marital Status"
                  value="0"
                  checked={formData["Marital Status"] === 0}
                  onChange={handleInputChange}
                  id="married-yes"
                />
                <label htmlFor="married-yes" className="option">
                  {t('yes', language)}
                </label>
                
                <input
                  type="radio"
                  name="Marital Status"
                  value="1"
                  checked={formData["Marital Status"] === 1}
                  onChange={handleInputChange}
                  id="married-no"
                />
                <label htmlFor="married-no" className="option">
                  {t('no', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('doYouSmoke', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="smoking/smokeless"
                  value="0"
                  checked={formData["smoking/smokeless"] === 0}
                  onChange={handleInputChange}
                  id="smoke-yes"
                />
                <label htmlFor="smoke-yes" className="option">
                  {t('yes', language)}
                </label>
                
                <input
                  type="radio"
                  name="smoking/smokeless"
                  value="1"
                  checked={formData["smoking/smokeless"] === 1}
                  onChange={handleInputChange}
                  id="smoke-no"
                />
                <label htmlFor="smoke-no" className="option">
                  {t('no', language)}
                </label>
              </div>
            </div>
          </div>

          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">💪</span>
              Motivation & Treatment
            </h3>
            
            <div className="question">
              <label>{t('motivationFactor', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Motivation factor"
                  value="0"
                  checked={formData["Motivation factor"] === 0}
                  onChange={handleInputChange}
                  id="motivation-moderate"
                />
                <label htmlFor="motivation-moderate" className="option">
                  {t('moderate', language)}
                </label>
                
                <input
                  type="radio"
                  name="Motivation factor"
                  value="1"
                  checked={formData["Motivation factor"] === 1}
                  onChange={handleInputChange}
                  id="motivation-severe"
                />
                <label htmlFor="motivation-severe" className="option">
                  {t('severe', language)}
                </label>
                
                <input
                  type="radio"
                  name="Motivation factor"
                  value="2"
                  checked={formData["Motivation factor"] === 2}
                  onChange={handleInputChange}
                  id="motivation-willing"
                />
                <label htmlFor="motivation-willing" className="option">
                  {t('willing', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('willingnessForTreatment', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Willingness for treatment"
                  value="0"
                  checked={formData["Willingness for treatment"] === 0}
                  onChange={handleInputChange}
                  id="treatment-willing"
                />
                <label htmlFor="treatment-willing" className="option">
                  {t('willing', language)}
                </label>
                
                <input
                  type="radio"
                  name="Willingness for treatment"
                  value="1"
                  checked={formData["Willingness for treatment"] === 1}
                  onChange={handleInputChange}
                  id="treatment-ambivalent"
                />
                <label htmlFor="treatment-ambivalent" className="option">
                  {t('ambivalent', language)}
                </label>
                
                <input
                  type="radio"
                  name="Willingness for treatment"
                  value="2"
                  checked={formData["Willingness for treatment"] === 2}
                  onChange={handleInputChange}
                  id="treatment-unwilling"
                />
                <label htmlFor="treatment-unwilling" className="option">
                  {t('unwilling', language)}
                </label>
              </div>
            </div>
          </div>

          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">🏥</span>
              Medical Assessment
            </h3>
            
            <div className="question">
              <label>{t('sugar', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Sugar(mg)"
                  value="0"
                  checked={formData["Sugar(mg)"] === 0}
                  onChange={handleInputChange}
                  id="sugar-normal"
                />
                <label htmlFor="sugar-normal" className="option">
                  {t('normal', language)}
                </label>
                
                <input
                  type="radio"
                  name="Sugar(mg)"
                  value="1"
                  checked={formData["Sugar(mg)"] === 1}
                  onChange={handleInputChange}
                  id="sugar-no"
                />
                <label htmlFor="sugar-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="Sugar(mg)"
                  value="2"
                  checked={formData["Sugar(mg)"] === 2}
                  onChange={handleInputChange}
                  id="sugar-diabetic"
                />
                <label htmlFor="sugar-diabetic" className="option">
                  {t('diabetic', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('riskLevel', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Risk Level"
                  value="1"
                  checked={formData["Risk Level"] === 1}
                  onChange={handleInputChange}
                  id="risk-low"
                />
                <label htmlFor="risk-low" className="option">
                  {t('lowRisk', language)}
                </label>
                
                <input
                  type="radio"
                  name="Risk Level"
                  value="2"
                  checked={formData["Risk Level"] === 2}
                  onChange={handleInputChange}
                  id="risk-medium"
                />
                <label htmlFor="risk-medium" className="option">
                  {t('mediumRisk', language)}
                </label>
                
                <input
                  type="radio"
                  name="Risk Level"
                  value="3"
                  checked={formData["Risk Level"] === 3}
                  onChange={handleInputChange}
                  id="risk-high"
                />
                <label htmlFor="risk-high" className="option">
                  {t('highRisk', language)}
                </label>
                
                <input
                  type="radio"
                  name="Risk Level"
                  value="4"
                  checked={formData["Risk Level"] === 4}
                  onChange={handleInputChange}
                  id="risk-very-high"
                />
                <label htmlFor="risk-very-high" className="option">
                  {t('veryHighRisk', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('reasonContinueOptions', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="RCA_liked the effect and wanted more of it"
                  value="0"
                  checked={formData["RCA_liked the effect and wanted more of it"] === 0}
                  onChange={handleInputChange}
                  id="continue-no"
                />
                <label htmlFor="continue-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="RCA_liked the effect and wanted more of it"
                  value="1"
                  checked={formData["RCA_liked the effect and wanted more of it"] === 1}
                  onChange={handleInputChange}
                  id="continue-yes"
                />
                <label htmlFor="continue-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('presentMedicalProblem', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="MPPR_no"
                  value="0"
                  checked={formData["MPPR_no"] === 0}
                  onChange={handleInputChange}
                  id="medical-no"
                />
                <label htmlFor="medical-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="MPPR_no"
                  value="1"
                  checked={formData["MPPR_no"] === 1}
                  onChange={handleInputChange}
                  id="medical-yes"
                />
                <label htmlFor="medical-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>
          </div>

          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">📊</span>
              Numerical Data
            </h3>
            
            <div className="question">
              <label>{t('totalNumberOfRelapses', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="Number of relapses (based on period of treatment)"
                  value={formData["Number of relapses (based on period of treatment)"]}
                  onChange={handleInputChange}
                  placeholder="Enter number of relapses"
                />
              </div>
            </div>

            <div className="question">
              <label>{t('periodOfSoberGroup', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="Period of sober"
                  value={formData["Period of sober"]}
                  onChange={handleInputChange}
                  placeholder="Enter period in days"
                />
              </div>
            </div>
          </div>

          <div className="submit-section">
            <button type="submit">
              {t('submit', language)} & Analyze
            </button>
          </div>
        </form>
      </div>

      {outputData && (
        <div className="output-box">
          <div className="result-icon">📈</div>
          <h4>{t('periodOfSoberGroup', language)}</h4>
          <p className="result-value">{outputData}</p>
        </div>
      )}
    </div>
  );
};

export default SoberPeriodPrediction;

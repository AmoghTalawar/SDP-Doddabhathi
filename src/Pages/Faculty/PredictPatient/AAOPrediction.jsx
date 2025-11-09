import React, { useState } from "react";
import axios from "axios";
import "./soberPeriodPrediction.scss";
import { AAI_PREDICTION } from "./../../../utils/apiConstant.js";
import { useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";

const AAOPrediction = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    Age: 0,
    "Weight while admission (In Kg)": 0,
    "duration of use of alcohol": 0,
    "Alcohol Risk Level": 0,
    "duration of excessive use of alcohol": 0,
    AWS_Stages: 0,
    "smoking/smokeless": -1,
    "Nicotine (yes/NO)": -1,
    "R_to feel better/confident/happy": 0,
    "R_to avoid problems and sadness": 0,

    "R_to try": 0,
    "ACE_Poverty or severe debts": 0,
    "ACE_Scholastic backwardness": 0,
    "ACE_Early parental loss": 0,
    "ACE_Broken home or single parenting": 0,
    "ACE_Running away from home": 0,
    "Psy_Aggressive Outbursts": 0,
    Psy_Confusion: 0,
    Psy_Hallucinations: 0,
    Psy_Depression: 0,

    C_Diabetes: -1,
    "Family history of alcoholism / drug abuse, if any (who and which type of drug)":
      -1,

    "At what age did you start working?": 0,
    "S_Family or relationship issues": 0,
    "S_Financial Stress": 0,
    "S_Work related stress": 0,
    "S_Reports Stressed but doesn’t know where or what": 0,
    "Did you have any period of unemployment": -1,
    "How many first degree relatives had Substance addiction": 0,

    "any instance of family violence": -1,
    "Marital Status": -1,
    "multiple marriages": -1,
    "Record extra marital experiences": -1,
    "At present do you have any sexual problem ( if yes mention)": -1,
    "Legal complications yes/no": -1,
  });
  const [outputData, setOutputData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Check if the input element is a checkbox
    if (type === "checkbox") {
      const updatedValue = checked ? 1 : 0; // Set to 1 if checked, 0 if unchecked
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: updatedValue,
      }));
    } else {
      if (type === "number") {
        // For number inputs, parse as float and handle empty values
        const numValue = value === "" ? 0 : parseFloat(value, 10);
        if (isNaN(numValue)) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: 0,
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: numValue,
          }));
        }
      }
      // For other input types (radio, text, etc.), convert to number if it's a valid number string
      else {
        const numValue = value === "" ? 0 : parseInt(value, 10);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: isNaN(numValue) ? 0 : numValue,
        }));
      }
    }
  };

  const handleSubmit = async (event) => {
    console.log("FORM DATA : ", formData);
    event.preventDefault();
    try {
      // console.log("hello");
      const response = await axios.post(AAI_PREDICTION, formData);
      // console.log("data sent");
      console.log(response);
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
          <div className="header-icon">🧠</div>
          <h1>{t('aaiPrediction', language)}</h1>
          <p className="subtitle">Predict age of alcohol initiation for early intervention</p>
          <div className="instructions">
            <p>
              <strong>How to use:</strong> Answer all questions by clicking on options or entering values.
              Multiple selections are allowed for checkboxes. This comprehensive assessment helps predict the age when alcohol use began.
            </p>
          </div>
        </div>

        <div className="progress-indicator">
          <div className="step completed">1</div>
          <div className="step">2</div>
          <div className="step">3</div>
          <div className="step">4</div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Reasons to Start Alcohol */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">💭</span>
              {t('reasonToStartAlcohol', language)}
            </h3>
            <div className="question">
              <label>Select all that apply:</label>
              <div className="input-group">
                <input
                  type="checkbox"
                  name="R_to avoid problems and sadness"
                  checked={formData["R_to avoid problems and sadness"]}
                  onChange={handleInputChange}
                  id="reason-avoid-problems"
                />
                <label htmlFor="reason-avoid-problems" className="option">
                  {t('toAvoidProblemsAndSadness', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="R_to feel better/confident/happy"
                  checked={formData["R_to feel better/confident/happy"]}
                  onChange={handleInputChange}
                  id="reason-feel-better"
                />
                <label htmlFor="reason-feel-better" className="option">
                  {t('toFeelBetterConfidentHappy', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="R_to try"
                  checked={formData["R_to try"]}
                  onChange={handleInputChange}
                  id="reason-try"
                />
                <label htmlFor="reason-try" className="option">
                  {t('toTry', language)}
                </label>
              </div>
            </div>
          </div>

          {/* Personal Habits */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">🚬</span>
              Personal Habits
            </h3>
            
            <div className="question">
              <label>{t('doYouSmoke', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="smoking/smokeless"
                  value="0"
                  checked={formData["smoking/smokeless"] === 0}
                  onChange={handleInputChange}
                  id="smoke-no"
                />
                <label htmlFor="smoke-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="smoking/smokeless"
                  value="1"
                  checked={formData["smoking/smokeless"] === 1}
                  onChange={handleInputChange}
                  id="smoke-yes"
                />
                <label htmlFor="smoke-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('doYouIntakeNicotine', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Nicotine (yes/NO)"
                  value="0"
                  checked={formData["Nicotine (yes/NO)"] === 0}
                  onChange={handleInputChange}
                  id="nicotine-no"
                />
                <label htmlFor="nicotine-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="Nicotine (yes/NO)"
                  value="1"
                  checked={formData["Nicotine (yes/NO)"] === 1}
                  onChange={handleInputChange}
                  id="nicotine-yes"
                />
                <label htmlFor="nicotine-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>
          </div>

          {/* Social & Medical History */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">👥</span>
              Social & Medical History
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
                  id="married-no"
                />
                <label htmlFor="married-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="Marital Status"
                  value="1"
                  checked={formData["Marital Status"] === 1}
                  onChange={handleInputChange}
                  id="married-yes"
                />
                <label htmlFor="married-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('multipleMarriages', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="multiple marriages"
                  value="0"
                  checked={formData["multiple marriages"] === 0}
                  onChange={handleInputChange}
                  id="multiple-marriages-no"
                />
                <label htmlFor="multiple-marriages-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="multiple marriages"
                  value="1"
                  checked={formData["multiple marriages"] === 1}
                  onChange={handleInputChange}
                  id="multiple-marriages-yes"
                />
                <label htmlFor="multiple-marriages-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('atPresentSexualProblem', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="At present do you have any sexual problem ( if yes mention)"
                  value="0"
                  checked={formData["At present do you have any sexual problem ( if yes mention)"] === 0}
                  onChange={handleInputChange}
                  id="sexual-problem-no"
                />
                <label htmlFor="sexual-problem-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="At present do you have any sexual problem ( if yes mention)"
                  value="1"
                  checked={formData["At present do you have any sexual problem ( if yes mention)"] === 1}
                  onChange={handleInputChange}
                  id="sexual-problem-yes"
                />
                <label htmlFor="sexual-problem-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('recordExtraMaritalExperiences', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Record extra marital experiences"
                  value="0"
                  checked={formData["Record extra marital experiences"] === 0}
                  onChange={handleInputChange}
                  id="extra-marital-no"
                />
                <label htmlFor="extra-marital-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="Record extra marital experiences"
                  value="1"
                  checked={formData["Record extra marital experiences"] === 1}
                  onChange={handleInputChange}
                  id="extra-marital-yes"
                />
                <label htmlFor="extra-marital-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('anyInstanceOfFamilyViolence', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="any instance of family violence"
                  value="0"
                  checked={formData["any instance of family violence"] === 0}
                  onChange={handleInputChange}
                  id="family-violence-no"
                />
                <label htmlFor="family-violence-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="any instance of family violence"
                  value="1"
                  checked={formData["any instance of family violence"] === 1}
                  onChange={handleInputChange}
                  id="family-violence-yes"
                />
                <label htmlFor="family-violence-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('didYouHavePeriodOfUnemployment', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Did you have any period of unemployment"
                  value="0"
                  checked={formData["Did you have any period of unemployment"] === 0}
                  onChange={handleInputChange}
                  id="unemployment-no"
                />
                <label htmlFor="unemployment-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="Did you have any period of unemployment"
                  value="1"
                  checked={formData["Did you have any period of unemployment"] === 1}
                  onChange={handleInputChange}
                  id="unemployment-yes"
                />
                <label htmlFor="unemployment-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>
          </div>

          {/* Medical & Family History */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">🏥</span>
              Medical & Family History
            </h3>
            
            <div className="question">
              <label>{t('doYouHaveDiabetes', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="C_Diabetes"
                  value="0"
                  checked={formData["C_Diabetes"] === 0}
                  onChange={handleInputChange}
                  id="diabetes-no"
                />
                <label htmlFor="diabetes-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="C_Diabetes"
                  value="1"
                  checked={formData["C_Diabetes"] === 1}
                  onChange={handleInputChange}
                  id="diabetes-yes"
                />
                <label htmlFor="diabetes-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('familyHistoryOfAlcoholismDrugAbuse', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Family history of alcoholism / drug abuse, if any (who and which type of drug)"
                  value="0"
                  checked={formData["Family history of alcoholism / drug abuse, if any (who and which type of drug)"] === 0}
                  onChange={handleInputChange}
                  id="family-history-no"
                />
                <label htmlFor="family-history-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="Family history of alcoholism / drug abuse, if any (who and which type of drug)"
                  value="1"
                  checked={formData["Family history of alcoholism / drug abuse, if any (who and which type of drug)"] === 1}
                  onChange={handleInputChange}
                  id="family-history-yes"
                />
                <label htmlFor="family-history-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>

            <div className="question">
              <label>{t('legalComplications', language)}</label>
              <div className="input-group">
                <input
                  type="radio"
                  name="Legal complications yes/no"
                  value="0"
                  checked={formData["Legal complications yes/no"] === 0}
                  onChange={handleInputChange}
                  id="legal-no"
                />
                <label htmlFor="legal-no" className="option">
                  {t('no', language)}
                </label>
                
                <input
                  type="radio"
                  name="Legal complications yes/no"
                  value="1"
                  checked={formData["Legal complications yes/no"] === 1}
                  onChange={handleInputChange}
                  id="legal-yes"
                />
                <label htmlFor="legal-yes" className="option">
                  {t('yes', language)}
                </label>
              </div>
            </div>
          </div>

          {/* Alcohol Withdrawal Symptoms */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">⚕️</span>
              {t('alcoholWithdrawalSymptomStage', language)}
            </h3>
            <div className="question">
              <label>Select the current stage:</label>
              <div className="input-group">
                {[0, 1, 2, 3, 4].map((stage) => (
                  <React.Fragment key={stage}>
                    <input
                      type="radio"
                      name="AWS_Stages"
                      value={stage}
                      checked={formData["AWS_Stages"] === stage}
                      onChange={handleInputChange}
                      id={`aws-stage-${stage}`}
                    />
                    <label htmlFor={`aws-stage-${stage}`} className="option">
                      {t(`stage${stage}`, language)}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Psychiatric Complications */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">🧠</span>
              {t('psychiatricComplication', language)}
            </h3>
            <div className="question">
              <label>Select all that apply:</label>
              <div className="input-group">
                <input
                  type="checkbox"
                  name="Psy_Confusion"
                  checked={formData["Psy_Confusion"]}
                  onChange={handleInputChange}
                  id="psy-confusion"
                />
                <label htmlFor="psy-confusion" className="option">
                  {t('confusion', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="Psy_Hallucinations"
                  checked={formData["Psy_Hallucinations"]}
                  onChange={handleInputChange}
                  id="psy-hallucinations"
                />
                <label htmlFor="psy-hallucinations" className="option">
                  {t('presentHallucinations', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="Psy_Aggressive Outbursts"
                  checked={formData["Psy_Aggressive Outbursts"]}
                  onChange={handleInputChange}
                  id="psy-aggressive"
                />
                <label htmlFor="psy-aggressive" className="option">
                  {t('presentAggressiveOutbursts', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="Psy_Depression"
                  checked={formData["Psy_Depression"]}
                  onChange={handleInputChange}
                  id="psy-depression"
                />
                <label htmlFor="psy-depression" className="option">
                  {t('presentDepression', language)}
                </label>
              </div>
            </div>
          </div>

          {/* ACE (Adverse Childhood Experiences) */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">👶</span>
              {t('ace', language)}
            </h3>
            <div className="question">
              <label>Select all that apply:</label>
              <div className="input-group">
                <input
                  type="checkbox"
                  name="ACE_Running away from home"
                  checked={formData["ACE_Running away from home"]}
                  onChange={handleInputChange}
                  id="ace-running-away"
                />
                <label htmlFor="ace-running-away" className="option">
                  {t('runningAwayFromHome', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="ACE_Broken home or single parenting"
                  checked={formData["ACE_Broken home or single parenting"]}
                  onChange={handleInputChange}
                  id="ace-broken-home"
                />
                <label htmlFor="ace-broken-home" className="option">
                  {t('brokenHomeOrSingleParenting', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="ACE_Early parental loss"
                  checked={formData["ACE_Early parental loss"]}
                  onChange={handleInputChange}
                  id="ace-early-loss"
                />
                <label htmlFor="ace-early-loss" className="option">
                  {t('earlyParentalLoss', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="ACE_Scholastic backwardness"
                  checked={formData["ACE_Scholastic backwardness"]}
                  onChange={handleInputChange}
                  id="ace-scholastic"
                />
                <label htmlFor="ace-scholastic" className="option">
                  {t('scholasticBackwardness', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="ACE_Poverty or severe debts"
                  checked={formData["ACE_Poverty or severe debts"]}
                  onChange={handleInputChange}
                  id="ace-poverty"
                />
                <label htmlFor="ace-poverty" className="option">
                  {t('povertyOrSevereDebts', language)}
                </label>
              </div>
            </div>
          </div>

          {/* Stressors */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">😰</span>
              {t('stressors', language)}
            </h3>
            <div className="question">
              <label>Select all that apply:</label>
              <div className="input-group">
                <input
                  type="checkbox"
                  name="S_Family or relationship issues"
                  checked={formData["S_Family or relationship issues"]}
                  onChange={handleInputChange}
                  id="stress-family"
                />
                <label htmlFor="stress-family" className="option">
                  {t('familyOrRelationshipIssues', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="S_Financial Stress"
                  checked={formData["S_Financial Stress"]}
                  onChange={handleInputChange}
                  id="stress-financial"
                />
                <label htmlFor="stress-financial" className="option">
                  {t('financialStress', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="S_Work related stress"
                  checked={formData["S_Work related stress"]}
                  onChange={handleInputChange}
                  id="stress-work"
                />
                <label htmlFor="stress-work" className="option">
                  {t('workRelatedStress', language)}
                </label>
                
                <input
                  type="checkbox"
                  name="S_Reports Stressed but doesn't know where or what"
                  checked={formData["S_Reports Stressed but doesn't know where or what"]}
                  onChange={handleInputChange}
                  id="stress-unknown"
                />
                <label htmlFor="stress-unknown" className="option">
                  {t('reportsStressedButDoesNotKnow', language)}
                </label>
              </div>
            </div>
          </div>

          {/* Numerical Data */}
          <div className="question-section">
            <h3 className="section-title">
              <span className="section-icon">📊</span>
              Numerical Measurements
            </h3>
            
            <div className="question">
              <label>{t('riskLevel', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="Alcohol Risk Level"
                  value={formData["Alcohol Risk Level"]}
                  onChange={handleInputChange}
                  placeholder="Enter risk level (0-10)"
                />
              </div>
            </div>

            <div className="question">
              <label>{t('age', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="Age"
                  value={formData["Age"]}
                  onChange={handleInputChange}
                  placeholder="Enter age in years"
                />
              </div>
            </div>

            <div className="question">
              <label>{t('weightWhileAdmission', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="Weight while admission (In Kg)"
                  value={formData["Weight while admission (In Kg)"]}
                  onChange={handleInputChange}
                  placeholder="Enter weight in kg"
                />
              </div>
            </div>

            <div className="question">
              <label>{t('durationOfUseOfAlcohol', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="duration of use of alcohol"
                  value={formData["duration of use of alcohol"]}
                  onChange={handleInputChange}
                  placeholder="Enter duration in years"
                />
              </div>
            </div>

            <div className="question">
              <label>{t('durationOfExcessiveUseOfAlcohol', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="duration of excessive use of alcohol"
                  value={formData["duration of excessive use of alcohol"]}
                  onChange={handleInputChange}
                  placeholder="Enter duration in years"
                />
              </div>
            </div>

            <div className="question">
              <label>{t('atWhatAgeDidYouStartWorking', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="At what age did you start working?"
                  value={formData["At what age did you start working?"]}
                  onChange={handleInputChange}
                  placeholder="Enter starting age"
                />
              </div>
            </div>

            <div className="question">
              <label>{t('howManyFirstDegreeRelativesHadSubstanceAddiction', language)}</label>
              <div className="number-input">
                <input
                  type="number"
                  name="How many first degree relatives had Substance addiction"
                  value={formData["How many first degree relatives had Substance addiction"]}
                  onChange={handleInputChange}
                  placeholder="Enter number of relatives"
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
          <div className="result-icon">🎯</div>
          <h4>{t('ageOfAlcoholInitiation', language)}</h4>
          <p className="result-value">{outputData} years</p>
        </div>
      )}
    </div>
  );
};

export default AAOPrediction;

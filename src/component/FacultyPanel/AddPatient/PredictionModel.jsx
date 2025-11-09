import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./AddPatient.scss";
import { useNavigate } from "react-router";
import { useLanguage } from "../../../context/LanguageContext";
import { t } from "../../../translations";

function PredictionModels() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const onCLickHandle = () => {
    navigate(`/predictSoberPeriod`);
  };

  const riskLevelHandle = () => {
    navigate(`/predictRiskLevel`);
  };

  const aaoHandle = () => {
    navigate(`/predictAAO`);
  };

  return (
    <div className="prediction-buttons">
      <div className="prediction-header">
        <h3>{t('predictionModel', language)}</h3>
        <p>Choose a prediction model to analyze patient data</p>
      </div>
      <div className="controls">
        <button onClick={onCLickHandle}>
          <i></i>
          {t('soberPeriodPrediction', language)}
        </button>
        <button onClick={aaoHandle}>
          <i></i>
          {t('aaiPrediction', language)}
        </button>
        <button onClick={riskLevelHandle}>
          <i></i>
          {t('riskLevelPrediction', language)}
        </button>
      </div>
    </div>
  );
}

export default PredictionModels;

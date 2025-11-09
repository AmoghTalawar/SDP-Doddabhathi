import React, { useState } from "react";
import { useParams } from "react-router";
import BasicInfo from "../../component/FacultyPanel/AddPatient/BasicInfo";
import BasicInfo2 from "../../component/FacultyPanel/AddPatient/BasicInfo2";
import BasicInfo3 from "../../component/FacultyPanel/AddPatient/BasicInfo3";
import BasicInfo4 from "../../component/FacultyPanel/AddPatient/BasicInfo4";
import BasicInfo5 from "../../component/FacultyPanel/AddPatient/BasicInfo5";
import PredictionModels from "../../component/FacultyPanel/AddPatient/PredictionModel";

import Loader from "../../component/Loader/Loader";
import "./AddPatientPage.scss";
import TabChange from "../../component/TabChange/TabChange";
import { motion, AnimatePresence } from "framer-motion";

const tabList = [
  {
    name: "basicInfo",
    step: 1,
  },
  {
    name: "medicalHistory",
    step: 2,
  },
  {
    name: "familyHistory",
    step: 3,
  },
  {
    name: "pastTreatmentHistory",
    step: 4,
  },
  {
    name: "counsellorSection",
    step: 5,
  },
  {
    name: "predictionModels",
    step: 6,
  },
];

function AddPatientPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState(null);

  console.log("AddPatientPage - URL params id:", id);

  // Reset data when step changes to avoid conflicts
  const handleStepChange = (newStep) => {
    setStep(newStep);
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -50 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <motion.div
      className="add-patient"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {loading && <Loader />}

      <motion.div
        className="form-progress-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="progress-info">
          <h2>Add New Patient</h2>
          <p>Step {step} of {tabList.length}</p>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(step / tabList.length) * 100}%` }}
          ></div>
        </div>
      </motion.div>

      <TabChange tabList={tabList} setStep={handleStepChange} step={step} />

      <div className="form-container">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <BasicInfo
                prevData={false}
                setData={setData}
                data={data}
                setStep={setStep}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <BasicInfo2
                prevData={false}
                setData={setData}
                data={data}
                setStep={setStep}
                setLoading={setLoading}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <BasicInfo3
                prevData={false}
                setData={setData}
                data={data}
                setStep={setStep}
                setLoading={setLoading}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <BasicInfo4
                prevData={false}
                setData={setData}
                data={data}
                setStep={setStep}
                setLoading={setLoading}
              />
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <BasicInfo5
                prevData={false}
                setData={setData}
                data={data}
                setStep={setStep}
                setLoading={setLoading}
              />
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="step6"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <PredictionModels />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default AddPatientPage;

import React from 'react'
import "./TabChange.scss"
import { t } from "../../translations"
import { useLanguage } from "../../context/LanguageContext"
import { motion } from "framer-motion"

const TabChange = ({
    tabList, setStep, step
}) => {
    const { language } = useLanguage();

    const tabVariants = {
        inactive: {
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            color: "#64748b",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)"
        },
        active: {
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "#ffffff",
            boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)",
            scale: 1.05
        }
    };

    return (
        <motion.div
            className='tablist'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {tabList && tabList.map((data, key) => (
                <motion.div
                    key={key}
                    className='tablist-tab'
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: key * 0.1 }}
                >
                    <motion.button
                        className={step == data.step ? "active" : "inactive"}
                        onClick={() => setStep(data.step)}
                        variants={tabVariants}
                        animate={step == data.step ? "active" : "inactive"}
                        whileHover={{
                            scale: step == data.step ? 1.05 : 1.02,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <span className="tab-number">{data.step}</span>
                        <span className="tab-text">{t(data.name, language)}</span>
                        {step == data.step && (
                            <motion.div
                                className="active-indicator"
                                layoutId="activeTab"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </motion.button>
                </motion.div>
            ))
            }
        </motion.div>
    )
}

export default TabChange
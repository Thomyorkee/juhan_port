import React from "react";
import "View/css/common.css";
import "View/css/introduce.css";
import { motion } from "framer-motion";
import Profile from "./components/profile";
import Capability from "./components/capa";
import Experience from "./components/experience";
import Certificate from "./components/certificate";
import { ContentBox } from "View/Parts/content-box/content-box";

const Introduce = () => {
  return (
    <motion.div
      className="content_inside intro_bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="wrap_full wrap">
        <ContentBox type={true} title={"PROFILE"} content={<Profile />} />
        <ContentBox type={true} title={"CAPABILITY"} content={<Capability />} />
      </div>
      <div className="wrap_half wrap">
        <ContentBox type={true} title={"CERTIFICATE"} content={<Certificate />} />
        <ContentBox type={true} title={"EXPERIENCE"} content={<Experience />} />
      </div>
    </motion.div>
  );
};

export default Introduce;

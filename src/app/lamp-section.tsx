"use client";

import React from "react";
import { LampContainer } from "~/app/_components/lamp";
import { motion } from "framer-motion";
export default function LampSection() {
  return (
    <div>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: -25 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Fellow Controller
          <br />
          <br /> سامانه همکاری پرسنل
        </motion.h1>
      </LampContainer>
    </div>
  );
}

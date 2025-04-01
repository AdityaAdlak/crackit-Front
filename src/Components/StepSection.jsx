import { motion } from "framer-motion";
import { FaCode, FaBrain, FaCheckCircle } from "react-icons/fa"; // Importing Icons

export default function CrackITSteps() {
  return (
    <div className="bg-black text-white py-16 px-6 md:px-12">
      
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Crack Your Interview with <span className="text-blue-500">CrackIT</span> in 3 Simple Steps
      </motion.h2>

     
      <div className="grid md:grid-cols-3 gap-8">
      
        <motion.div
          className="border-l-4 border-blue-500 p-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaCode className="text-blue-500 text-4xl mb-4" />
          <h3 className="text-2xl font-semibold mb-3">1. Master Core Concepts</h3>
          <p className="text-gray-300">
            Prepare with a structured **set of 50 questions** per difficulty level, covering **core subjects & DSA**.
          </p>
        </motion.div>

     
        <motion.div
  className="border-l-4 border-blue-500 p-6"
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  <FaBrain className="text-blue-500 text-4xl mb-4" />
  <h3 className="text-2xl font-semibold mb-3">2. AI-Powered Interview Analysis</h3>
  <p className="text-gray-300">
    Get **AI-driven feedback** on your answers, helping you improve your coding, theoretical knowledge, and core subject understanding.
  </p>
</motion.div>


        
        <motion.div
          className="border-l-4 border-blue-500 p-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FaCheckCircle className="text-blue-500 text-4xl mb-4" />
          <h3 className="text-2xl font-semibold mb-3">3. AI-Driven Performance Analysis</h3>
          <p className="text-gray-300">
            Get instant **AI feedback** on your answers with **improvement tracking & analytics**.
          </p>
        </motion.div>
      </div>

     
     
    </div>
  );
}

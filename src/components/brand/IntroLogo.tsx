// src/components/IntroLogo.tsx
import { useEffect, useState } from "react";
//import { motion, Variants } from "framer-motion";

// const createVariants = (initialX: number, initialY: number): Variants => ({
//   initial: {
//     x: initialX,
//     y: initialY,
//     opacity: 0,
//   },
//   animate: {
//     x: 0,
//     y: 0,
//     opacity: 1,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//     },
//   },
// });

// export default function IntroLogo() {
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     setIsAnimating(true);
//   }, []);

//   return (
//     <div className="intro-wrapper">
//       <div className="intro-logo">
//         {/* small "a" */}
//         <motion.div
//           className="intro-logo__a"
//           variants={createVariants(0, -80)}
//           initial="initial"
//           animate={isAnimating ? "animate" : "initial"}
//         >
//           <span>a</span>
//         </motion.div>

//         {/* Proctor */}
//         <motion.div
//           className="intro-logo__proctor"
//           variants={createVariants(-200, 0)}
//           initial="initial"
//           animate={isAnimating ? "animate" : "initial"}
//         >
//           <span>Proctor</span>
//         </motion.div>

//         {/* House Studio */}
//         <motion.div
//           className="intro-logo__house mt-2 ml-24"
//           variants={createVariants(200, 0)}
//           initial="initial"
//           animate={isAnimating ? "animate" : "initial"}
//         >
//           <span>House Studio</span>
//         </motion.div>

//         {/* production */}
//         <motion.div
//           className="intro-logo__production"
//           variants={createVariants(0, 80)}
//           initial="initial"
//           animate={isAnimating ? "animate" : "initial"}
//         >
//           <span>production</span>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
// src/components/IntroLogo.tsx
import { motion } from "framer-motion";

export default function IntroLogo() {
  return (
    <div className="intro-logo">
      {/* "a" – from top */}
      <motion.p
        className="home-hero__a"
        initial={{ x: 0, y: -220, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
      >
        a
      </motion.p>

      {/* Proctor wrapper lets us nudge without touching the animated element */}
      <div className="home-hero__proctor-wrap">
        {/* "Proctor" – from left */}
        <motion.p
          className="home-hero__proctor"
          initial={{ x: -600, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          Proctor
        </motion.p>
      </div>

      {/* House Studio wrapper for rightward nudge */}
      <div className="home-hero__house-wrap">
        {/* "House Studio" – from right */}
        <motion.p
          className="home-hero__house-studio"
          initial={{ x: 600, y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.18, ease: "easeOut" }}
        >
          House Studio
        </motion.p>
      </div>

      {/* "production" – from bottom */}
      <div className="home-hero__production-wrap">
        <motion.p
          className="home-hero__production"
          initial={{ x: 0, y: 260, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.24, ease: "easeOut" }}
        >
          production
        </motion.p>
      </div>
    </div>
  );
}

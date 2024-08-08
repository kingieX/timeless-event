import { useEffect, useRef } from 'react';
import heroImage from '/image/hero4.png';
import { motion, useAnimation } from 'framer-motion';

// images
import Asset1 from '/image/assets/asset1.svg';
import Asset2 from '/image/assets/asset2.svg';
import Asset3 from '/image/assets/asset3.svg';
import Asset4 from '/image/assets/asset4.svg';
import Asset5 from '/image/assets/asset5.svg';
import Asset6 from '/image/assets/asset6.svg';
import Asset7 from '/image/assets/asset7.svg';

import Arrow from '/image/assets/arrow-down.svg';

const HowItWorks = () => {
  const step1Ref = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const step5Ref = useRef(null);
  const step6Ref = useRef(null);
  const step7Ref = useRef(null);

  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const controls6 = useAnimation();
  const controls7 = useAnimation();

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === step1Ref.current) {
            controls1.start({ opacity: 1, y: 0 });
          }
          if (entry.target === step2Ref.current) {
            controls2.start({ opacity: 1, y: 0 });
          }
          if (entry.target === step3Ref.current) {
            controls3.start({ opacity: 1, y: 0 });
          }
          if (entry.target === step4Ref.current) {
            controls4.start({ opacity: 1, y: 0 });
          }
          if (entry.target === step5Ref.current) {
            controls5.start({ opacity: 1, y: 0 });
          }
          if (entry.target === step6Ref.current) {
            controls6.start({ opacity: 1, y: 0 });
          }
          if (entry.target === step7Ref.current) {
            controls7.start({ opacity: 1, y: 0 });
          }
        } else {
          if (entry.target === step1Ref.current) {
            controls1.start({ opacity: 0, y: 50 });
          }
          if (entry.target === step2Ref.current) {
            controls2.start({ opacity: 0, y: 50 });
          }
          if (entry.target === step3Ref.current) {
            controls3.start({ opacity: 0, y: 50 });
          }
          if (entry.target === step4Ref.current) {
            controls4.start({ opacity: 0, y: 50 });
          }
          if (entry.target === step5Ref.current) {
            controls5.start({ opacity: 0, y: 50 });
          }
          if (entry.target === step6Ref.current) {
            controls6.start({ opacity: 0, y: 50 });
          }
          if (entry.target === step7Ref.current) {
            controls7.start({ opacity: 0, y: 50 });
          }
        }
      });
    }, options);

    observer.observe(step1Ref.current);
    observer.observe(step2Ref.current);
    observer.observe(step3Ref.current);
    observer.observe(step4Ref.current);
    observer.observe(step5Ref.current);
    observer.observe(step6Ref.current);
    observer.observe(step7Ref.current);

    return () => {
      observer.disconnect();
    };
  }, [
    controls1,
    controls2,
    controls3,
    controls4,
    controls5,
    controls6,
    controls7,
  ]);

  return (
    <section className="">
      <img src={heroImage} alt="Hero" className="w-full h-auto object-cover" />
      <div className="container flex justify-center lg:-mt-64 -mt-16 mx-auto px-4 lg:py-16 relative">
        <div className="text-center absolut bg-white shadow-md px-8 lg:px-24 py-8 lg:w-3/4">
          <h2 className="lg:text-4xl text-2xl font-bold mb-4 text-center">
            Manage events and projects just the way you want it
          </h2>
          <div className="space-y-">
            <motion.div
              ref={step1Ref}
              initial={{ opacity: 0, y: 50 }}
              animate={controls1}
              className="step flex flex-col justify-center items-center"
            >
              <motion.div className="flex justify-center items-center space-x-4">
                <img
                  src={Asset1}
                  alt="asset1"
                  className="lg:w-32 lg:h-32 w-16 h-16"
                />
                <h3 className="lg:text-2xl">Sign Up</h3>
              </motion.div>
              <img src={Arrow} alt="arrow-down" className="w-16 h-16" />
            </motion.div>
            <motion.div
              ref={step2Ref}
              initial={{ opacity: 0, y: 50 }}
              animate={controls2}
              className="step flex flex-col justify-center items-center"
            >
              <motion.div className="flex justify-center items-center space-x-4">
                <img
                  src={Asset2}
                  alt="asset2"
                  className="lg:w-32 lg:h-32 w-16 h-16"
                />
                <h3 className="lg:text-2xl">Plan Task</h3>
              </motion.div>
              <img src={Arrow} alt="arrow-down" className="w-16 h-16" />
            </motion.div>
            <motion.div
              ref={step3Ref}
              initial={{ opacity: 0, y: 50 }}
              animate={controls3}
              className="step flex flex-col justify-center items-center"
            >
              <motion.div className="flex justify-center items-center -space-x-4">
                <img
                  src={Asset3}
                  alt="asset3"
                  className="lg:w-32 lg:h-32 w-16 h-16"
                />
                <h3 className="lg:text-2xl">Plan Your Event</h3>
              </motion.div>
              <img src={Arrow} alt="arrow-down" className="w-16 h-16" />
            </motion.div>
            <motion.div
              ref={step4Ref}
              initial={{ opacity: 0, y: 50 }}
              animate={controls4}
              className="step flex flex-col justify-center items-center"
            >
              <motion.div className="flex justify-center items-center space-x-4">
                <img
                  src={Asset4}
                  alt="asset4"
                  className="lg:w-32 lg:h-32 w-16 h-16"
                />
                <h3 className="lg:text-2xl">Manage Team, Guest, Vendors</h3>
              </motion.div>
              <img src={Arrow} alt="arrow-down" className="w-16 h-16" />
            </motion.div>
            <motion.div
              ref={step5Ref}
              initial={{ opacity: 0, y: 50 }}
              animate={controls5}
              className="step flex flex-col justify-center items-center"
            >
              <motion.div className="flex justify-center items-center space-x-4">
                <img
                  src={Asset5}
                  alt="asset5"
                  className="lg:w-32 lg:h-32 w-16 h-16"
                />
                <h3 className="lg:text-2xl">Manage Tasks and Guests</h3>
              </motion.div>
              <img src={Arrow} alt="arrow-down" className="w-16 h-16" />
            </motion.div>
            <motion.div
              ref={step6Ref}
              initial={{ opacity: 0, y: 50 }}
              animate={controls6}
              className="step flex flex-col justify-center items-center"
            >
              <motion.div className="flex justify-center items-center space-x-4">
                <img
                  src={Asset6}
                  alt="asset6"
                  className="lg:w-32 lg:h-32 w-16 h-16"
                />
                <h3 className="lg:text-2xl">Coordinate with Vendors</h3>
              </motion.div>
              <img src={Arrow} alt="arrow-down" className="w-16 h-16" />
            </motion.div>
            <motion.div
              ref={step7Ref}
              initial={{ opacity: 0, y: 50 }}
              animate={controls7}
              className="step flex flex-col justify-center items-center"
            >
              <motion.div className="flex justify-center items-center space-x-4">
                <img
                  src={Asset7}
                  alt="asset7"
                  className="lg:w-32 lg:h-32 w-16 h-16"
                />
                <h3 className="lg:text-2xl">Execute with Confidence</h3>
              </motion.div>
              {/* <img src={Arrow} alt="arrow-down" /> */}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

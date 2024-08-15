/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef } from 'react';
import heroImage from '/image/hero.png';
import heroImage2 from '/image/hero2.svg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SlArrowRight } from 'react-icons/sl';

const Hero = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    imageRef.current.style.transform = 'translateX(0)';
  }, []);

  return (
    <section className="container relative flex lg:flex-row flex-col-reverse items-center justify-between lg:py-16 px-8 lg:space-y-12 mt-12">
      <div className="max-w-xl lg:block flex flex-col justify-center items-center">
        <h1 className="lg:text-4xl text-2xl lg:text-left text-center font-bold text-black mb-4">
          Bringing Your Vision to Life with Ease and Elegance
        </h1>
        <p className="lg:text-lg lg:text-left text-center text-gray-700 mb-6">
          TimelessPlanner is your ultimate event planning companion, designed to
          help you create unforgettable experiences with minimal effort. Whether
          you're a professional event planner, a bride-to-be, or organizing a
          corporate event, TimelessPlanner provides all the tools you need to
          plan, manage, and execute your event flawlessly.
        </p>
        <Link to="/signup">
          <button className="group bg-primary text-black font-bold py-3 px-6 inline-flex items-center transition-transform transform hover:border hover:border-primary hover:bg-transparent hover:text-primary">
            Get Started
            <SlArrowRight className="ml-4 h-6 w-6 text-black transition-transform duration-200 group-hover:text-primary group-hover:translate-x-2" />
          </button>
        </Link>
      </div>
      <motion.div
        ref={imageRef}
        className="lg:block hidden lg:absolute right-0 bottom-0 lg:-mr-24 w-1/2 h-full overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src={heroImage}
          alt="Hero"
          className="w-full h-auto object-cover"
          width={128}
          height={128}
        />
      </motion.div>
      <div className="lg:hidden block -mt-4 w-3/4 h-full overflow-hidden mb-4 -z-10">
        <img
          src={heroImage2}
          alt="Hero"
          className="w-full h-auto object-cover"
          width={128}
          height={128}
        />
      </div>
    </section>
  );
};

export default Hero;

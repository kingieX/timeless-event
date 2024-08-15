/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlArrowRight } from 'react-icons/sl';
import NavBar from '../../components/NavBar';
import PlanCard from '../../components/PlanCard';
import Footer from '../../components/Footer';
import { CiSquareCheck } from 'react-icons/ci';

// Sample plans data
const plans = [
  {
    title: 'Basic Plan',
    cardImage: '/image/plan-assets/plan1.svg',
    price: 1,
    category: 'Features include:',
    features: [
      'Budget Management',
      'Guest List Management',
      'Task Tracking',
      'Event Timeline Creation',
      'Schedule Reminders',
      'Email notifications',
      'Browser reminders',
    ],
    support: 'Standard email support',
    buttonLabel: 'Sign Up Now',
  },
  {
    title: 'Pro Plan',
    cardImage: '/image/plan-assets/plan2.svg',
    price: 5,
    category: 'All Features in Basic Plan, plus:',
    features: [
      'Advanced Social Media Integration',
      'Real-Time Collaboration',
      'Multi-Platform Messaging',
      'Personalized Recommendations',
      'Manage and coordinate with multiple vendors',
    ],
    support: 'Priority email and chat support',
    buttonLabel: 'Get Started',
  },
  {
    title: 'Premium Plan',
    cardImage: '/image/plan-assets/plan3.svg',
    price: 9,
    category: 'All Features in Pro Plan, plus:',
    features: [
      'Browser push notifications',
      'Comprehensive Analytics',
      'Custom Branding',
      'Dedicated Account Manager',
    ],
    support: '24/7 support via phone, email, and chat',
    buttonLabel: 'Subscribe Now',
  },
];

// Currency conversion rates relative to USD
const currencyRates = {
  NGN: 1585.06,
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110,
  // Add more currencies and their conversion rates as needed
};

const enterpriseFeature = [
  'Tailored Features: Customizable to meet specific requirements',
  'Advanced Integrations: Seamless integration with your existing systems',
  'Dedicated Support: On-site and virtual support options',
  'Training and Consultation: Comprehensive training for your team',
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const [currency, setCurrency] = useState('USD'); // Default currency
  const [activePlan, setActivePlan] = useState(null); // To track the active card

  return (
    <div>
      <div className="">
        <NavBar />
      </div>
      <div className="flex flex-col justify-cente items-center lg:py-8">
        <div className="lg:w-3/4 flex flex-col justify-center items-center lg:px-24 px-4 py-8 lg:mt-16 mt-2">
          <h1 className="lg:text-6xl lg:font-bold text-2xl text-center text-black mt-5 typing-text lg:mb-4 mb-2">
            {/* {text} */}
          </h1>
          <h1 className="lg:text-2xl text-lg text-center text-gray-600 lg:mb-8 mb-4">
            At Timeless Planner, we offer flexible pricing plans designed to fit
            your needs, whether you’re planning a small gathering or a grand
            celebration. Our comprehensive features ensure that your project
            planning is seamless, efficient, and enjoyable.
          </h1>
          <p className="lg:text-xl max-w-xl font-light text-sm text-center text-gray-600 lg:mb-12 mb-8">
            Choose the plan that best suits your requirements and start
            organizing your perfect project | event{' '}
            <span className="border-b-2 pb-1 font-semibold border-primary">
              today!
            </span>
          </p>

          {/* Start Free Now button */}
          <Link to="/signup">
            <button className="group bg-primary text-black font-bold py-3 px-6 inline-flex items-center transition-transform transform hover:border hover:border-primary hover:bg-transparent hover:text-primary">
              Start Free Now
              <SlArrowRight className="ml-4 h-6 w-6 text-black transition-transform duration-200 group-hover:text-primary group-hover:translate-x-2" />
            </button>
          </Link>
        </div>

        {/* Add pricing table here */}
        <div className="lg:px-12 lg:py-12 py-6 px-6">
          {/* Toggle and Currency List */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() =>
                    setBillingCycle(
                      billingCycle === 'monthly' ? 'yearly' : 'monthly'
                    )
                  }
                />
                <span className="slider round"></span>
              </label>
              <span className="ml-3">
                {billingCycle === 'monthly' ? 'Bill Monthly' : 'Bill Annually'}
              </span>
            </div>

            <div>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="p-2 border rounded"
              >
                {Object.keys(currencyRates).map(cur => (
                  <option value={cur} key={cur}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Plan Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {plans.map((plan, index) => {
              const convertedPrice = plan.price * currencyRates[currency];
              return (
                <PlanCard
                  key={index}
                  title={plan.title}
                  cardImage={plan.cardImage}
                  price={
                    billingCycle === 'monthly'
                      ? convertedPrice
                      : convertedPrice * 12
                  } // Assuming yearly price is 12x monthly
                  category={plan.category}
                  features={plan.features}
                  support={plan.support}
                  buttonLabel={plan.buttonLabel}
                  currency={currency}
                  isActive={activePlan === index} // Check if this card is active
                  onClick={() => setActivePlan(index)} // Set this card as active when clicked
                />
              );
            })}
          </div>
        </div>

        {/* Enterprise solution */}
        <div className="lg:px-12 lg:py-12 py-6 px-6">
          <div
            className={`flex flex-col lg:items-center border-t-8 border-gray py-10 lg:px-10 px-6 rounded-lg bg-slate-100 shadow-md transition-transform transform hover:shadow-xl lg:hover:scale-105 cursor-pointer`}
          >
            <h1 className="lg:text-4xl lg:font-semibold text-2xl text-center lg:mb-4 mb-2">
              Enterprise Solutions
            </h1>
            <img
              src="/image/plan-assets/plan4.svg"
              alt="card image"
              className="lg:w-2/5 py-4"
            />
            <p className="max-w-xl text-lg text-center font-semibold mb-2">
              For large organisations with complex Project & event needs, we
              offer customised solutions and pricing.
            </p>
            <ul className="mb-4">
              {enterpriseFeature.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-slate-500"
                >
                  <CiSquareCheck className="w-5 h-5" />
                  <p>{feature}</p>
                </li>
              ))}
            </ul>
            <p className="lg:text-xl max-w-xl font-light text-sm text-center text-gray-600 mb-4">
              To discuss your needs and get a personalised quote.
            </p>
            <button
              className={`w-full py-3 text-lg font-bold border border-primary text-primary hover:bg-primary hover:text-white`}
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* note */}
        <div className="flex flex-col items-center space-y-4">
          <h1 className="font-thin text-2xl">
            All plans come with a 14-day free trial. No credit card required.
          </h1>
          <p className="text-xl">
            <span className="font-semibold text-lg">Have Questions?</span> Feel
            free to{' '}
            <a
              href="#"
              className="hover:text-primary hover:underline font-semibold"
            >
              [contact our support team]
            </a>{' '}
            for more information or to schedule a demo.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;

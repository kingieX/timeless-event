/* eslint-disable react/prop-types */
// import React from 'react';
import { CiSquareCheck } from 'react-icons/ci';

const PlanCard = ({
  title,
  price,
  category,
  features,
  support,
  buttonLabel,
  currency,
  isActive,
  onClick,
  cardImage,
}) => {
  return (
    <div
      className={`flex flex-col  lg:items-center border-t-8 py-6 lg:px-10 px-6 rounded-lg bg-slate-100 shadow-md transition-transform transform ${
        isActive ? 'border-primary scale-105 border' : 'border-gray'
      } hover:shadow-xl hover:scale-105 cursor-pointer`}
      onClick={onClick}
    >
      <h3 className="text-2xl text-center font-bold mb-4">{title}</h3>
      <img src={cardImage} alt="card image" className="lg:w-1/2 py-4" />
      <p className="max-w-full lg:text-4xl text-2xl font-extrabold mb-2">
        {currency} {price.toFixed(2)}
      </p>
      <p className="text-lg font-semibold mb-2">{category}</p>
      <ul className="mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2 text-slate-500">
            <CiSquareCheck className="w-5 h-5" />
            <p>{feature}</p>
          </li>
        ))}
      </ul>
      <p className="text-slate-600 mb-4">
        <span className="font-semibold">Support: </span>
        {support}
      </p>
      <button
        className={`w-full py-3 text-lg font-bold rounded border border-primary text-primary ${
          isActive ? 'bg-primary text-white hover:border hover:opacity-50' : ''
        } hover:bg-primary hover:text-white`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};

export default PlanCard;

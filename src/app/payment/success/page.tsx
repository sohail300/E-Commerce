import Link from "next/link";
import React from "react";

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your transaction has been processed.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Link
                href={"/"}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

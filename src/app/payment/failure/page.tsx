import Link from "next/link";
import React from "react";
// 4000003560000008

const PaymentFailurePage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="h-12 w-12 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Payment Failed
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We could not process your payment. Please try again.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <div className="inline-flex rounded-md shadow">
                <Link
                  href={"/cart"}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Try Again
                </Link>
              </div>
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-white rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailurePage;

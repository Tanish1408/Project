import React from 'react';
import { ArrowRight, PieChart, DollarSign, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Smart Budget Tracking
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Take control of your finances with our powerful expense tracking and currency conversion tools
          </p>
          <Link
            to="/dashboard"
            className="btn btn-primary inline-flex items-center text-lg"
          >
            Get Started <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card text-center p-8">
            <DollarSign className="w-12 h-12 text-primary-color mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
            <p className="text-gray-600">
              Log and categorize your expenses with ease
            </p>
          </div>
          <div className="card text-center p-8">
            <RefreshCcw className="w-12 h-12 text-primary-color mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Currency Conversion</h3>
            <p className="text-gray-600">
              Real-time currency conversion rates
            </p>
          </div>
          <div className="card text-center p-8">
            <PieChart className="w-12 h-12 text-primary-color mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Insights</h3>
            <p className="text-gray-600">
              Visual breakdowns of your spending habits
            </p>
          </div>
        </div>

        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200"
            alt="Budget Planning"
            className="rounded-lg shadow-xl mx-auto mb-8"
          />
        </div>
      </div>
    </div>
  );
};
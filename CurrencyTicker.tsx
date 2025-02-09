import React, { useEffect, useState } from 'react';
import { CurrencyRate } from '../types';
import { AlertCircle } from 'lucide-react';

export const CurrencyTicker: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await response.json();
        
        if (data.rates) {
          const formattedRates = Object.entries(data.rates).map(([code, rate]) => ({
            code,
            rate: Number(rate),
          }));
          setRates(formattedRates);
        }
      } catch (err) {
        setError('Failed to load currency rates');
        console.error('Error fetching rates:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="currency-ticker bg-primary-color">
        <div className="container mx-auto">
          <p className="text-white text-center">Loading currency rates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="currency-ticker bg-red-500">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-white" />
          <p className="text-white">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="currency-ticker" role="marquee">
      <div className="currency-ticker__content">
        {rates.map((rate) => (
          <span key={rate.code} className="mx-4" role="text">
            {rate.code}: {rate.rate.toFixed(4)}
          </span>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Hello, World!</h1>
        <p className="text-xl text-white opacity-80 mb-8">Welcome to your simple React app</p>
        
        <div className="space-y-4">
          <Link to="/stripe">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <CreditCard className="h-5 w-5 mr-2" />
              Try Stripe Integration
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
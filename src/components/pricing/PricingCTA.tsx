
import React from 'react';
import Button from '../ui-components/Button';

const PricingCTA: React.FC = () => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTI0IDQ4YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiIGZpbGw9IndoaXRlIi8+PC9nPjwvc3ZnPg==')]"></div>
          <div className="relative p-8 md:p-10">
            <div className="text-center text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-3">Ready to enhance your practice?</h2>
              <p className="text-base mb-6 opacity-90">Start your 14-day free trial with full access to all features.</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  className="bg-white text-purple-700 hover:bg-gray-100 shadow-md"
                >
                  Schedule a Demo
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="border-white text-white hover:bg-white/20"
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCTA;

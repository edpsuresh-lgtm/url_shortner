import React from 'react';
import { Zap, Shield, Sparkles, BarChart3, Lock, Globe } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instant URL redirection with sub-millisecond response times. Your links work immediately after creation.',
      color: 'indigo'
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Aliases',
      description: 'Let our AI suggest memorable, relevant aliases for your links. Smart suggestions based on content analysis.',
      color: 'violet'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'End-to-end encryption for your links. Advanced privacy controls and secure link tracking.',
      color: 'emerald'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics with click tracking, geographic data, and engagement metrics.',
      color: 'blue'
    },
    {
      icon: Lock,
      title: 'Access Control',
      description: 'Set expiration dates, password protection, and access restrictions for your links.',
      color: 'red'
    },
    {
      icon: Globe,
      title: 'Custom Domains',
      description: 'Use your own domain for branded short links. Perfect for businesses and organizations.',
      color: 'purple'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto">
            Everything you need to shorten, manage, and analyze your links with AI-powered intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorClasses = {
              indigo: 'bg-indigo-100 text-indigo-600',
              violet: 'bg-violet-100 text-violet-600',
              emerald: 'bg-emerald-100 text-emerald-600',
              blue: 'bg-blue-100 text-blue-600',
              red: 'bg-red-100 text-red-600',
              purple: 'bg-purple-100 text-purple-600'
            };

            return (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses]} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;


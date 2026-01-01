import React from 'react';
import { Building2, Users, HeadphonesIcon, CheckCircle2, ArrowRight } from 'lucide-react';

const EnterpriseSection: React.FC = () => {
  const benefits = [
    'Advanced security & compliance',
    'Dedicated account manager',
    '99.9% uptime SLA',
    'Custom integrations',
    'Priority support 24/7',
    'White-label options',
    'Bulk link management',
    'Advanced analytics & reporting'
  ];

  return (
    <section id="enterprise" className="py-20 bg-gradient-to-br from-indigo-600 to-violet-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-semibold">Enterprise Solutions</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Built for Teams & Organizations
            </h2>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              Scale your link management with enterprise-grade features, advanced security, and dedicated support. Perfect for marketing teams, agencies, and large organizations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300 flex-shrink-0" />
                  <span className="text-indigo-100">{benefit}</span>
                </div>
              ))}
            </div>

            <button className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl">
              Contact Sales
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Team Collaboration</h3>
                  <p className="text-indigo-100 text-sm">Manage links together with role-based access control</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <HeadphonesIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">24/7 Priority Support</h3>
                  <p className="text-indigo-100 text-sm">Get help when you need it with dedicated support</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Custom Solutions</h3>
                  <p className="text-indigo-100 text-sm">Tailored integrations and workflows for your business</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;


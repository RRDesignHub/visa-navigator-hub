import React from 'react';

const Features = () => {
  const features = [
    {
      icon: '🌍',
      title: 'Check Visa Requirements',
      description: 'Explore visa requirements for any country with ease.'
    },
    {
      icon: '📄',
      title: 'Apply for Visas Online',
      description: 'Submit your visa applications securely through our platform.'
    },
    {
      icon: '📦',
      title: 'Track Your Application',
      description: 'Stay updated with real-time application status tracking.'
    }
  ];

  return (
    <div className="py-16">
      <h2 className="text-2xl md:text-4xl font-bold text-center text-blue-950 mb-8">
        Our Key Features
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card w-80 bg-blue-50 shadow-md hover:shadow-2xl transition-all duration-300 p-6 rounded-lg"
          >
            <div className="text-5xl text-primary mb-4 text-center">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold text-center mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;

import React from 'react';

interface EmailRequirementsProps {
  email: string;
}

const EmailRequirements: React.FC<EmailRequirementsProps> = ({ email }) => {
  const getMissingRequirements = () => {
    const missing = [];

    if (!email.includes('@')) missing.push('@');
    if (!email.endsWith('@unipamplona.edu.co')) missing.push('@unipamplona.edu.co');

    return missing;
  };

  const missing = getMissingRequirements();

  let content: React.ReactNode;
  let className: string;

  if (email.length === 0) {
    content = '@unipamplona.edu.co';
    className = 'text-gray-500 text-xs mt-1.5';
  } else if (missing.length === 0) {
    content = '✓ Correo institucional válido';
    className = 'text-green-600 text-xs font-medium mt-1.5';
  } else {
    content = `Falta: ${missing.join(', ')}`;
    className = 'text-amber-600 text-xs mt-1.5';
  }

  return (
    <div key="email-requirements" className="min-h-[1.25rem]">
      <p className={className}>{content}</p>
    </div>
  );
};

export default EmailRequirements;
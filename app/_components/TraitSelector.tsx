import React, { useState } from 'react';
import { traits } from './traitsData'; // Assuming you have a traitsData file with the trait categories and options

const TraitSelector: React.FC<{ setSelectedTraits: React.Dispatch<React.SetStateAction<Record<string, string>>> }> = ({ setSelectedTraits }) => {
  const [localSelectedTraits, setLocalSelectedTraits] = useState<Record<string, string>>({});

  const handleTraitChange = (category: string, value: string) => {
    setLocalSelectedTraits(prev => ({
      ...prev,
      [category]: value
    }));
    setSelectedTraits(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <div className="space-y-4">
      {Object.keys(traits).map(category => (
        <div key={category} className="flex items-center space-x-4">
          <label className="text-gray-600 text-sm font-medium" htmlFor={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}:
          </label>
          <select
            id={category}
            className="text-black p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-64" // Added w-64 for fixed width
            value={localSelectedTraits[category] || ''}
            onChange={e => handleTraitChange(category, e.target.value)}
        >
            <option value="" disabled>Select...</option>
            {traits[category].map(trait => (
                <option key={trait} value={trait}>
                    {trait.charAt(0).toUpperCase() + trait.slice(1)}
                </option>
            ))}
        </select>

        </div>
      ))}
    </div>
  );
}

export default TraitSelector;

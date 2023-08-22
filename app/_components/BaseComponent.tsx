"use client"
import React from 'react';
import TraitSelector from './TraitSelector';
import NFTDisplay from './NFTDisplay';
import Logo from './Logo';
import { useState } from 'react';

const BaseComponent: React.FC = () => {
  const [selectedTraits, setSelectedTraits] = useState<Record<string, string>>({});

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="flex flex-col items-center space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <Logo />
        <div className="flex space-x-8">
          <TraitSelector setSelectedTraits={setSelectedTraits} />
          <NFTDisplay selectedTraits={selectedTraits} />
        </div>
        <span className='text-black text-xs'>Coded by <a target='blank' className='underline text-blue-600 hover:text-blue-800 visited:text-purple-600' href="https://twitter.com/0xRamyo">@0xRamyo</a> (not affiliated with the Degods Team)</span>
      </div>
    </div>
  );
}

export default BaseComponent;

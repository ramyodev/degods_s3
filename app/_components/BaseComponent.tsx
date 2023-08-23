"use client"
import React from 'react';
import TraitSelector from './TraitSelector';
import NFTDisplay from './NFTDisplay';
import Logo from './Logo';
import { useState } from 'react';

const BaseComponent: React.FC = () => {
  const [selectedTraits, setSelectedTraits] = useState<Record<string, string>>({});

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-4 sm:p-0 overflow-x-hidden">
      <div className="flex flex-col items-center space-y-4 sm:space-y-8 md:space-y-8 bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-xl max-w-full md:max-w-4xl">
        <Logo />
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 md:space-x-8 w-full">
          <TraitSelector setSelectedTraits={setSelectedTraits} />
          <NFTDisplay selectedTraits={selectedTraits} />
        </div>
        <span className='text-black text-xs text-center'>Coded by <a href="https://twitter.com/0xRamyo">@0xRamyo</a> (not affiliated with the Degods Team)</span>
      </div>
    </div>
  );
}

export default BaseComponent;

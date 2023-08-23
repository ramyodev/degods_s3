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
      <div className="flex flex-col items-center space-y-8 md:space-y-8 bg-white p-8 md:p-10 rounded-lg shadow-xl max-w-4xl">
        <Logo className="w-32 md:w-48 h-32 md:h-48" />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 w-full">
          <TraitSelector setSelectedTraits={setSelectedTraits} />
          <NFTDisplay selectedTraits={selectedTraits} />
        </div>
        <span className='text-black text-xs text-center'>Coded by <a href="https://twitter.com/0xRamyo">@0xRamyo</a> (not affiliated with the Degods Team)</span>
      </div>
    </div>
  );
}

export default BaseComponent;

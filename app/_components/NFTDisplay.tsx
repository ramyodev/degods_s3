"use client"
import React, { useRef, useEffect } from 'react';

interface NFTDisplayProps {
  selectedTraits: Record<string, string>;
}

let isCanvasScaled = false;

const setupCanvasForHighDPI = (canvas: HTMLCanvasElement) => {
    if (isCanvasScaled) return; // Exit if the canvas has already been scaled

    const ctx = canvas.getContext('2d');
    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio = (ctx as any)?.backingStorePixelRatio || 1;
    const ratio = devicePixelRatio / backingStoreRatio;

    if (devicePixelRatio !== backingStoreRatio) {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        if (ctx) {
            ctx.scale(ratio, ratio);
        }

        isCanvasScaled = true; // Mark the canvas as scaled
    }
};




const NFTDisplay: React.FC<NFTDisplayProps> = ({ selectedTraits }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownload = () => {
    if (offScreenCanvas) {
        // Convert off-screen canvas content to an image (data URL)
        const dataURL = offScreenCanvas.toDataURL('image/png');

        // Create a temporary anchor element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'generated_nft.png'; // Name of the downloaded file
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    } else {
        console.error("Off-screen canvas not initialized or NFT not generated.");
    }
};




const loadImage = (category: string, trait: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = `/images/${category}/${trait}.png`;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(`Error loading image from category ${category} with trait ${trait}: ${err}`);
  });
};

useEffect(() => {
  if (canvasRef.current) {
      setupCanvasForHighDPI(canvasRef.current);
  }
}, []);


let offScreenCanvas: HTMLCanvasElement | null = null;
let offScreenCtx: CanvasRenderingContext2D | null = null;


const handleGenerate = async () => {
  console.log('Generating NFT...');
  if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      // Create or reuse the off-screen canvas
      if (!offScreenCanvas) {
          offScreenCanvas = document.createElement('canvas');
          offScreenCanvas.width = 3014;
          offScreenCanvas.height = 3014;
          offScreenCtx = offScreenCanvas.getContext('2d');
      }

      if (offScreenCtx) {
          offScreenCtx.clearRect(0, 0, 3014, 3014); // Clear the off-screen canvas

          console.log('Drawing traits...');
          console.log('Selected traits:');
          console.log(selectedTraits);

          const traitOrder = ['background', 'skin', 'head', 'mouth', 'eyes', 'clothes', 'neck', 'specialty'];

          for (const category of traitOrder) {
              const trait = selectedTraits[category];
              if (trait) {
                  console.log(`Drawing ${trait} from ${category}`);
                  try {
                      const img = await loadImage(category, trait);
                      offScreenCtx.drawImage(img, 0, 0, 3014, 3014); // Draw on the off-screen canvas
                  } catch (error) {
                      console.error(error);
                  }
              }
          }

          // Now, draw the off-screen canvas content onto the visible canvas
          if (ctx) {
              ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
              ctx.drawImage(offScreenCanvas, 0, 0, 400, 400); // Scale down for display
          }
      }
  }
};


return (
  <div className="flex flex-col items-center space-y-4">
    <canvas ref={canvasRef} width={400} height={400} className="border transform scale-75 sm:scale-100"></canvas>
    <div className="flex space-x-4">
      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded">
        Generate
      </button>
      <button onClick={handleDownload} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Download
      </button>
    </div>
  </div>
);
}

export default NFTDisplay;

"use client";

import BentoVisionBoard from "./components/BentoVisionBoard";
import BentoVisionBoardDraggable from "./components/DraggableBento";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { Save } from 'lucide-react';
import { Hand } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import { useRef } from "react";
import { Upload, Move, Share2, Twitter, Facebook, LinkedIn, Link2 } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { useState,useEffect } from "react";

export default function Home() {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(true);
  };

  const onLeave = () => {
    setHover(false);
  };
  const elementRef = useRef(null);

    const Drag = () => {
      window.location.href = "/Draggable";
    }
    const Save = () => {
      toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
    }

    const shareTemplates = {
      twitter: "Check out my vision board! 🎯 Creating my dreams with @YourAppName #VisionBoard #Goals",
      facebook: "I'm manifesting my dreams with this vision board! 🌟 Created with YourAppName",
      linkedin: "Excited to share my vision board! Using visual goals to map out my journey. Created with YourAppName. #PersonalDevelopment #Goals",
      copyLink: "Check out my vision board created with YourAppName: "
    };

    const handleShare = (platform) => {
      const text = shareTemplates[platform];
      const url = window.location.href;
  
      switch (platform) {
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
          break;
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`);
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`);
          break;
        case 'copyLink':
          navigator.clipboard.writeText(`${text}${url}`);
          alert('Link copied to clipboard!');
          break;
      }
      setShowShareMenu(false);
    };


    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      // Check on initial load
      checkMobile();
  
      // Add resize listener
      window.addEventListener('resize', checkMobile);
  
      // Cleanup
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
      return (
        <div className="fixed inset-0 bg-[#6d3229] flex items-center justify-center p-6 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-black">Coming Soon!</h2>
            <p className="text-gray-600 mb-4">
              Our mobile version is currently under development. Please visit us on a desktop device for the best experience.
            </p>
            <div className="text-sm text-gray-500">
              📱 Mobile Version Coming Soon
            </div>
          </div>
        </div>
      );
    }else{
  return (
    <div  ref={elementRef}>
     
     
      <BentoVisionBoard></BentoVisionBoard>
     
     {/* <BentoVisionBoardDraggable></BentoVisionBoardDraggable> */}
     
     <div className="w-screen flex">
     <center>
      <div className="w-full pl-6">
      <h1 className=" vb text-6xl  ">Vision Board</h1>
      </div>
     </center>
     <div className="w-9/12 flex justify-end items-center pr-4 "> 
      <Hand onClick={Drag} className="mr-4">
      </Hand>
      <span className="absolute -translate-y-8 -translate-x-32 opacity-70">Draggable</span>
      <button onClick={Save}>
      <a
  className="group inline-block rounded text-black hover:text-black focus:outline hover:border-black focus:ring active:text-opacity-75"
>
  <span className="block rounded-sm bg-white px-8 py-3 text-sm font-medium group-hover">
    Save
  </span>
</a>
      </button>

        

      <ExternalLink className="ml-4" onClick={() => setShowShareMenu(!showShareMenu)}></ExternalLink>
      <div className="relative">
         
          
          {showShareMenu && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-[#6d3229] rounded-lg shadow-lg border border-gray-200 z-50">
              <button 
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-50 text-left hover:text-black"
              >
                <Twitter className="w-4 h-4 text-blue-400 hover:text-black" />
                Twitter
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-50 text-left hover:text-black"
              >
                <Facebook className="w-4 h-4 text-blue-600" />
                Facebook
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-50 text-left hover:text-black"
              >
                <Linkedin />
                LinkedIn
              </button>
              <button 
                onClick={() => handleShare('copyLink')}
                className="flex items-center gap-2 px-4 py-3 w-full hover:bg-gray-50 text-left hover:text-black"
              >
                <Link2 className="w-4 h-4 text-gray-600" />
                Copy Link
              </button>
            </div>
          )}
        </div>
     </div>
     </div>
     
     
    
    </div>
  );
}
}

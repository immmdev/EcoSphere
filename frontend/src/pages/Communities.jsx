import React, { useState,useEffect } from 'react';
import CommunityHeroSec from '../components/CommunityHeroSec';
import CommunityMidSec from '../components/CommunityMidSec';
import CommunityCards from '../components/CommunityCards';

export default function Community() {

  return (
    <div className="bg-green-50 text-green-900">
      {/* Full Width Banner */}
     <CommunityHeroSec/>

     <CommunityMidSec/> 
     
     <CommunityCards/>

     
    </div>
  );
}

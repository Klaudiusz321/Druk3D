import React from 'react'
import { Vortex } from './components/ui/vortex'
import Navbar from './components/Navbar'
import { TypewriterEffect } from './components/ui/typewriter-effect'
import SpecialOrder from './sections/SpecialOrder'


const Page = () => {
  return (
    <div className="w-screen h-screen relative">
      {/* Tło: komponent Vortex */}
      <Navbar />
      
      <Vortex className="w-full h-full" />

      {/* Nakładka z napisem */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-white text-8xl font-bold">
          <TypewriterEffect words={[{ text:"Druk_3D" }]} />

        </h1>
        
      </div>
      
      <SpecialOrder />
    </div>
    
  )
}

export default Page

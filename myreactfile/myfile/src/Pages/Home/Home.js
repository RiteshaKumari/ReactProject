import React from 'react'
import Hero from '../../Components/Hero'
import Afterhero from '../../Components/Afterhero'
import Coursecategory from '../../Components/Coursecategory'
import Strip from '../../Components/Strip'
import OnlineCourses from '../../Components/OnlineCourses'
import BuyBanner from '../../Components/BuyBanner'


function Home() {
  return (
    <div>
      <Hero />
      <Afterhero />
      <Coursecategory />
      <Strip />
      <OnlineCourses />
      <BuyBanner />
   
    </div>
  )
}

export default Home

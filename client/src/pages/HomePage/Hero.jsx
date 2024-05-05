import React from 'react'

const Hero = () => {
  return (
    <div class="bg-gradient-to-r from-indigo-900 to-purple-900 font-[sans-serif]">
      <div class="relative overflow-hidden">
        <div class="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:py-32 lg:px-8">
          <div class="relative z-10 text-center lg:text-left">
            <h1 class="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl lg:text-7xl">
              Welcome to
              <br class="xl:hidden" />
              <span class="text-indigo-400"> Premium Delights</span>
            </h1>
            <p class="mt-4 max-w-md mx-auto text-lg text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
              Elevate your culinary experience with our exclusive premium services. Indulge in exquisite flavors and extraordinary moments.
            </p>
            <div class="mt-12 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-indigo-600 bg-white hover:text-indigo-500 hover:bg-indigo-100 transition duration-150 ease-in-out">
                  Get Started
                </button>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-4">
                <button class="w-full flex items-center justify-center px-8 py-3 text-base font-semibold rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition duration-150 ease-in-out">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://readymadeui.com/hotel-img.webp" alt="Delicious Food" />
        </div>
      </div>
    </div>
  )
}

export default Hero
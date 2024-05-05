import React from 'react'

const Newsletter = () => {
  return (
    <div class="bg-[#2e0249] py-16 px-6 font-[sans-serif]">
    <div class="max-w-5xl mx-auto text-center text-white">
      <h2 class="text-4xl font-extrabold mb-4">Subscribe to Our Newsletter</h2>
      <p class="text-base text-gray-400">Stay updated with the latest news, trends, and special offers. Don't miss out on our exciting updates.</p>
      <div class="mt-10">
        <input type="email" placeholder="Enter your email" class="w-full sm:w-96 bg-gray-50 py-3.5 px-4 text-[#333] text-base focus:outline-none rounded" />
        <button class="max-sm:mt-8 sm:ml-4 bg-[#a91079] hover:bg-[#a91079e2] text-white text-base font-semibold py-3.5 px-6 rounded hover:shadow-md hover:transition-transform transition-transform hover:scale-105 focus:outline-none">
          Subscribe
        </button>
      </div>
    </div>
  </div>
  )
}

export default Newsletter
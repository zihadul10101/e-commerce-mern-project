import React from 'react'
import PageTitle from '../components/PageTitle'
import ProductList from './HomePage/ProductList'
import Hero from './HomePage/Hero'
import Team from './HomePage/Team'
import Pricing from './HomePage/Pricing'
import Features from './HomePage/Features'
import Contact from './HomePage/Contact'
import Newsletter from './HomePage/Newsletter'


const Home = () => {
    return (
        <div>
            <PageTitle title="Home" />
            <Hero />
            <ProductList />
            <Features />
            <Pricing />
            <Team />
            <Newsletter />
            <Contact />
        </div>
    )
}

export default Home
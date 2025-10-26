import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import TrendingProducts from "../components/TrendingProducts";
import FeaturedProductsDark from "../components/FeatureProducts";
import Deals from "../components/Deals";
import BannerNewsletter from "../components/BannerNewsLetter";
import Testimonials from "../components/Tesimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <TrendingProducts />
      <FeaturedProductsDark />
      <Deals />
      <BannerNewsletter />
      <Testimonials />
    </>
  );
}

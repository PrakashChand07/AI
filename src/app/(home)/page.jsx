import TopNavbar from "@/components/TopNavbar";
import { navLinks } from "./data";
import Hero from "./components/Hero";
import ClientSwiper from "./components/ClientSwiper";
import Features from "./components/Features";
import Features2 from "./components/Features2";
import Generator from "./components/Generator";
import Pricing from "./components/Pricing";
import Faqs from "./components/Faqs";
import ActionBox from "./components/ActionBox";
import Footer3 from "./components/Footer3";
import Background2 from "@/components/Background2";

const Home = () => {
  return (
    <>
      <Background2 />
      <TopNavbar navLinks={navLinks} />
      <Hero />
      <ClientSwiper />
      <Features />
      <Features2 />
      <Generator />
      <Pricing />
      <Faqs />
      <ActionBox />
      <Footer3 />
    </>
  );
};

export default Home;
import Image from "next/image";

import Hero from './components/Hero'
import Slidercom from './components/Propertiescom';
import Aboutsection from "./components/Aboutsection";
import Sliderpropertycate from './components/Sliderpropertycate';
import Testimonial from "./components/Testimonial";
import Bglessslider from './components/Bglessslider';
import Blog from "./components/Blog";
import Builderslider from "./components/Builderslider";
export default function Home() {
  return (
   <>
  <Hero/> 
  <Slidercom/>
  <Bglessslider/>
  <Aboutsection/>
  <Sliderpropertycate/>
  <Builderslider/>
  <Testimonial/>
  <Blog/>
   </>
  );
}

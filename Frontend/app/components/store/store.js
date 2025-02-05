"use client"

import {configureStore} from "@reduxjs/toolkit"
import propertySlice from "./slices/propertySlice";
// import sliderdataSlice from "./slices/sliderdataSlice";
import trendingproperty from "./slices/trandingSlice";
import testimonial from "./slices/testimonialSlice";
import blog from "./slices/blogSlice";
import category from "./slices/categorySlice";
import singleproperty from "./slices/singlepropertyslice";
import bannerimg from "./slices/bannerimgSlice";
import about from "./slices/aboutSlice";
import policy from "./slices/policeSlice";


export const store = configureStore({
      reducer: {propertySlice,trendingproperty,testimonial,blog,category,singleproperty,bannerimg,about,policy},
    });


  
// "use client"
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import {Provider} from "react-redux"
import Provider from "./components/store/Provider";
// import { store } from "./components/store/store";


export const metadata = {
  title: "My Home-Real Estaet",
  description: "Go With Flow",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Provider >
        <Navbar/>
        {children}
        <Footer/>
        </Provider> 
        </body>
    </html>
  );
}

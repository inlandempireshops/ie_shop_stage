import Image from "next/image";
import Header from "./components/Header";
import Headline from "./components/Headline";
import Product from "./components/Product";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main id="home-container">
      <div className="main-wrapper">
        <Header />
        <section id="hero"></section>
        <Headline />
        <Product />
      </div>
      <Footer />
    </main>
  );
}

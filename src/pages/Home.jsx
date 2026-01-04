import Marquee from '../components/Marquee';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import Categories from '../components/Categories';
import WhyUs from '../components/WhyUs';
import Products from '../components/Products';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="font-sans antialiased selection:bg-acid selection:text-ink relative">
      {/* Background Grid Texture */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none z-0"></div>
      
      <Marquee />
      <Navigation />
      <main id="main-content">
      <Hero />
      <Ticker />
      <Categories />
      <WhyUs />
      <Products />
      <Testimonials />
      <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Home;


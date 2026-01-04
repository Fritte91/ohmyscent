import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Marquee from '../components/Marquee';
import { Sparkles, Heart, Target, Award } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const timelineRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    // Wait a bit for refs to be set, then observe
    const timeoutId = setTimeout(() => {
      timelineRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const isEven = index % 2 === 0;
                // Make visible and add animation
                entry.target.style.visibility = 'visible';
                entry.target.classList.remove('opacity-0');
                if (isEven) {
                  entry.target.classList.add('animate-slide-in-left');
                } else {
                  entry.target.classList.add('animate-slide-in-right');
                }
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px',
          }
        );

        observer.observe(ref);
        observers.push(observer);
      });
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Mock data for testing
  const timelineItems = [
    {
      year: '2020',
      title: 'THE SPARK',
      description: 'It all started with a simple frustration: why spend ฿10,000+ on a full bottle when you just want to try it? We discovered the art of decanting and saw an opportunity to make luxury fragrances accessible to everyone in Thailand.',
      image: '/perfume1.jpg',
      icon: Sparkles,
    },
    {
      year: '2021',
      title: 'PERFECTING THE CRAFT',
      description: 'Months of research went into finding the perfect extraction method. We tested hundreds of syringes, atomizers, and storage solutions. Every detail mattered - from temperature-controlled storage to maintaining the original scent profile.',
      image: '/perfume2.jpg',
      icon: Heart,
    },
    {
      year: '2022',
      title: 'BUILDING TRUST',
      description: 'Quality over quantity. We sourced only 100% authentic perfumes from trusted suppliers. Each decant is extracted directly from original bottles with precision instruments. Zero dilution. Zero compromise. Your trust became our biggest asset.',
      image: '/perfume3.jpg',
      icon: Target,
    },
    {
      year: '2024',
      title: 'THE OH MY SCENT! EXPERIENCE',
      description: 'Today, we\'re serving thousands of fragrance lovers across Thailand. From Bangkok to Phuket, we deliver authentic scents with climate-controlled storage, premium packaging, and lightning-fast shipping. Your perfect scent is just a click away.',
      image: '/perfume4.jpeg',
      icon: Award,
    },
  ];

  return (
    <div className="font-sans antialiased selection:bg-acid selection:text-ink relative min-h-screen">
      {/* Background Grid Texture */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid pointer-events-none z-0"></div>
      
      <Marquee />
      <Navigation />
      
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <section className="px-4 md:px-8 pt-20 pb-16 max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter text-ink mb-6 leading-[0.9]">
              OUR<br />
              <span className="relative inline-block">
                JOURNEY
                <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full" viewBox="0 0 200 20" fill="none">
                  <path d="M2 15Q100 2 198 12" stroke="#D2E823" strokeWidth="8" strokeLinecap="round"></path>
                </svg>
              </span>
            </h1>
            <p className="font-medium text-xl md:text-2xl leading-relaxed opacity-90 max-w-2xl mx-auto">
              Discover how we became Thailand's trusted source for authentic fragrance decants. From passion to perfection, this is our story.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-ink/20"></div>

          {/* Timeline Items */}
          <div className="space-y-32 md:space-y-40">
            {timelineItems.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) timelineRefs.current[index] = el;
                  }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } opacity-0`}
                  style={{ visibility: 'hidden' }}
                >
                  {/* Image Side */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-acid rounded-2xl border-2 border-ink rotate-3 group-hover:rotate-6 transition-transform"></div>
                      <div className="relative bg-ink rounded-2xl border-2 border-ink overflow-hidden shadow-hard-xl">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 md:h-80 object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="bg-paper/90 backdrop-blur-md text-ink border border-paper/30 px-4 py-2 rounded-lg">
                              <Icon className="w-5 h-5" />
                            </div>
                            <span className="font-display text-2xl text-paper">{item.year}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12 md:text-left' : 'md:pr-12 md:text-right'}`}>
                    <div className="bg-paper border-2 border-ink rounded-2xl p-6 md:p-8 shadow-hard-xl">
                      <div className={`flex items-center gap-3 mb-4 ${isEven ? '' : 'flex-row-reverse'}`}>
                        <div className="bg-acid text-ink p-3 rounded-xl border-2 border-ink">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-display text-3xl md:text-4xl tracking-tighter">{item.year}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl tracking-tighter mb-4">{item.title}</h3>
                      <p className="font-medium text-base md:text-lg leading-relaxed opacity-90">{item.description}</p>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-acid border-4 border-ink rounded-full shadow-hard z-10"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
          <div className="bg-ink text-paper border-2 border-ink rounded-3xl p-8 md:p-12 shadow-hard-xl">
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter mb-6 text-acid">
              OUR MISSION
            </h2>
            <p className="font-medium text-lg md:text-xl leading-relaxed opacity-90 mb-6">
              To make luxury and niche fragrances accessible to everyone in Thailand. We believe everyone deserves to smell amazing without breaking the bank. Try before you buy. Discover your signature scent. Join the Oh My Scent! family.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-paper/10 backdrop-blur-sm border border-paper/20 rounded-xl p-4 flex-1 min-w-[200px]">
                <div className="font-display text-3xl text-acid mb-2">5,000+</div>
                <div className="text-sm opacity-80">Happy Customers</div>
              </div>
              <div className="bg-paper/10 backdrop-blur-sm border border-paper/20 rounded-xl p-4 flex-1 min-w-[200px]">
                <div className="font-display text-3xl text-acid mb-2">500+</div>
                <div className="text-sm opacity-80">Authentic Scents</div>
              </div>
              <div className="bg-paper/10 backdrop-blur-sm border border-paper/20 rounded-xl p-4 flex-1 min-w-[200px]">
                <div className="font-display text-3xl text-acid mb-2">100%</div>
                <div className="text-sm opacity-80">Guaranteed Authentic</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;


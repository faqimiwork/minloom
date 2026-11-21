import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import HowItWorks from './components/HowltWorks';
import Features from './components/Features';
import ProductShowcase from './components/ProductShowcase';
import UseCases from './components/UseCases';
import Matrics from './components/Matrics';
import Pricing from './components/Pricing';
import FAQs from './components/FAQs';
import Footer from './components/Footer';
export default function App() {
  return (
    <main className="min-h-screen">
      <Hero /><SocialProof /><HowItWorks /><Features /><ProductShowcase /><UseCases /><Matrics /><Pricing /><FAQs /><Footer />
    </main>
  );
}

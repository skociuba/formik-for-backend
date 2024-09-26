import First from './sections/First';
import Second from './sections/Second';
import Hero from './components/commons/Hero';
import {heroContent} from './constants';
const Home: React.FC = () => (
  <>
    <div className="w-full overflow-hidden">
      <Hero heroContent={heroContent} />
      <First />
      <Second />
    </div>
  </>
);

export default Home;

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ScrollAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current, {
      opacity: 0,
      y: 100,
    }, {
      opacity: 1,
      y: 0,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        end: 'top 40%',
        scrub: true,
      }
    });
  }, []);

  return (
    <div ref={ref} className="text-3xl font-bold text-white text-center">
      Scroll-Based Animation Section
    </div>
  );
};

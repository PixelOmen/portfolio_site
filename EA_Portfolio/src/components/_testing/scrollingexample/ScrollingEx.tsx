import { useRef, useEffect } from 'react';
import styles from './scrollingex.module.css';

export default function ScrollingEx() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.remove(styles.scrollHidden);
        e.target.classList.add(styles.scrollShow);
      } else {
        e.target.classList.remove(styles.scrollShow);
        e.target.classList.add(styles.scrollHidden);
      }
    })
  });

  const section1 = useRef(null);
  const section2 = useRef(null);
  const section3 = useRef(null);
  const section4 = useRef(null);
  const sections = [
    section1,
    section2,
    section3,
    section4
  ]

  useEffect(() => {
    sections.forEach((s) => {
      if (s.current != null) {
        observer.observe(s.current);
      }
    });
  }, []);

  window.addEventListener('scroll', () => {
    console.log(window.scrollY);
  })


  return (
    <>
      <div className='pageContainer min-h-screen'>
        <section ref={section1} className={`${styles.scrollHidden} text-cyan-50 w-max mx-auto flex items-center border-4 h-[700px]`}>
          <div>
            <h1>This is first section</h1>
            <p>Some super descriptive stuff</p>
          </div>
        </section>
        <section ref={section2} className={`${styles.scrollHidden} text-cyan-50 w-max mx-auto flex items-center border-4 h-[700px]`}>
          <div>
            <h1>This is first section</h1>
            <p>Some super descriptive stuff</p>
          </div>
        </section>
        <section ref={section3} className={`${styles.scrollHidden} text-cyan-50 w-max mx-auto flex items-center border-4 h-[700px]`}>
          <div>
            <h1>This is first section</h1>
            <p>Some super descriptive stuff</p>
          </div>
        </section>
        <section ref={section4} className={`${styles.scrollHidden} text-cyan-50 w-max mx-auto flex items-center border-4 h-[700px]`}>
          <div>
            <h1>This is first section</h1>
            <p>Some super descriptive stuff</p>
          </div>
        </section>
      </div>
    </>
  )
}

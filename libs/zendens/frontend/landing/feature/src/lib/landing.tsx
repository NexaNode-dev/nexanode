import styles from './landing.module.css';
import Banner from '../assets/zendens-banner.png';
import Overview from '../assets/zendens-overview.webp';
import Rooms from '../assets/zendens-rooms.webp';
import Rooms2 from '../assets/zendens-rooms2.webp';

/* eslint-disable-next-line */
export interface LandingProps {}

export function Landing(props: LandingProps) {
  return [
    <header className={styles['header']}>
      <div className={styles['header-text']}>
        <h1>Welcome to Zen Dens</h1>
      </div>
      <div>
        <img src={Banner} alt="Zen Dens" className={styles['header-image']} />
      </div>
    </header>,
    <section className={styles['intro']}>
      <div>
        <img
          src={Overview}
          alt="Zen Dens Overview"
          className={styles['intro-image']}
        />
      </div>
      <div className={styles['intro-text']}>
        <h2>Discover Your Sanctuary of Tranquility</h2>
        <p>
          At Zen Dens, we believe that everyone deserves a place to relax and
          unwind. That's why we've created a collection of meditation spaces
          that are perfect for finding your inner peace.
        </p>
        <p>
          Whether you're looking for a quiet spot to meditate, a cozy nook to
          read a book, or a peaceful place to practice yoga, we have the perfect
          space for you.
        </p>
      </div>
      <div>
        <img
          src={Rooms}
          alt="Zen Dens Rooms"
          className={styles['intro-image']}
        />
      </div>
      <div className={styles['intro-rooms']}>
        <h2>Sleep well and freshen up in our soothing rooms</h2>
        <p>
          Our beds are made with plush pillows and cozy blankets, so you can
          drift off to sleep in no time. And our bathrooms are stocked with
          luxurious toiletries, so you can pamper yourself after a long day.
        </p>
        <p>
          Whether you're here for business or pleasure, we have everything you
          need to make your stay comfortable and relaxing.
        </p>
      </div>
      
      <div>
        <img
          src={Rooms2}
          alt="Zen Dens Rooms"
          className={styles['intro-image']}
        />
      </div>
      <div className={styles['intro-rooms2']}>
        <h2>Our rooms are designed to help you relax and rejuvenate</h2>
        <p>
          With calming colors, soft lighting, and comfortable seating, you'll
          feel at ease the moment you walk in the door. And with our
          state-of-the-art soundproofing, you can enjoy peace and quiet any
          time.
        </p>
        <p>
          Whether you're here for a quick nap or a long stay, our rooms are the
          perfect place to unwind and recharge.
        </p>
      </div>
    </section>,
    <footer className={styles['footer']}>
      <p>&copy; 2024 Zen Dens. All rights reserved.</p>
    </footer>,
  ];
}

export default Landing;

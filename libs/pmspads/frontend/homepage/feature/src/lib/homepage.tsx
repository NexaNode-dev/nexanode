import styles from './homepage.module.css';
import Gaming from '../assets/pmspads-gaming.webp';
import Rooftop from '../assets/pmspads-rooftop.webp';
import Gym from '../assets/pmspads-gym.webp';
import Pool from '../assets/pmspads-pool.webp';

/* eslint-disable-next-line */
export interface HomepageProps {}

export function Homepage(props: HomepageProps) {
  return [
    <header>
      <section className={styles.hero}>
        <h1 className={styles.heading}>PMS Pads</h1>
      </section>
      <nav className={styles.nav}>
        <ul>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#studios">Studios</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>,
    <section className={styles.intro}>
      <h1>Introducing PMSPads: Your Ultimate Retreat</h1>
      <p>
        Welcome to PMSPads: your sanctuary during that special time of the
        month. At PMSPads, we're dedicated to providing a luxurious and
        rejuvenating experience, tailored specifically for men seeking a break
        during their partner's menstrual cycle.
      </p>
      <p>
        At PMSPads, you can indulge in a week-long getaway at a location of your
        choice, surrounded by everything your heart desires. Whether you're
        seeking an extensive fitness experience to burn off some energy, a
        cutting-edge gaming space to showcase your competitive edge, or simply a
        serene relaxation area to unwind, we have it all for you. Our amenities
        are designed with your comfort and enjoyment in mind. Enjoy a wide range
        of food and beverages, all curated to your taste and preferences.
        Whether you crave a hearty meal or a refreshing drink, we ensure you
        lack for nothing.
      </p>
      <p>
        At PMSPads, it's all about you. Let us pamper you and provide you with
        an unforgettable experience during that special time of the month.
        Welcome to PMSPads, where your comfort is our priority. Discover a world
        of luxury and relaxation at PMSPads. Our dedicated team is committed to
        ensuring your every need is met, from the moment you arrive until the
        moment you depart. Sit back, relax, and let us take care of everything.
      </p>
      <p>
        Join us at PMSPads for an experience like no other. Whether you're
        looking to unwind with a massage, enjoy a gourmet meal, or simply take
        in the breathtaking surroundings, we have everything you need to make
        your stay unforgettable. Welcome to your ultimate retreat.
      </p>
    </section>,
    <section className={styles.features} id="features">
      <h1>Our Features</h1>
      <div className={styles.featurelist}>
        <div className={styles.feature}>
          <h2>State-of-the-Art Gaming Room</h2>
          <p>
            Our gaming room is equipped with the latest consoles and games,
            ensuring a fun and competitive gaming experience.
          </p>
          <img src={Gaming} alt="Gaming Room" />
        </div>
        <div className={styles.feature}>
          <h2>Rooftop Bar and Restaurant</h2>
          <p>
            Our rooftop bar and restaurant offer stunning views of the city,
            along with a wide range of food and drinks to enjoy during your
            stay.
          </p>
          <img src={Rooftop} alt="Rooftop Bar and Restaurant" />
        </div>
        <div className={styles.feature}>
          <h2>Fully equipped gym</h2>
          <p>
            Our fully equipped gym offers a range of fitness equipment to help
            you stay active and healthy during your stay.
          </p>
          <img src={Gym} alt="Fully equipped gym" />
        </div>
        <div className={styles.feature}>
          <h2>Swimming Pool</h2>
          <p>
            Our swimming pool is the perfect place to relax and unwind, with
            stunning views and plenty of space to enjoy a refreshing swim.
          </p>
          <img src={Pool} alt="Swimming Pool" />
        </div>
      </div>
    </section>,
    <footer className={styles.footer}>
      <p>&copy; 2024 PMSPads. All rights reserved.</p>
    </footer>,
  ];
}

export default Homepage;

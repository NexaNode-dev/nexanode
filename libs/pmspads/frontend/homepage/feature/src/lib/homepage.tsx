import styles from './homepage.module.css';
import Logo from '../assets/loft.jpg';

/* eslint-disable-next-line */
export interface HomepageProps {}

export function Homepage(props: HomepageProps) {
    const backgroundStyle = {
      backgroundImage: `url(${Logo})`,
      backgroundPosition: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '600px',
      margin: 'auto',
      backgroundSize: 'cover',
    };
    return (
      <div className={styles['App-body']}>
        <header>
          <div style={backgroundStyle}>
            <div className={styles['App-inlogo']}>
              <h1 className={styles['App-textH1']}>
                PMSPADS
              </h1>
              <p className={styles['App-textP']}>
                All the things a man can dream of
              </p>
            </div>
          </div>
         <div className={styles['construction-text']}>
            <h1>
              Introducing PMSPads: Your Ultimate Retreat
            </h1>
            <p>
              Welcome to PMSPads: your sanctuary during that special time of the month. At PMSPads, we're dedicated to providing a luxurious and rejuvenating experience, tailored specifically for men seeking a break during their partner's menstrual cycle.
            </p>
            <p>
              At PMSPads, you can indulge in a week-long getaway at a location of your choice, surrounded by everything your heart desires. Whether you're seeking an extensive fitness experience to burn off some energy, a cutting-edge gaming space to showcase your competitive edge, or simply a serene relaxation area to unwind, we have it all for you.
              Our amenities are designed with your comfort and enjoyment in mind. Enjoy a wide range of food and beverages, all curated to your taste and preferences. Whether you crave a hearty meal or a refreshing drink, we ensure you lack for nothing.
            </p> 
            <p>  
              At PMSPads, it's all about you. Let us pamper you and provide you with an unforgettable experience during that special time of the month. Welcome to PMSPads, where your comfort is our priority.
              Discover a world of luxury and relaxation at PMSPads. Our dedicated team is committed to ensuring your every need is met, from the moment you arrive until the moment you depart. Sit back, relax, and let us take care of everything.
            </p>
            <p>
              Join us at PMSPads for an experience like no other. Whether you're looking to unwind with a massage, enjoy a gourmet meal, or simply take in the breathtaking surroundings, we have everything you need to make your stay unforgettable. Welcome to your ultimate retreat.
            </p>
          </div>
  
        </header>
      </div>
    );

}

export default Homepage;

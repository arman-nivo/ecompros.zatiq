import styles from "./testimonial-carousel.module.css";

interface RatingStampProps {
  rating: number;
}

export default function RatingStamp({ rating }: RatingStampProps) {
  return (
    <div className={styles.stamp} aria-label={`Rated ${rating} out of 5`}>
      <svg viewBox="0 0 100 100" className={styles.stampRing} aria-hidden="true">
        <circle cx="50" cy="50" r="46" />
        <text>
          <textPath href="#stampCirclePath" startOffset="0%">
            VERIFIED&nbsp;CLIENT&nbsp;•&nbsp;VERIFIED&nbsp;CLIENT&nbsp;•
          </textPath>
        </text>
        <path
          id="stampCirclePath"
          d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          fill="none"
        />
      </svg>
      <span className={styles.stampRating}>{rating.toFixed(1)}</span>
    </div>
  );
}

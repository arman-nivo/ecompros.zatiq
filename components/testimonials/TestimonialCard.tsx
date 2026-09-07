import { forwardRef } from "react";
import type { Testimonial } from "@/data/Testimonials";
import RatingStamp from "./RatingStamp";
import styles from "./testimonial-carousel.module.css";

interface TestimonialCardProps {
  testimonial: Testimonial;
  isFront: boolean;
  depth: number; // 0 = front, 1/2/3 = stacked behind
}

const TestimonialCard = forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ testimonial, isFront, depth }, ref) => {
    const { role, quote, clientLocation, rating, dateRange, earned, rateType, hours } =
      testimonial;

    return (
      <div
        ref={ref}
        className={styles.card}
        data-front={isFront}
        aria-hidden={!isFront}
        tabIndex={isFront ? 0 : -1}
      >
        <div className={styles.perforation} aria-hidden="true" />

        <div className={styles.cardHead}>
          <p className={styles.role}>{role}</p>
          <RatingStamp rating={rating} />
        </div>

        <p className={styles.quote}>&ldquo;{quote}&rdquo;</p>

        <div className={styles.ledger}>
          <div className={styles.ledgerRow}>
            <span className={styles.ledgerLabel}>Client</span>
            <span className={styles.ledgerValue}>{clientLocation}</span>
          </div>
          <div className={styles.ledgerRow}>
            <span className={styles.ledgerLabel}>Dates</span>
            <span className={styles.ledgerValue}>{dateRange}</span>
          </div>
          <div className={styles.ledgerRow}>
            <span className={styles.ledgerLabel}>Terms</span>
            <span className={styles.ledgerValue}>
              {rateType}
              {hours ? ` · ${hours}` : ""}
            </span>
          </div>
        </div>

        <div className={styles.cardFoot}>
          <span className={styles.footLabel}>Total paid</span>
          <span className={styles.footAmount}>{earned}</span>
        </div>

        <span className={styles.depthTag} aria-hidden="true">
          {depth}
        </span>
      </div>
    );
  }
);

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;

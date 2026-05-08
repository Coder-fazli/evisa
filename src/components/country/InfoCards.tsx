import styles from "./InfoCards.module.css";

interface InfoCard {
  label: string;
  value: string;
}

interface InfoCardsProps {
  cards: InfoCard[];
}

export function InfoCards({ cards }: InfoCardsProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {cards.map((card) => (
          <div key={card.label} className={styles.card}>
            <p className={styles.label}>{card.label}</p>
            <p className={styles.value}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

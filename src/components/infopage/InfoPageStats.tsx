import styles from "./InfoPageStats.module.css";

interface Stat {
  icon?: string;
  value: string;
  label: string;
  description?: string;
}

interface InfoPageStatsProps {
  stats?: Stat[];
}

export function InfoPageStats({ stats }: InfoPageStatsProps) {
  const defaultStats: Stat[] = [
    { value: "10,450+", label: "Visa Approved" },
    { value: "540+", label: "Legal Matters" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "99.99%", label: "Success Rate" },
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {displayStats.map((stat, idx) => (
          <div key={idx} className={styles.card}>
            <p className={styles.label}>{stat.label}</p>
            <p className={styles.value}>{stat.value}</p>
            {stat.description && <p className={styles.description}>{stat.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

import { styles } from "./WelcomeSection.styles"

type WelcomeSectionProps={
  name:string;
}

export const WelcomeSection = ({name}:WelcomeSectionProps) => {
  return (
    <section className={styles.container()}>
      <h1 className={styles.title()}>Welcome Back, {name}</h1>
      <p className={styles.subtitle()}>
        This is your Monthly Overview Report
      </p>
    </section>
  )
}

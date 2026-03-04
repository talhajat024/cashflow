import React from "react";
import { styles } from "./LoginPage.styles";
import { LoginForm } from "../../components/LoginForm";
import { CreditCard,Sparkle,DiagonalStripes } from "./LoginPage.icons";

export const LoginPage:React.FC=()=>{
  return(
    <div className={styles.container()}>
      {/* left - blue hero */}
      <div className={styles.leftSection()}>
        {/* diagonal stripes overlay */}
        <div className={styles.stripeOverlay()}>
          <DiagonalStripes/>
        </div>

        {/* logo */}
        <div className={styles.logo()}>
          <div className={styles.logoIcon()}/>
          CashFlow
        </div>

        {/* Credit Cards */}
        <div className={styles.cardsContainer()}>
         <div style={{ position: 'relative', width: 280, height: 220 }}>
            <CreditCard rotate={-15} translateX={-30} translateY={10} opacity={0.75} />
            <CreditCard rotate={10} translateX={40} translateY={-20} opacity={1} />
            <Sparkle x={10} y={120} size={14} />
            <Sparkle x={220} y={55} size={10} />
          </div>
        </div>

        {/* Bottom Hero Text */}
        <div className={styles.heroBottom()}>
          <h1 className={styles.heroTitle()}>
             Say goodbye to financial stress
            <br />
            with the help of CashFlow.
          </h1>
          <p className={styles.heroDescription()}>
            Take control of your finances with CashFlow, the quickest and simplest way to manage your money.
          </p>

          <div className={styles.dotRow()}>
           <div className={styles.dot()} />
            <div className={styles.dotActive()} />
          </div>
        </div>
      </div>

       <div className={styles.rightSection()}>
        <LoginForm />
      </div>

    </div>
  )
}
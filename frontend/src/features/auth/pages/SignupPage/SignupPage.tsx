import React from "react";
import { styles } from "./SignupPage.styles";
import { SignupForm } from "../../components/SignupForm/SignupForm";
import { CashFlowChart } from "./SignupPage.icons";

export const SignupPage:React.FC=()=>{
    return(
        <div className={styles.container()}>
            {/* Left form */}
             <div className={styles.leftSection()}>
        <SignupForm />
      </div>

      {/* RIGHT — Chart */}
      <div className={styles.rightSection()}>
        <div className={styles.chartCardWrapper()}>

          {/* Back card — decorative */}
          <div className={styles.backCard()} />

          {/* Front card */}
          <div className={styles.frontCard()}>
            <p className={styles.chartTitle()}>Monthly Cash Flow Overview</p>

            {/* Legend */}
            <div className={styles.chartLegend()}>
              <div className={styles.legendItem()}>
                <div className={styles.legendDotBlue()} />
                Income
              </div>
              <div className={styles.legendItem()}>
                <div className={styles.legendDotPurple()} />
                Expenses
              </div>
            </div>

            {/* Chart */}
            <CashFlowChart />
          </div>
        </div>

        {/* Bottom text */}
        <div className={styles.bottomText()}>
          <h3 className={styles.bottomTitle()}>
            Take control of your finances.
          </h3>
          <p className={styles.bottomDescription()}>
            Join thousands of people managing their money smarter with CashFlow.
          </p>
        </div>
      </div>
        </div>
    )
}
    import { MoreHorizontal } from "lucide-react";
    import {
    wrapper,
    header,
    title,
    menuButton,
    summaryRow,
    summaryItem,
    summaryLabel,
    summaryValue,
    content,
    chartArea,
    legendArea,
    } from "./AllSpending.styles";

    import {
    Card,
    CardHeader,
    CardContent,
    } from "../../../../shared/ui/card/Card";
    import { SpendingDonutChart } from "./SpendingDonutChart";

    import { SpendingRow } from "./SpendingRow";

    export function AllSpending() {
    return (
        <Card>
        
        <CardHeader className={header()}>
            <h3 className={title()}>All Spending</h3>
            <button className={menuButton()}>
            <MoreHorizontal size={18} />
            </button>
        </CardHeader>

        <CardContent className={wrapper()}>
            <div className={summaryRow()}>
            <div className={summaryItem()}>
                <span className={summaryLabel()}>Weekly</span>
                <span className={summaryValue()}>$874.00</span>
            </div>

            <div className={summaryItem()}>
                <span className={summaryLabel()}>Monthly</span>
                <span className={summaryValue()}>$8,985.56</span>
            </div>

            <div className={summaryItem()}>
                <span className={summaryLabel()}>Yearly</span>
                <span className={summaryValue()}>$28,985.56</span>
            </div>
            </div>

            <div className={content()}>
            {/* Donut chart placeholder (SVG comes next) */}
            <div className={chartArea()}>
                <SpendingDonutChart />
            </div>

            {/* Legend */}
            <div className={legendArea()}>
                <SpendingRow
                color="blue"
                label="Workspace"
                value={46}
                />
                <SpendingRow
                color="green"
                label="Employee Salary"
                value={52}
                />
                <SpendingRow
                color="cyan"
                label="Shopping"
                value={24}
                />
            </div>
            </div>
        </CardContent>
        </Card>
    );
    }

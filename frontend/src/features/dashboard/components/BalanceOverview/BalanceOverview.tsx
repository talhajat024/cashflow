import { Card,CardHeader,CardContent } from "../../../../shared/ui";
import { BalanceChart } from "./BalanceChart";
import { TimeRangeSelect } from "../../../../shared/ui/filters";
import type { BalanceOverviewChart as  BalanceChartDto } from "../../types/dashboard.types";
import type { TimeRange } from "../../../../shared/ui/filters/TimeRangeSelect";

import {
    header,
    titleText,
    legendContainer,
    legendText,
    chartWrapper,
    legendDot
} from './BalanceOverview.styles';

type BalanceOverviewProps = {
    title:string;
    chart:BalanceChartDto;
    range:TimeRange;
    onRangeChange:(range:TimeRange)=> void;
};

export function BalanceOverview({title, chart,range,onRangeChange }:BalanceOverviewProps){
    return(
        <Card>
            <CardHeader className={header()}>
                <div>
                    <h4 className={titleText()}>{title}</h4>
                    <div className={legendContainer()}>
                        {chart.series.map((series) => (
                <div key={series.name} className="flex items-center gap-2">
                 <span  className={legendDot({color: series.name.toLowerCase() === "income"   ? "blue"    : "orange"})} />
            <span className={legendText()}>{series.name}</span>
            </div>
         ))}
            </div>
                </div>
                <TimeRangeSelect 
                    value={range}
                    onChange={onRangeChange}
                />
            </CardHeader>

            <CardContent>
                <div className={chartWrapper()}>
                <BalanceChart series={chart.series} activeMonth={chart.highlightedIndex ?? chart.series[0]?.data.length - 1}/>
                </div>
            </CardContent>
        </Card>
    );
}
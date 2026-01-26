import { Card,CardHeader,CardContent } from "../../../../shared/ui";
import { BalanceChart } from "./BalanceChart";
import { TimeRangeSelect } from "../../../../shared/ui/filters";

import {
    header,
    titleText,
    legendContainer,
    legendText,
    chartWrapper,
    legendDot
} from './BalanceOverview.styles';

type BalanceLegendItem = {
    label:string;
    color:"blue" | "orange" ;
}

type BalanceOverviewProps = {
    title:string;
    period:string;
    legendItems:BalanceLegendItem[];
};

export function BalanceOverview({title,period,legendItems}:BalanceOverviewProps){
    return(
        <Card>
            <CardHeader className={header()}>
                <div>
                    <h4 className={titleText()}>{title}</h4>
                    <div className={legendContainer()}>
                        {legendItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
             <span className={legendDot({ color: item.color })} />
            <span className={legendText()}>{item.label}</span>
            </div>
     ))}
            </div>
                </div>
                <TimeRangeSelect label={period} />
            </CardHeader>

            <CardContent>
                <div className={chartWrapper()}>
                <BalanceChart/>
                </div>
            </CardContent>
        </Card>
    );
}
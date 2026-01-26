import { chartWrapper,chartSvg,centerContent,centerValue,centerLabel } from "./SpendingDonutChart.styles";

type Ring={
    value:number;
    radius:number;
    color:string;
};

const SIZE=180;
const CENTER=SIZE/2;
const STROKE_WIDTH=10;

const rings:Ring[]=[
    {
        value:46,
        radius:78,
        color:"#2563EB",
    },{
        value:52,
        radius:60,
        color:"#F87171",
    },{
        value:24,
        radius:42,
        color:"#22D3EE",
    },
];

function getStroke(value:number,radius:number){
    const circumference=2*Math.PI*radius;
    return `${(value/100)*circumference} ${circumference}`;
}

export function SpendingDonutChart(){
    return(
        <div className={chartWrapper()}>
            <svg 
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className={chartSvg()}>
                {rings.map((ring,index)=>(
                    <g key={index}>
                         {/* Background track */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ring.radius}
              fill="transparent"
              stroke="#EEF2F7"
              strokeWidth={STROKE_WIDTH}
            />

            {/* Progress ring */}
            <circle
              cx={CENTER}
              cy={CENTER}
              r={ring.radius}
              fill="transparent"
              stroke={ring.color}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={getStroke(ring.value, ring.radius)}
              strokeLinecap="round"
            />

                    </g>
                ))}
            </svg>

            {/* Center content */}
      <div className={centerContent()}>
        <span className={centerValue()}>$524</span>
        <span className={centerLabel()}>Total Spend</span>
      </div>
        </div>
    )
}



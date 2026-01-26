import {
  row,
  left,
  dot,
  label,
  value,
} from "./SpendingRow.styles";


type SpendingRowProps = {
    color:string;
    label:string;
    value:number;
}


export function SpendingRow({
    color,
    label:text,
    value:percent,
}:SpendingRowProps){
    return(
        <div className={row()}>
            <div className={left()}>
              <span className={dot()} style={{ backgroundColor: color }}/>
              <span className={label()}>{text}</span>
            </div>
            <span className={value()}>{percent}%</span>
        </div>
    )
}




import { MoreHorizontal } from "lucide-react";
import { cardDetails } from "./CardDetails.styles";
import { Card,CardHeader, CardContent } from "../../../../../shared/ui";
import type { CardDetails as CardDetailsType } from "../../../types/wallet.types";

type CardDetailsProps={
    details:CardDetailsType;
}

export function CardDetails({details}:CardDetailsProps){
    const s= cardDetails({status:details.status});

    return(
        <Card>
            <CardHeader className={s.header()}>
                <h3 className={s.title()}>Card Details</h3>
                <button className={s.menuButton()}>
                    <MoreHorizontal size={18} />
                </button>
            </CardHeader>

            <CardContent>
                <div className={s.box()}>
                    <div className={s.row()}>
                        
                        {/*  Number */}
                        <div className={s.numberCol()}>
                        <span className={s.colLabel()}>Number</span>
                        <span className={s.colValue()}>{details.number}</span>
                        </div>

                         {/*  Expire Date */}
                        <div className={s.col()}>
                        <span className={s.colLabel()}>Expire Date</span>
                        <span className={s.colValue()}>{details.expireDate}</span>
                        </div>

                         {/*  Cvc */}
                        <div className={s.col()}>
                        <span className={s.colLabel()}>CVC</span>
                        <span className={s.colValue()}>{details.cvc}</span>
                        </div>

                         {/*  Status */}
                        <div className={s.col()}>
                        <span className={s.colLabel()}>Status</span>
                        <span className={s.colValue()}>{details.status}</span>
                        </div>

                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
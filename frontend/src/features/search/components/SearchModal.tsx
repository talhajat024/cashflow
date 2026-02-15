import { useEffect,useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card,CardHeader,CardContent } from "../../../shared/ui";
import { useSearch } from "../hooks/useSearch";
import * as styles from './SearchModal.styles'

interface Props{
    onClose:()=> void;
}

const groupLabels:Record<string,string>={
    page:"Pages",
    wallet:"Wallets",
    transaction:"Transactions",
}

export function SearchModal({onClose}:Props)
{
    const {query,setQuery,close,results}= useSearch();
    const [activeIndex,setActiveIndex]= useState(0);

    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    // Autofocus input
    useEffect(()=> {
        inputRef.current?.focus();
    },[]);

    // Reset active index on Query Change
    useEffect(()=>{
        setActiveIndex(0);
    },[query])

    // Keyboard handling
        useEffect(()=>{

            const handleKey= (e:KeyboardEvent)=>{
            if(e.key === 'Escape') {
                onClose();
                return;
            }
            if(e.key === "ArrowDown")
            {
                e.preventDefault();
                setActiveIndex((prev)=>
                prev< results.length -1 ? prev +1  :prev);
            }
            if(e.key === "ArrowUp")
            {
                e.preventDefault();
                setActiveIndex((prev)=> 
                prev > 0 ? prev -1 :prev);
            }

            if(e.key === "Enter")
            {
                if(results[activeIndex])
                {
                    navigate(results[activeIndex].path);
                    close();
                }
            }
            }
            window.addEventListener("keydown",handleKey);
            return ()=> window.removeEventListener("keydown",handleKey);
        },[results,activeIndex,navigate,close,onClose])  

        const groupedResults = results.reduce((acc,item)=>{
            console.log("the acc is:",acc, " the current item is:",item);
            if(!acc[item.type])
            {
                acc[item.type] = [];
            }
            acc[item.type].push(item);
            return acc;
        },{} as Record<string,typeof results>)

    return(
        <div className={styles.overlay()}>
            <Card className={styles.modal()}>
                <CardHeader>
                    <div className={styles.header()}>
                        <input 
                        ref={inputRef}
                        value={query}
                        onChange={(e)=> setQuery(e.target.value)}
                        placeholder="Search anything"
                        className={styles.input()} />
                    </div>
                </CardHeader>

                <CardContent className={styles.results()}>
                    {results.length === 0 && query && (
                        <p className={styles.emptyState()}>
                            No Results Found
                        </p>
                    )}
                   {(() => {
            let globalIndex = -1;

            return Object.entries(groupedResults).map(([type, items]) => (
              <div key={type}>
                <div className={styles.section()}>
                  {groupLabels[type]}
                </div>
            
                {items.map((item) => {
                  globalIndex += 1;
                  const isActive = globalIndex === activeIndex;
                
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.path);
                        close();
                      }}
                      className={styles.resultItem({ active: isActive })}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
           ));
         })()}
                </CardContent>
            </Card>
        </div>  
    )
}
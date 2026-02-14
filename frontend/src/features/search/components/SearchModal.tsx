import { useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card,CardHeader,CardContent } from "../../../shared/ui";
import { useSearch } from "../hooks/useSearch";
import * as styles from './SearchModal.styles'

export function SearchModal()
{
    const {query,setQuery,close,results}= useSearch();

    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    // Autofocus input
    useEffect(()=> {
        inputRef.current?.focus();
    },[]);

    // close on Escape
    useEffect(()=>{
        const handleKey= (e:KeyboardEvent)=>{
        if(e.key === 'Escape') close();
        }
        window.addEventListener("keydown",handleKey);
        return ()=> window.removeEventListener("keydown",handleKey);
    },[close])  

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

                    {results.map((item)=>(
                        <button
                        key={item.id}
                        onClick={()=>{
                            navigate(item.path)
                            close();
                        }}
                        className={styles.resultItem()}
                        >
                            {item.label}
                        </button>
                    ))}
                </CardContent>
            </Card>
        </div>  
    )
}
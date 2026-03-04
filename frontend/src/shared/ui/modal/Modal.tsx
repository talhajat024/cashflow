import { useEffect } from "react";
import ReactDOM from "react-dom";
import { modalOverlay,modalContainer,modalTitle,modalClose,modalContent } from "./Modal.styles";

interface ModalProps {
    isOpen:boolean,
    onClose:()=>void;
    title?:string;
    children:React.ReactNode;
}

export default function Modal({isOpen,onClose,title,children}:ModalProps){

    // close on ESC
    useEffect(()=>{
        const handleEsc=(e:KeyboardEvent)=>{
            if(e.key === 'Escape')
            {
                onClose();
            }
        }
            document.addEventListener("keydown",handleEsc);
            return ()=> document.removeEventListener("keydown",handleEsc);
    },[onClose]);

    if(!isOpen) return null;

    return ReactDOM.createPortal(
        <div className={modalOverlay()} onClick={onClose}>
      <div className={modalContainer()} onClick={(e) => e.stopPropagation()}>
        {title && <h2 className={modalTitle()}>{title}</h2>}
        <button className={modalClose()} onClick={onClose}>
          ✕
        </button>
        <div className={modalContent()}>{children}</div>
      </div>
    </div>,
    document.body
    );
}


import * as styles from './EmptyState.styles';

interface EmptyStateProps{
    title:string;
    description?:string;
    actionLabel?:string;
    onAction?:()=>void;
}

export const EmptyState=({title,description,actionLabel,onAction}:EmptyStateProps)=>{
    return(
        <div className={styles.wrapper()}>
      <h3 className={styles.title()}>{title}</h3>

      {description && (
        <p className={styles.description()}>{description}</p>
      )}

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={styles.actionButton()}
        >
          {actionLabel}
        </button>
      )}
    </div>
    )
}
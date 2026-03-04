import * as styles from './ErrorState.styles';

interface ErrorStateProps{
    message?:string;
    onRetry?:()=>void;
}

export const ErrorState=({message="Something went wrong",onRetry}:ErrorStateProps)=>{
    return(
        <div className={styles.wrapper()}>
      <h3 className={styles.title()}>
        Failed to load data
      </h3>

      <p className={styles.message()}>
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className={styles.retryButton()}
        >
          Try again
        </button>
      )}
    </div>
    )
}
// shared/utils/debounce.ts

export function debounceFn<F extends (...args: any[]) => void>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  const debounced = (...args:Parameters<F>)=>{
    if(timeoutId) clearTimeout(timeoutId);
    timeoutId= setTimeout(() => func(...args), delay);
  }

  // cancel for cleanup
  debounced.cancel = ()=>{
    if(timeoutId)
    {
        clearTimeout(timeoutId);
    }
  };
  return debounced;
}
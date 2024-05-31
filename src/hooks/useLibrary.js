import { useCallback } from "react";

function useLibrary() {
  
  const convertObject = useCallback((data) => {
    return <>{data ? data.toUpperCase() : "N/A"}</>;
  }, []);
  const convertString = useCallback((data) => {
    return <>{data.length > 0 ? data.toUpperCase() : "N/A"}</>;
  }, []);
  return { convertObject, convertString};
}

export default useLibrary;

import { useState, useEffect } from "react";
// Define general type for useWindowSize hook, which includes width and height
export interface Size {
  width: number;
  height: number;
}

function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export default useWindowSize;
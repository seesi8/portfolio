import { useEffect, useState } from "react";

const useScrollPosition = (ref) => { // 'ref' is expected to be a ref object from useRef
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) { // Ensure the ref has a current value (the DOM element)
        setScrollPosition(ref.current.scrollTop);
      }
    };

    if (ref.current) {
      ref.current.addEventListener("scroll", updatePosition);
      updatePosition(); // Set initial position
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("scroll", updatePosition);
      }
    };
  }, [ref]); // Dependency array includes 'ref' because its 'current' value might change if the element re-renders

  return scrollPosition;
};

export default useScrollPosition;
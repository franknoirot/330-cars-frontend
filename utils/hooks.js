import { useLayoutEffect, useEffect, useState, useRef } from "react";

// Got from https://usehooks.com/useLockBodyScroll/
export function useLockBodyScroll() {
  useEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;

    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle);
  }, []); // Empty array ensures effect is only run on mount and unmount
}


// // Intersection Observer Hook
// // Got from https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
// export const useIntersect = async ({ root = null, rootMargin, threshold = 0 }) => {
//   const [entry, updateEntry] = useState({})
//   const [node, setNode] = useState(null)

//   const observer = useRef(
//     await initializeObserver(([entry]) => updateEntry(entry), {
//       root,
//       rootMargin,
//       threshold,
//     })
//   )

//   useEffect(
//     () => {
//       const { current: currentObserver } = observer
//       currentObserver.disconnect()

//       if (node) currentObserver.observe(node)

//       return () => currentObserver.disconnect()
//     }
//   )

//   return [setNode, entry]
// }

// // helper function to useIntersect
// export const buildThresholdArray = () => Array.from(Array(100).keys(), i => i / 100);

// async function initializeObserver(cb, options) {
//   if (!('IntersectionObserver' in window)) {
//     await import('intersection-observer')
//   }
//   return new IntersectionObserver(cb, options)
// }
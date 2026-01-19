import * as React from 'react';
import { useInView } from 'motion/react';

/**
 * Custom hook to detect if an element is in the viewport using Framer Motion's useInView.
 * 
 * @param {React.RefObject} ref - The ref of the element to observe.
 * @param {Object} options - Configuration options for the intersection observer.
 * @param {boolean} [options.inViewOnce=false] - If true, the hook will only return true once when the element enters the viewport.
 * @param {string} [options.inViewMargin='0px'] - Margin around the root. Can have values similar to the CSS margin property.
 * @returns {Object} An object containing the local ref and a boolean indicating if the element is in view.
 */
function useIsInView(ref, options = {}) {
  const { inView, inViewOnce = false, inViewMargin = '0px' } = options;

  // Create a local ref to be used if no external ref is provided
  const localRef = React.useRef(null);

  // Sync the external ref with the local ref
  React.useImperativeHandle(ref, () => localRef.current);

  // Use Framer Motion's useInView hook to track visibility
  const inViewResult = useInView(localRef, {
    once: inViewOnce,
    margin: inViewMargin,
  });

  // Combine custom inView prop (if provided) with the actual intersection result
  const isInView = !inView || inViewResult;

  return { ref: localRef, isInView };
}

export { useIsInView };

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation(); // Get the current location (including the hash)

  useEffect(() => {
    // Handle visibility of the "scroll to top" button
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Check if the URL has a hash (like #top) and scroll to the element
    const scrollToHashElement = () => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1)); // Remove the '#' from the hash
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Scroll to the hash element when the location changes
    scrollToHashElement();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [location]); // Runs whenever the location changes (e.g., when the URL changes)

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
}

import { ArrowLeft } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from '../utils/scrollWithOffset'
// import ScrollToTop from '../components/ScrollToTop';
import { useEffect, useState } from 'react';

interface Publication {
  title: string;
  authors: string;
  conference: string;
  year: number;
  abstract: string;
  link: string;
  kind: string; // Added kind to handle different publication types
}

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    'Journal Publications': true,
    'Conference Proceedings': true,
    'Other': true,
  });

  useEffect(() => {
    fetch('/Media/Publications.json')
      .then((res) => res.json())
      .then((data) => setPublications(data))
      .catch((err) => console.error('Failed to load publications:', err));
  }, []);

  const colorPalette = [
    { 
      bg: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/20', 
      border: 'border-yellow-600', 
      text: 'text-yellow-600', 
      hoverText: 'hover:text-yellow-700 dark:hover:text-yellow-700'
    },
    { 
      bg: 'hover:bg-green-100 dark:hover:bg-green-900/20', 
      border: 'border-green-600', 
      text: 'text-green-600', 
      hoverText: 'hover:text-green-700 dark:hover:text-green-700'
    },
    { 
      bg: 'hover:bg-rose-100 dark:hover:bg-rose-900/20', 
      border: 'border-rose-600', 
      text: 'text-rose-600', 
      hoverText: 'hover:text-rose-700 dark:hover:text-rose-700'
    },
    { 
      bg: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/20', 
      border: 'border-indigo-600', 
      text: 'text-indigo-600', 
      hoverText: 'hover:text-indigo-700 dark:hover:text-indigo-700'
    },
    { 
      bg: 'hover:bg-teal-100 dark:hover:bg-teal-900/20', 
      border: 'border-teal-600', 
      text: 'text-teal-600', 
      hoverText: 'hover:text-teal-700 dark:hover:text-teal-700'
    },
    { 
      bg: 'hover:bg-purple-100 dark:hover:bg-purple-900/20', 
      border: 'border-purple-600', 
      text: 'text-purple-600', 
      hoverText: 'hover:text-purple-700 dark:hover:text-purple-700'
    },
    { 
      bg: 'hover:bg-blue-100 dark:hover:bg-blue-900/20', 
      border: 'border-blue-600', 
      text: 'text-blue-600', 
      hoverText: 'hover:text-blue-700 dark:hover:text-blue-700'
    },
    { 
      bg: 'hover:bg-pink-100 dark:hover:bg-pink-900/20', 
      border: 'border-pink-600', 
      text: 'text-pink-600', 
      hoverText: 'hover:text-pink-700 dark:hover:text-pink-700'
    }
  ];

  const sortedPublications = [...publications].sort((a, b) => b.year - a.year);

  // Create a mapping of year to color index
  const yearToColorMap = {};
  sortedPublications.forEach((pub, index) => {
    if (!yearToColorMap[pub.year]) {
      yearToColorMap[pub.year] = colorPalette[index % colorPalette.length];
    }
  });

  // Toggle section visibility
  const toggleSection = (kind: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [kind]: !prev[kind], // Toggle the visibility for the clicked section
    }));
  };

  // Group publications by their "kind"
  const groupedPublications = sortedPublications.reduce((acc, pub) => {
    const kind = pub.kind || 'Other'; // If the kind is undefined, use 'Other'
    if (!acc[kind]) acc[kind] = [];
    acc[kind].push(pub);
    return acc;
  }, {} as { [key: string]: Publication[] });

  // Define the order of predefined sections
  const sectionOrder = ['Journal Publications', 'Conference Proceedings', 'Other'];

  // Add sections dynamically for any unexpected kind values
  const dynamicSections = Object.keys(groupedPublications).filter(
    (kind) => !sectionOrder.includes(kind)
  );

  // Combine predefined sections with dynamically created ones
  const allSections = [...sectionOrder, ...dynamicSections];

  return (
    <>
      <div id="top" className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-20 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Master Title */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Publications</h1>

          {/* Loop over the predefined section order and dynamic sections */}
          {allSections.map((kind) => {
            const publicationsInSection = groupedPublications[kind];
            const isOpen = openSections[kind];

            // Skip empty sections
            if (!publicationsInSection || publicationsInSection.length === 0) {
              return null; // Skip empty sections
            }

            return (
              <div key={kind} className="mb-8">
                <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-8">
                    {/* Section Title with Expand/Collapse Button */}
                    <div className="flex justify-between items-center cursor-pointer text-3xl font-bold text-gray-900 dark:text-white mb-4" onClick={() => toggleSection(kind)}>
                      <span>{kind}</span>
                      {/* Only show the button if the section is collapsed */}
                      {!isOpen && (
                        <button
                          onClick={() => toggleSection(kind)}
                          className="text-gray-500 dark:text-gray-300 w-6 h-6 text-xl"
                        >
                          ▼
                        </button>
                      )}
                    </div>

                    {/* Collapsible Content */}
                    {isOpen && (
                      <div className="space-y-8">
                        {publicationsInSection.map((pub, index) => {
                          const color = yearToColorMap[pub.year];

                          return (
                            <div
                              key={index}
                              className={`pl-6 py-4 transition-colors duration-300 border-l-4 ${color.border} ${color.bg}`}
                            >
                              <h2 className={`text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300 ${color.hoverText}`}>
                                <HashLink smooth to={pub.link} scroll={scrollWithOffset}
                                 target="_blank" rel="noopener noreferrer">{pub.title}</HashLink>
                              </h2>
                              <p className="text-gray-600 dark:text-gray-300 mt-2">
                                {
                                  pub.authors.split(', ').map((author, index) => 
                                    author === "A Patel" ? <strong key={index}>{author}</strong> : author
                                  ).reduce((prev, curr) => [prev, ', ', curr])
                                }
                              </p>
                              <p className="text-gray-600 dark:text-gray-300 mt-1">
                                <span className="italic text-gray-800 dark:text-gray-300">{pub.conference}</span> • 
                                <span className={`font-bold ${color.text}`}>{pub.year}</span>
                              </p>
                              <p className="text-gray-600 dark:text-gray-300 mt-4">{pub.abstract}</p>
                              <div className="mt-4">
                                <HashLink smooth to={pub.link} scroll={scrollWithOffset}
                                target="_blank" rel="noopener noreferrer"
                                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                >
                                  Read More →
                                </HashLink>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Professional Achievements</h2>
    <div className="flex flex-wrap justify-center gap-8">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">1</div>
        <div className="text-gray-600 dark:text-gray-300 mt-2">Citations</div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">4</div>
        <div className="text-gray-600 dark:text-gray-300 mt-2">Publications</div>
      </div>
      {/* <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">5</div>
        <div className="text-gray-600 dark:text-gray-300 mt-2">Research awards</div>
      </div> */}
      {/* <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">5</div>
        <div className="text-gray-600 dark:text-gray-300 mt-2">Research awards</div>
      </div> */}
    </div>
  </div>
</div>


      
      <div className="bg-gray-50 dark:bg-dark-bg py-8 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <HashLink smooth scroll={scrollWithOffset}
            to="/#publications_preview"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </HashLink>
        </div>
      </div>

      {/* <ScrollToTop /> */}
    </>
  );
}

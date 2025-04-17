import { ArrowLeft } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from '../utils/scrollWithOffset'
import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
// import ScrollToTop from '../components/ScrollToTop';
import React from 'react'; // Make sure this is imported for JSX types

// Helper to turn "AI Code Assistant" into "ai-code-assistant"
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// 🔗 Link keywords to URLs
const keywordLinks: Record<string, string> = {
  TPMS: 'https://doi.org/10.1088/2631-7990/ac5be6',
  'TPMS-based': 'https://doi.org/10.1088/2631-7990/ac5be6',
};

// ✅ This helper replaces matched keywords with <a> elements
const createLinkedDescription = (
  text: string,
  links: Record<string, string>
): React.ReactNode[] => {
  const keywords = Object.keys(links);
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi');

  return text.split(regex).map((part, index) => {
    const match = keywords.find((word) => word.toLowerCase() === part.toLowerCase());
    if (match) {
      return (
        <HashLink smooth to={links[match]} scroll={scrollWithOffset}
          key={index}
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </HashLink>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

function Projects() {
  const location = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('/Media/Projects.json')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => Number(b.year) - Number(a.year));
        setProjects(sorted);
      })
      .catch((error) => console.error('Error loading projects:', error));
  }, []);

  const colorPalette = [
    { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-600 dark:text-yellow-400' },
    { bg: 'bg-green-100 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400' },
    { bg: 'bg-rose-100 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400' },
    { bg: 'bg-indigo-100 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400' },
    { bg: 'bg-teal-100 dark:bg-teal-900/20', text: 'text-teal-600 dark:text-teal-400' },
    { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
    { bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400' },
    { bg: 'bg-pink-100 dark:bg-pink-900/20', text: 'text-pink-600 dark:text-pink-400' }
  ];

  const yearColorMap: Record<string, { bg: string; text: string }> = {};
  let colorIndex = 0;

  projects.forEach((project) => {
    const year = String(project.year);
    if (!yearColorMap[year]) {
      yearColorMap[year] = colorPalette[colorIndex % colorPalette.length];
      colorIndex++;
    }
  });

  return (
    <>
      <div id="top" className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl">
            <div className="p-8 pb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">My Projects</h1>

              <div className="space-y-12">
                {projects.map((project) => {
                  const slug = slugify(project.title);
                  return (
                    <div
                      key={slug}
                      id={slug}
                      className="bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="md:flex">
                        <div className="md:w-3/5">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-8 md:w-2/5">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
                            <span className={`px-2 py-1 text-xl font-medium rounded ${yearColorMap[project.year].bg} ${yearColorMap[project.year].text}`}>
                              {project.year}
                            </span>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {createLinkedDescription(project.description, keywordLinks)}
                          </p>

                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features:</h3>
<ul className="grid grid-cols-1 gap-2 mb-6">
  {project.features.map((feature, index) => (
    <li key={index} className="flex items-start text-gray-600 dark:text-gray-300">
      <span className="w-2 h-2 mt-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
      <span>{createLinkedDescription(feature, keywordLinks)}</span>
    </li>
  ))}
</ul>


                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies Used:</h3>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.technologies.map((tech, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-sm font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-4">
                            {project.paperUrl !== "#" && (
                              <HashLink smooth to={project.paperUrl} scroll={scrollWithOffset}
      target="_blank"
      rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                              >
                                View publication
                              </HashLink>
                            )}

                            {project.githubUrl !== "#" && (
                              <HashLink smooth to={project.githubUrl} scroll={scrollWithOffset}
      target="_blank"
      rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                View Code
                              </HashLink>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 mb-8">
            <HashLink smooth scroll={scrollWithOffset}
              to="/#projects_preview"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </HashLink>
          </div>
        </div>
      </div>

      {/* <ScrollToTop /> */}
    </>
  );
}

export default Projects;

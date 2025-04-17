import { useEffect, useRef, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { scrollWithOffset } from '../utils/scrollWithOffset'
import { ArrowRight, FolderGit2 } from 'lucide-react';

type Project = {
  title: string;
  image: string;
  alt: string;
  features: string[];
  highlight: number;
  year: string | number;
};

// Helper to convert title to slug
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function ProjectsPreview() {
  const [projects, setProjects] = useState<Project[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/Media/Projects.json')
      .then((res) => res.json())
      .then((data: Project[]) => {
        const highlighted = data
          .filter((project) => project.highlight === 1)
          .sort((a, b) => Number(b.year) - Number(a.year));
        setProjects(highlighted);
      })
      .catch((err) => console.error('Failed to load project data:', err));
  }, []);

  // Show scrollbar only while scrolling
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      container.classList.add('show-scrollbar');
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        container.classList.remove('show-scrollbar');
      }, 1000); // Hide scrollbar after 1s of inactivity
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
      <div id="projects_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <FolderGit2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">Projects</h2>
          </div>
          <div className="relative">
            <div
              ref={scrollRef}
              className="overflow-x-auto transition-all duration-300 custom-scroll-container"
            >
              <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
                {projects.slice(0, 5).map((project) => {
                  const slug = slugify(project.title);
                  return (
                    <HashLink smooth scroll={scrollWithOffset}
                      key={slug}
                      to={`/projects#${slug}`}
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden group/card hover:shadow-lg transition-shadow duration-300"
                      style={{ width: '300px' }}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.alt}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{project.title}</h3>
                        <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                          {project.features.slice(0, 3).map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                    </HashLink>
                  );
                })}
              </div>
            </div>
          </div>

          <HashLink smooth scroll={scrollWithOffset}
            to="/projects"
            className="mt-8 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            Explore all projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
          </HashLink>
        </div>
      </div>
    </section>
  );
}
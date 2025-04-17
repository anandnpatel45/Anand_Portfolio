import { ArrowRight, User, GraduationCap, FolderGit2, BookText, Code, ArrowLeft, Clock } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState } from 'react';
import ProjectsPreview from '../components/ProjectsPreview'; // adjust path as needed
import { scrollWithOffset } from '../utils/scrollWithOffset'

type Skill = {
  name: string;
  color: string;
  value: number;
};

export default function Home() {
  const [skillsData, setSkillsData] = useState<Record<string, Skill[]>>({}); // ✅ Moved here
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(new Date());
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // ✅ Fetching skills JSON here
    fetch('/Media/Skills.json')
      .then((res) => res.json())
      .then((data) => {
    const entries = Object.entries(data).slice(0, 3); // Get first 3 sections
    const trimmedData = Object.fromEntries(entries);  // Convert back to object

    setSkillsData(trimmedData);
  })
      .catch((err) => console.error('Failed to load skills data:', err));


    return () => clearInterval(timer);
  }, []);

const [latestPublicationTitle, setLatestPublicationTitle] = useState<string>('');

  useEffect(() => {
    fetch('/Media/Publications.json')
      .then(res => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return;
  
        // Find the latest year
        const latestYear = Math.max(...data.map(pub => pub.year));
        
        // Get first publication from that year
        const latestPub = data.find(pub => pub.year === latestYear);
  
        if (latestPub) {
          setLatestPublicationTitle(latestPub.title);
        }
      })
      .catch(err => console.error('Failed to load publications:', err));
  }, []);
 

  const formatTime = () => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/New_York'
    }).format(time);
  };

  const getClockHandsAngles = () => {
    const estTime = new Date(time.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const hours = estTime.getHours() % 12;
    const minutes = estTime.getMinutes();
    const seconds = estTime.getSeconds();

    const hourAngle = (hours * 30);
    const minuteAngle = (minutes * 6);
    const secondAngle = (seconds * 6);

    return { hourAngle, minuteAngle, secondAngle };
  };

  const introText = "Hello, I'm";
  const words = introText.split(' ');

  const { hourAngle, minuteAngle, secondAngle } = getClockHandsAngles();

  return (
    <div id="top" className="min-h-screen dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient-x"></div>
          <div className="absolute inset-0 bg-pattern opacity-40"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-element floating-element-1"></div>
          <div className="floating-element floating-element-2"></div>
          <div className="floating-element floating-element-3"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Photo with Animation */}
            {/* <div className="order-1 lg:order-2 transform hover:scale-105 transition-all duration-500">
              <div className="relative z-20">
                <div className="w-[250px] h-[250px] md:w-[390px] md:h-[390px] rounded-full overflow-hidden border-8 border-white dark:border-gray-800 shadow-2xl mx-auto lg:ml-[-20px] animate-float">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=800&q=80"
                    alt="Profile"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div> */}
            <div className="order-2 lg:order-1 transform hover:scale-105 transition-all duration-500">
  <div className="relative z-100">
    <div className="w-[250px] h-[330px] md:w-[340px] md:h-[444px] rounded-full border-8 border-white shadow-lg overflow-hidden mx-auto animate-float lg:ml-[100px]">
      <img
        src="/Media/Profile.jpg" // Profile should have a aspect ratio less than 3:4. The images needs to be longer than 4:3 calculation to accomodate for the animations. 
        alt="Profile"
        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
      />
    </div>
  </div>
</div>


            {/* Text Content with Animations */}
            <div className="order-1 lg:order-2 text-center lg:text-left lg:-ml-20">
              <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight animate-slide-in">
                  {words.map((word, index) => (
                    <span key={index} className="hero-word mr-4">
                      {word}
                    </span>
                  ))}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-text hero-word md:text-8xl" >
                    Anand Patel
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 animate-type">
                  Researcher • Engineer • Lifelong Leaner
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <HashLink smooth scroll={scrollWithOffset}
                    to="/projects"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    View My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </HashLink>
                  <HashLink smooth scroll={scrollWithOffset} to="#contact"
                    className="inline-flex items-center px-8 py-4 text-lg font-medium text-gray-700 dark:text-white border-2 border-gray-700 dark:border-white rounded-full hover:bg-gray-700 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
                  >
                    Contact Me
                  </HashLink>
                </div>

                {/* Clock Component */}
                <div className="mt-10 inline-flex bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ml-8">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-gray-600 dark:bg-gray-400 rounded-full"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `rotate(${i * 30}deg) translate(0, -22px)`,
      transformOrigin: 'center',
      marginLeft: '-1.75px', // half of w-2 (8px)
      marginTop: '-2px',  // half of h-2 (8px)
                          }}
                        ></div>
                      ))}
                      <div className="absolute inset-0 rounded-full border-2 border-brown-100 dark:border-brown-300"></div>
                      <div
                        className="absolute left-1/2 top-1/2 w-1 h-4 bg-gray-800 dark:bg-gray-200 rounded-full"
                        style={{ 
                          transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
                          transformOrigin: '50% 100%'
                        }}
                      ></div>
                      <div
                        className="absolute left-1/2 top-1/2 w-0.5 h-5 bg-blue-600 dark:bg-blue-400 rounded-full"
                        style={{ 
                          transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
                          transformOrigin: '50% 100%'
                        }}
                      ></div>
                      <div
                        className="absolute left-1/2 top-1/2 w-0.5 h-5 bg-red-500 rounded-full"
                        style={{ 
                          transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
                          transformOrigin: '50% 100%'
                        }}
                      ></div>
                      <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        My Local Time (EST)
                      </div>
                      <div className="text-lg font-bold text-gray-800 dark:text-gray-200 tabular-nums">
                        {formatTime()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Previews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-16">
        {/* About Preview */}
        <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
          <div  id="about_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">About Me</h2>
              </div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Where machines meet models — I explore, engineer, and evolve systems for tomorrow's manufacturing ...
                {/* Passionate mechanical engineer with a focus on creating impactful solutions... */}
              </p>
              <HashLink smooth scroll={scrollWithOffset}
                to="/about"
                className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                Learn more about me
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </HashLink>
            </div>
          </div>
        </section>

        {/* Education Preview */}
        <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
          <div id="education_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center">
                <GraduationCap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">Education</h2>
              </div>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                Engineer and researcher shaped by mechanical systems, now reimagining them through data and learning ...
              </p>
              <HashLink smooth scroll={scrollWithOffset}
                to="/education"
                className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                View my educational background
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </HashLink>
            </div>
          </div>
        </section>

        {/* Projects Preview */}
        <ProjectsPreview />

        {/* Publications Preview */}
        <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
          <div id="publications_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center">
                <BookText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">Publications</h2>
              </div>
              <div className="mt-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">Latest Publication</h3>
                <p className="text-gray-600 dark:text-gray-300">
  {latestPublicationTitle || 'Loading latest publication...'} . . .
</p>
              </div>
              <HashLink smooth scroll={scrollWithOffset}
                to="/publications"
                className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                View all publications
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </HashLink>
            </div>
          </div>
        </section>

        {/* Skills Preview */}
        <section className="group relative transform hover:-translate-y-2 transition-all duration-300">
  <div id="skills_preview" className="bg-white dark:bg-dark-card rounded-2xl shadow-xl overflow-hidden">
    <div className="p-8">
      <div className="flex items-center mb-6">
        <Code className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white ml-4">Skills</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(skillsData).map(([category, skills]) => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white capitalize">
              {category}
            </h3>
            <div className="relative">
              <svg className="w-full" viewBox="0 0 100 100">
                {skills.map((skill, index) => {
                  // Calculate the total value of all skills in the category
                  const totalValue = skills.reduce((sum, skill) => sum + skill.value, 0);
                  if (totalValue === 0) return null;  // Avoid division by zero

                  // Calculate start and end angles based on the skill values
                  const startAngle = (skills.slice(0, index).reduce((sum, s) => sum + s.value, 0) * 360) / totalValue;
                  const endAngle = ((skills.slice(0, index + 1).reduce((sum, s) => sum + s.value, 0)) * 360) / totalValue;

                  // Compute the x and y coordinates for the arc
                  const x1 = 50 - 40 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 50 - 40 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 50 - 40 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 50 - 40 * Math.sin((endAngle * Math.PI) / 180);
                  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

                  return (
                    <path
                      key={skill.name}
                      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                      fill={skill.color}
                      className={`transition-all duration-300 transform ${hoveredSkill === skill.name ? 'scale-110' : ''}`}
                      style={{
                        transformOrigin: '50% 50%', // Ensures the scaling happens from the center
                      }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    />
                  );
                })}
                <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
              </svg>
            </div>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className={`flex items-center justify-between text-sm p-2 rounded-lg transition-colors duration-300 ${
                    hoveredSkill === skill.name
                      ? 'bg-gray-100 dark:bg-gray-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: skill.color }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <HashLink smooth scroll={scrollWithOffset}
        to="/skills"
        className="mt-8 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
      >
        See detailed skills
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
      </HashLink>
    </div>
  </div>
</section>


      </div>
      
    </div>
  );
}
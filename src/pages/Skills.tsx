import { ArrowLeft, ArrowUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


type Skill = {
  name: string;
  color: string;
  value: number;
};

export default function Skills() {
  const [skillsData, setSkillsData] = useState<Record<string, Skill[]>>({}); // ✅ Moved here
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const location = useLocation();

  useEffect(() => {
    
    if (location.hash === '#top') {
      const topElement = document.getElementById('top');
      if (topElement) {
        console.log("Found the top element. Scrolling to it.");
        topElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn("The 'top' element was not found.");
      }
    }
    // ✅ Fetching skills JSON here
    fetch('/Media/Skills.json')
      .then((res) => res.json())
      .then((data) => setSkillsData(data))
      .catch((err) => console.error('Failed to load skills data:', err));
  }, [location]);


// ===== 🎯 General Languages =====
// | Hex Code     | #FFCC00   | #4CAF50   | #F44336   | #2196F3   | #FF9800   | #9C27B0   | #E91E63   | #3F51B5   |
// | Color Name   | Yellow    | Green     | Red       | Blue      | Orange    | Purple    | Pink      | Indigo    |

// ===== 🎨 Frontend =====
// | Hex Code     | #61DAFB   | #4CAF50   | #FF4081   | #3178C6   | #DD0031   | #563D7C   | #06B6D4   | #FF5722   |
// | Color Name   | Light Blue| Green     | Pink      | Blue      | Red       | Purple    | Cyan      | Deep Orange|

// ===== 🛠️ Backend =====
// | Hex Code     | #81C784   | #F57C00   | #0288D1   | #F48FB1   | #FF7043   | #64B5F6   | #9E9E9E   | #80DEEA   |
// | Color Name   | Soft Green| Orange    | Blue      | Soft Pink| Coral Org.| Light Blue| Grey      | Light Cyan|


  
//   const skillsData = {
//   programming: [
//     { name: 'JavaScript', color: '#FFCC00', value: 50 }, // Yellow
//     { name: 'Python', color: '#4CAF50', value: 30 },      // Green
//     { name: 'Java', color: '#F44336', value: 20 },        // Red
//     // { name: 'Go', color: '#2196F3', value: 5 },           // Blue
//     // { name: 'Rust', color: '#FF9800', value: 35 },        // Orange
//     // { name: 'C++', color: '#9C27B0', value: 45 },         // Purple
//     // { name: 'Ruby', color: '#E91E63', value: 40 },        // Pink
//     // { name: 'PHP', color: '#3F51B5', value: 25 }          // Indigo
//   ],
//   frontend: [
//     { name: 'React', color: '#61DAFB', value: 80 },       // Light Blue
//     { name: 'Vue.js', color: '#4CAF50', value: 70 },      // Green
//     { name: 'CSS/Sass', color: '#FF4081', value: 50 },    // Pink
//     { name: 'TypeScript', color: '#3178C6', value: 40 },  // Blue
//     { name: 'Angular', color: '#DD0031', value: 65 },     // Red
//     // { name: 'Bootstrap', color: '#563D7C', value: 55 },   // Purple
//     // { name: 'Tailwind CSS', color: '#06B6D4', value: 80 }, // Cyan
//     // { name: 'HTML', color: '#FF5722', value: 90 }         // Deep Orange
//   ],
//   backend: [
//     { name: 'Node.js', color: '#81C784', value: 90 },     // Soft Green
//     { name: 'Django', color: '#F57C00', value: 60 },      // Orange
//     { name: 'Spring', color: '#0288D1', value: 50 },      // Blue
//     // { name: 'Ruby on Rails', color: '#F48FB1', value: 70 }, // Soft Pink
//     // { name: 'Laravel', color: '#FF7043', value: 65 },     // Coral Orange
//     // { name: 'ASP.NET', color: '#64B5F6', value: 45 },     // Light Blue
//     // { name: 'Flask', color: '#9E9E9E', value: 30 },       // Grey
//     // { name: 'Express.js', color: '#80DEEA', value: 80 }    // Light Cyan
//   ]
// };

  const createDonutChart = (skills: typeof skillsData.programming) => {
  const totalValue = skills.reduce((acc, skill) => acc + skill.value, 0);
  
  // Normalize the total to 100 if it's not already
  const normalizedSkills = skills.map(skill => ({
    ...skill,
    value: (skill.value / 1) * 1,
  }));
  
  let paths = [];
  let startAngle = 0;

  for (let i = 0; i < normalizedSkills.length; i++) {
    const skill = normalizedSkills[i];
    const angle = (skill.value / totalValue) * 360;
    const endAngle = startAngle + angle;
    console.log("End Value: ", startAngle, skill.value, angle, endAngle, Math.cos((startAngle * Math.PI)/180), Math.sin((startAngle * Math.PI)/180), Math.sin((endAngle * Math.PI)/180), Math.sin((endAngle * Math.PI)/180));

    
    const x1 = 50 - 40 * Math.cos((startAngle * Math.PI) / 180);
    const y1 = 50 - 40 * Math.sin((startAngle * Math.PI) / 180);
    const x2 = 50 - 40 * Math.cos((endAngle * Math.PI) / 180);
    const y2 = 50 - 40 * Math.sin((endAngle * Math.PI) / 180);
    
    const isHovered = hoveredSkill === skill.name;
    const scale = isHovered ? 1.1 : 1;
    const transform = isHovered ? `translate(${(x1 - 50) * 0.1}, ${(y1 - 50) * 0.1})` : '';

const largeArcFlag = angle > 180 ? 1 : 0;
    paths.push(
      <path
        key={skill.name}

      d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
        fill={skill.color}
        transform={transform}
        style={{
          transition: 'all 0.3s ease',
          transform: `scale(${scale})`,
          transformOrigin: '50% 50%',
        }}
        onMouseEnter={() => setHoveredSkill(skill.name)}
        onMouseLeave={() => setHoveredSkill(null)}
        className="cursor-pointer hover:opacity-90"
      />
    );
    startAngle += angle;
  }

  return paths;
};

function wrapSkillName(name: string | null): React.ReactNode {
  if (!name) return null;

  const words = name.split(/[\s/-]/g);
  const lineHeight = 9.5;
  const totalHeight = (words.length - 1) * lineHeight;
  const initialDy = -(totalHeight / 2); // start above center

  return words.map((word, index) => (
    <tspan
      key={index}
      x="50"
      dy={index === 0 ? initialDy : lineHeight}
    >
      {word}
    </tspan>
  ));
}


  return (
    <>
      <div id="top" className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 pb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">Skills & Expertise</h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {Object.entries(skillsData).map(([key, category]) => (
                  <div key={key} className="space-y-6">
                    <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
                      {key}
                    </h2>
                    <div className="relative aspect-square">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full transform transition-transform duration-300"
                      >
                          <defs>
    <filter id="text-shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0.5" dy="0.5" stdDeviation="0.5" floodColor="black" floodOpacity="0.5" />
    </filter>
  </defs>
                        {createDonutChart(category)}
                        <circle
                          cx="50"
                          cy="50"
                          r="25"
                          fill="white"
                          className="dark:fill-gray-800"
                        />
                        {hoveredSkill && category.find(s => s.name === hoveredSkill) && (
                        <text
  x="50"
  y="50"
  textAnchor="middle"
  dominantBaseline="middle"
  fontSize="9"
  fontWeight="400"
  className="text-gray-900 dark:text-white"
  strokeWidth="0.1"
  filter="url(#text-shadow)"
  fill="currentColor"

>
  {wrapSkillName(hoveredSkill)}

</text>
                        )}
                      </svg>
                    </div>
                    <div className="space-y-2">
                      {category.map((skill) => (
                        <div
                          key={skill.name}
                          className={`flex items-center justify-between p-2 rounded-lg transition-colors duration-300 ${
                            hoveredSkill === skill.name
                              ? 'bg-gray-100 dark:bg-gray-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                          }`}
                          onMouseEnter={() => setHoveredSkill(skill.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div className="flex items-center space-x-2">
                            <span
                              className="w-3 h-3 rounded-full"
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


  {/* <div className="mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Professional Achievements</h2>
    <div className="flex flex-wrap justify-center gap-8">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">5</div>
        <div className="text-gray-600 dark:text-gray-300 mt-2">Projects Completed</div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">100+</div>
        <div className="text-gray-600 dark:text-gray-300 mt-2">GitHub Contributions</div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">10+</div>
        <div className="text-gray-600 dark:text-gray-300 mt-2">Tech Talks</div>
      </div>
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-[28%] text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">5</div>
        <div className="text-gray-600 dark:text-gray-300 mt-2">ABC</div>
      </div>
    </div>
  </div> */}


              
            </div>
          </div>
          {/* Now the Back to Home button stays aligned with the card */}
<div className="mt-8 mb-8">
  <Link
    to="/#skills_preview"
    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
  >
    <ArrowLeft className="w-4 h-4 mr-2" />
    Back to Home
  </Link>
</div>
</div> {/* close max-w-4xl */}
</div> {/* close top section */}
      
    </>
  );
}

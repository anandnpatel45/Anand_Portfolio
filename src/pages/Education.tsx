import { ArrowLeft } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
// import ScrollToTop from '../components/ScrollToTop';
import { useEffect } from 'react';
import { scrollWithOffset } from '../utils/scrollWithOffset'

export default function Education() {
useEffect(() => {
  const reveals = document.querySelectorAll('.fade-in');

  const revealOnScroll = () => {
    for (const el of reveals) {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 50;

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('opacity-100', 'translate-y-1');
        el.classList.remove('opacity-0', 'translate-y-8');
      }
    }
  };

  // Show everything immediately on load (optional: remove this if scroll-only)
  revealOnScroll();

  window.addEventListener('scroll', revealOnScroll);
  return () => window.removeEventListener('scroll', revealOnScroll);
}, []);



  const education = [
    {
      degree: "Ph.D. in Mechanical Engineering",
      institution: "Rutgers University, USA",
      period: "2023 - (expected 2027)",
      description: "Performing research focused on knowledge transfer and resilience in manufacturing",
      achievements: [
        "(current) 4/4 GPA",
        "Published 4 papers ",
        "Teaching Assistant for mechanics of advanced manufacturing course."
      ]
    },
    {
      degree: "Master of Technology (with Research) in Mechanical Engineering",
      institution: "Indian Institute of Science (IISc), Bengaluru, IN",
      period: "2021 - 2023",
      description: "Thesis title: Inverse material design using deep convolutional neural networks and ontology",
      achievements: [
        "9.3/10 GPA",
        "Recipient of AICTE Postgraduate Scholarship",
        "Research Assistant in CAD Lab, IISc (PI: Dr. B. Gurumoorthy)",
      ]
    },
    {
      degree: "Bachelor of Technology in Mechanical Engineering",
      institution: "BVM Eng. College, Anand, IN",
      period: "2017 - 2021",
      description: "Acquired a strong foundation in mechanical‑engineering principles and project leadership.",
      achievements: [
        "9.3/10 CPI",
        "Final year project was awarded first prize in the college-level Project Expo",
        "Training and Placement coordinator for AY 2018-19"
      ]
    }
  ];

  const competitiveExams = [
    {
      title: "Graduate Record Examination (GRE)",
      year: "Nov 2022",
      score: "Analytical writing: 4.0/6, Verbal: 156/170, Quantitative: 167/170, Total: 323/340",
      description: "An internationally recognized graduate admission test aiming to measure verbal reasoning, quantitative reasoning, analytical writing, and critical thinking skills"
    },
    {
      title: "Graduate Aptitude Test in Engineering (GATE)",
      year: "Mar 2021",
      score: "Score: 727/1000, Rank: 1527 out of 120,594 candidates",
      description: "A national-level (India) examination primarily assessing the comprehensive understanding of various undergraduate subjects in engineering and science"
    },
    {
      title: "International English Language testing System (IELTS)",
      year: "Oct 2022",
      score: "Overall band score: 8/9",
      description: "A globally recognized test assessing the candidate’s listening, reading, writing, and speaking skills in the English language"
    },
    {
      title: "Gujarat Common Entrance Test (GUJCET)",
      year: "May 2017",
      score: "96.46 Percentile",
      description: "A state-level (Gujarat, India) entrance test for candidates seeking admission to undergraduate-level engineering & technology courses"
    }
  ];

  const certifications = [
    {
      name: "Python for Data Science and Machine Learning Bootcamp",
      issuer: "Udemy",
      year: "May 2022"
    },
    {
      name: "Autodesk Certified Professional: AutoCAD",
      issuer: "Autodesk certification",
      year: "Sept 2018"
    }
  ];

  return (
    <>
      <div id="top" className="min-h-screen bg-gray-50 dark:bg-dark-bg pt-20 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-dark-card rounded-2xl shadow-2xl overflow-hidden transform transition duration-500 fade-in opacity-0 translate-y-8">
            <div className="p-8 pb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Education</h1>

              <div className="space-y-12 fade-in opacity-0 translate-y-8 transition duration-700">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6 relative fade-in opacity-0 translate-y-8 transition duration-700">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[10px] top-0"></div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{edu.degree}</h2>
                    <h3 className="text-xl text-blue-600 dark:text-blue-400 mt-1">{edu.institution}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{edu.period}</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-3">{edu.description}</p>
                    <ul className="mt-4 space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Competitive Exams */}
              <div className="mt-12 fade-in opacity-0 translate-y-8 transition duration-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Competitive Exams</h2>
                <div className="space-y-6">
                  {competitiveExams.map((exam, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-sm fade-in opacity-0 translate-y-8 transition duration-700">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-[1.35rem]">{exam.title}</h3>
                        <span className="text-lg md:text-xl text-gray-500 dark:text-gray-400">{exam.year}</span>
                      </div>
                      <p className="font-semibold text-blue-600 dark:text-blue-400 mb-2 text-[1.05rem]">{exam.score}</p>
                      <p className="text-gray-600 dark:text-gray-300">{exam.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-12 fade-in opacity-0 translate-y-8 transition duration-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Professional Certifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 fade-in opacity-0 translate-y-8 transition duration-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mt-2">{cert.issuer}</p>
                      <p className="text-gray-500 dark:text-gray-400 mt-1">{cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-dark-bg py-8 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <HashLink smooth scroll={scrollWithOffset}
            to="/#education_preview"  
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

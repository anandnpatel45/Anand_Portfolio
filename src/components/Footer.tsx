import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 dark:bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-400" />
                <a href="mailto:your.email@example.com" className="text-gray-300 hover:text-blue-400">
                 anandkumar.patel@rutgers.edu
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-400" />
                <span className="text-gray-300">+1 (732) 558-8709</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                <span className="text-gray-300">Edison, NJ</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Social Links</h3>
            <div className="space-y-3">
              <a href="https://github.com/anandnpatel45" 
      target="_blank"
      rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-400">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/anp444/" 
      target="_blank"
      rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-400">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </a>
              {/* <a href="https://twitter.com" className="flex items-center text-gray-300 hover:text-blue-400">
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </a> */}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/Media/Anandkumar_CV.pdf"
      target="_blank"
      rel="noopener noreferrer"
                  className="text-gray-300 hover:text-blue-400">Download my CV</a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">Blog</a>
              </li> */}
              {/* <li>
                <a href="#" className="text-gray-300 hover:text-blue-400">Privacy Policy</a>
              </li> */}
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Anandkumar Patel. All rights reserved.
          </p>
          <p className="text-center text-gray-400">
            Website designed and developed by Anandkumar Patel. Last updated April 14 2025.
          </p>
        </div>
      </div>
    </footer>
  );
}
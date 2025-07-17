
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              MindfulSpace
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your personal journey to inner peace and mindfulness. Discover guided meditations, 
              breathing exercises, and wellness practices designed for modern life.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Guided Meditations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Breathing Exercises</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Sleep Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mindfulness Courses</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Progress Tracking</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">hello@mindfulspace.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2024 MindfulSpace. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            Made with <Heart className="w-4 h-4 text-red-400 mx-1" /> for mindful living
          </div>
        </div>
      </div>
    </footer>
  );
};

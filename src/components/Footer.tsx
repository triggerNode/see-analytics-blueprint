
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1A2136] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="text-2xl font-bold mb-4">
              {"{s}ee"} Analytics
            </div>
            <p className="text-gray-400 mb-6">
              Turn messy Roblox game data into clear, do-this-next insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#22D3EE] transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-[#22D3EE] transition-colors">
                Discord
              </a>
              <a href="#" className="text-gray-400 hover:text-[#22D3EE] transition-colors">
                YouTube
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 {"{s}ee"} Analytics. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm">
              Sign In
            </Link>
            <Link to="/signup" className="text-gray-400 hover:text-white transition-colors text-sm">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

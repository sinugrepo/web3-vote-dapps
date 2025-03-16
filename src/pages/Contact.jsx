import React from 'react';
import { User, Wallet, MessageSquare, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-8">Contact Developer</h1>
            
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <User className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Developer</h3>
                  <p className="text-lg font-semibold text-gray-900">Rizki Nugroho</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Wallet Address</h3>
                  <p className="text-lg font-mono text-gray-900 break-all">
                    0xfa3ae2ad13f97d253452d9cbcb353dc8d0891e2d
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Discord</h3>
                  <a 
                    href="https://discordapp.com/users/sinugsss" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    @sinugsss
                  </a>
                </div>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <Twitter className="w-6 h-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Twitter</h3>
                  <a 
                    href="https://x.com/rizki_nugr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    @rizki_nugr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
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

              {/* GitHub Link with correct icon */}
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                {/* Replace MessageSquare with GitHub icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-blue-600 mr-4"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Github</h3>
                  <a
                    href="https://github.com/sinugrepo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    sinugrepo
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
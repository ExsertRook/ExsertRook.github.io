import React, { useState } from 'react';
import { Download, Music, Youtube, AlertCircle } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [songInfo, setSongInfo] = useState({ title: '', artist: '', duration: '' });

  const isValidYoutubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!isValidYoutubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    setIsLoading(true);
    setError('');
    setDownloadLink('');

    try {
      // In a real application, you would make an API call to a backend service
      // that handles the YouTube to MP3 conversion
      // For demo purposes, we'll simulate a successful conversion after a delay
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate song info retrieval
      setSongInfo({
        title: 'Sample Song Title',
        artist: 'Sample Artist',
        duration: '3:45'
      });
      
      // Simulate download link generation
      // In a real app, this would be a link provided by your backend
      setDownloadLink('#sample-download-link');
      
    } catch (err) {
      setError('Failed to convert video. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-800 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Youtube className="h-8 w-8 text-red-600 mr-2" />
          <Music className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-center ml-2">YouTube to MP3</h1>
        </div>
        
        <p className="text-gray-600 text-center mb-6">
          Convert YouTube videos to MP3 audio files
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL here"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center transition ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Converting...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Convert to MP3
              </>
            )}
          </button>
        </form>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {downloadLink && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="mb-3">
              <h3 className="font-bold text-lg">{songInfo.title}</h3>
              <p className="text-gray-600">{songInfo.artist} • {songInfo.duration}</p>
            </div>
            
            <a
              href={downloadLink}
              download
              className="block w-full py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium text-center transition flex items-center justify-center"
            >
              <Download className="mr-2 h-5 w-5" />
              Download MP3
            </a>
            
            <p className="mt-3 text-xs text-gray-500 text-center">
              By using this service, you agree to our Terms of Service and confirm that you're not violating any copyright laws.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-white text-center max-w-md">
        <h2 className="text-xl font-semibold mb-2">How to use:</h2>
        <ol className="text-left list-decimal pl-6 space-y-2">
          <li>Copy the YouTube video URL you want to convert</li>
          <li>Paste the URL in the input field above</li>
          <li>Click the "Convert to MP3" button</li>
          <li>Wait for the conversion to complete</li>
          <li>Download your MP3 file</li>
        </ol>
      </div>
      
      <footer className="mt-8 text-white text-sm opacity-75">
        <p>© 2025 YouTube to MP3 Converter. For personal use only.</p>
      </footer>
    </div>
  );
}

export default App;
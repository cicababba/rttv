import './App.css'

function App() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[length:20px_20px] opacity-5"></div>
      <h1 className="text-3xl font-bold text-orange-500 animate-glow">
        Hello! Are you ready to take over the world?
      </h1>
      <div className="absolute bottom-4 w-full text-center text-xs text-neutral-400">
        Made with ❤️ by{' '}
        <a
          href="https://github.com/cicababba"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-orange-500"
        >
          cicababba
        </a>{' '}
        with{' '}
        <a
          href="https://www.npmjs.com/package/rttv"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-orange-500"
        >
          rttv
        </a>
      </div>
      <style>
        {`@keyframes glow {
            from { text-shadow: 0 0 2px rgba(255,159,10,0.5); }
            to   { text-shadow: 0 0 6px rgba(255,159,10,1); }
          }
          .animate-glow {
            animation: glow 4s ease-in-out infinite alternate;
          }
        `}
      </style>
    </div>
  );
}

export default App

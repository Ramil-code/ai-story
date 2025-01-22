import AudioGenerator from './components/AudioGenerator';

function App() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="text-center max-w-[1200px] p-4">
        <h1 className="text-3xl font-bold mb-5">
          AI Story-Based Time Filler
        </h1>
        <AudioGenerator />
      </div>
    </div>
  );
}

export default App;
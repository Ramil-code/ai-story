import { useState, useRef, useEffect } from 'react';

export default function AudioGenerator() {
  const [duration, setDuration] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch((err) => 
        console.warn('Autoplay was blocked by the browser:', err)
      );
    }
  }, [audioUrl]);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const trimmedDuration = duration.trim();
      const durationInSeconds = trimmedDuration && !isNaN(Number(trimmedDuration))
        ? Math.min(Math.max(Math.floor(Number(trimmedDuration)), 1), 360)
        : 30;

      if (!trimmedDuration || isNaN(Number(trimmedDuration))) {
        alert('Please enter a valid number for duration.');
        setLoading(false);
        return;
      }

      const payload = JSON.stringify({
        prompt: topic.trim() || 'Write a short text for narration.',
        desiredDuration: durationInSeconds,
      });

      console.log('Sending request with data:', payload);
      
      const response = await fetch('REPLACE BY YOUR API', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      console.log('RAW response:', response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request error: ${response.status}, ${errorText}`);
      }

      const data = await response.json();
      console.log('Server response:', data);
      setAudioUrl(data.audioUrl);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to fetch audio: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '0 16px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Duration (1 - 360 sec):
        </label>
        <input
          type="number"
          placeholder="10"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Topic/Genre:
        </label>
        <input
          type="text"
          placeholder="Adventure"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007BFF',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          borderRadius: '4px',
        }}
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {loading && <p style={{ textAlign: 'center', marginTop: '10px' }}>Loading...</p>}

      {audioUrl && !loading && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <h3>Listen to the audio track:</h3>
          <audio ref={audioRef} controls autoPlay style={{ width: '100%' }}>
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support HTML5 audio.
          </audio>
        </div>
      )}
    </div>
  );
}

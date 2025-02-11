import { useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';

export default function SpeechCounter({ mantra, setMantra }) {
  const [count, setCount] = useState(0);
  const [listening, setListening] = useState(false);
  
  const recognition = useMemo(() => {
    const rec = new window.webkitSpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "hi-IN";
    return rec;
  }, []);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          const transcript = result[0].transcript.trim().toLowerCase();
          if (transcript.includes(mantra.toLowerCase())) {
            setCount(prev => prev + (transcript.split(mantra.toLowerCase()).length - 1));
          }
        }
      }
    };

    recognition.onend = () => {
      if (listening) recognition.start();
    };

    return () => {
      recognition.abort();
    };
  }, [listening, mantra, recognition]);

  const startListening = () => {
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setListening(false);
    recognition.stop();
  };

  return (
    <div className="text-center">
      <h2 className="text-xl mb-2">Your Input: <strong>{mantra}</strong></h2>
      <p className="text-2xl mb-4">Count: {count}</p>

      <button
        onClick={listening ? stopListening : startListening}
        className={`px-4 py-2 rounded text-white ${listening ? "bg-red-500" : "bg-green-500"}`}
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button>

      <button
        onClick={() => setCount(0)}
        className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Reset
      </button>

      <button
        onClick={() => setMantra("")}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Change Mantra
      </button>
    </div>
  );
}

SpeechCounter.propTypes = {
  mantra: PropTypes.string.isRequired,
  setMantra: PropTypes.func.isRequired,
};
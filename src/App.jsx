import { useState } from "react";
import MantraInput from "./components/MantraInput";
import SpeechCounter from "./components/SpeechCounter";

export default function App() {
  const [mantra, setMantra] = useState("");

  return (
    <div className="text-center p-5">
      <h1 className="text-3xl font-bold mb-4">Word/String Counting App</h1>
      {!mantra ? (
        <MantraInput setMantra={setMantra} />
      ) : (
        <SpeechCounter mantra={mantra} setMantra={setMantra} />
      )}
    </div>
  );
}
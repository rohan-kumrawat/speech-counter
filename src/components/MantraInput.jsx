import { useState } from "react";
import PropTypes from "prop-types";

export default function MantraInput({ setMantra }) {
  const [input, setInput] = useState("");

  return (
    <div>
      <h2 className="text-xl mb-2">Enter your mantra:</h2>
      <input
        type="text"
        id="mantra"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-2 border text-black"
        placeholder="Type your mantra here..."
      />
      <button
        onClick={() => setMantra(input)}
        disabled={!input.trim()}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start
      </button>
    </div>
  );
}

MantraInput.propTypes = {
  setMantra: PropTypes.func.isRequired,
};
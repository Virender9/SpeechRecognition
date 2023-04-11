import "./App.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { useState } from "react";

function App() {
  const [textCopy, settextCopy] = useState();
  // using the clipbaord state
  const [isCopied, setCopied] = useClipboard(textCopy);

  // To start the function of listening
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  // To stop the function of listening
  const stopListening = () => SpeechRecognition.stopListening();

  // the function of the speech recogintion where transcript prints the words and browserSupportsSpeechRecognition test the capability of browser
  const {
    transcript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // if browser not supported then return null
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  if (!isMicrophoneAvailable) {
    return "Error in Microphone";
  }

  return (
    <>
      <div className='container'>
        <h1>Speech To Text Converter</h1>
        <div className='description'>
          <h5>
            The project is basically a speech converter. Where we use the Speech
            Converter Hook. Here we use the System microphone to listen and
            convert it into text
          </h5>
        </div>
        <section
          className='main_content'
          onClick={() => settextCopy(transcript)}
        >
          <p>{transcript}</p>
        </section>
        {/* Transcript is added in the ocontent box to print the words */}

        <div className='btn_style'>
          <button onClick={setCopied}>
            Was it copied? {isCopied ? "Yes! 👍" : "Nope! 👎"}
          </button>
          <button onClick={startListening}>Start Listening</button>
          <button onClick={stopListening}>Stop Listening</button>
        </div>
      </div>
    </>
  );
}

export default App;

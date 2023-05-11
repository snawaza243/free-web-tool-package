const textToSpeak = document.getElementById('text-to-speak');
const speakButton = document.getElementById('speak-button');

speakButton.addEventListener('click', () => {
  const ssml = `
    <speak>
      ${textToSpeak.value}
    </speak>
  `;
  
  const utterance = new SpeechSynthesisUtterance();
  utterance.ssml = ssml;
  
  speechSynthesis.speak(utterance);
});

const convertButton = document.querySelector('#convert-button');
const downloadButton = document.querySelector('#download-button');
const textInput = document.querySelector('#text-input');
const audioPlayer = document.querySelector('#audio-player');

convertButton.addEventListener('click', () => {
  // Use SSML to convert text to speech
  const ssml = `
    <speak version="1.1"
           xmlns="http://www.w3.org/2001/10/synthesis"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://www.w3.org/2001/10/synthesis
                               http://www.w3.org/TR/speech-synthesis11/synthesis.xsd"
           xml:lang="en-US">
      ${textInput.value}
    </speak>
  `;
  const audioUrl = `https://api.voices.com/authorize/download?audioFormat=mp3&ssml=${encodeURIComponent(ssml)}`;

  // Set the audio source and play the audio
  audioPlayer.src = audioUrl;
  audioPlayer.play();

  // Enable the download button and set its href attribute to the audio URL
  downloadButton.href = audioUrl;
  downloadButton.removeAttribute('style');
});

audioPlayer.addEventListener('ended', () => {
  // Show the download button once the audio has finished playing
  downloadButton.style.display = 'inline-block';
});

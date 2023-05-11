const synth = window.speechSynthesis;
const textInput = document.getElementById('text');
const convertBtn = document.getElementById('convert');
const downloadLink = document.getElementById('download');

convertBtn.addEventListener('click', () => {
    const text = textInput.value;
    if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; // Change language code here
        utterance.voiceURI = 'Google US English'; // Change voice URI here
        synth.speak(utterance);

        // Wait for speech to finish before downloading
        utterance.onend = () => {
            const blob = new Blob([textToSpeech(text)], { type: 'audio/mp3' });
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.click();
        };
    }
});

// Converts text to speech using SSML and returns an MP3 file
function textToSpeech(text) {
    const ssml = `
        <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.w3.org/2001/10/synthesis
        http://www.w3.org/TR/speech-synthesis/synthesis.xsd"
        xmlns:dc="http://purl.org/dc/elements/1.1/">
            <voice name="en-US-Wavenet-D">
                ${text}
            </voice>
        </speak>
    `;

    const parser = new DOMParser();
    const ssmlDoc = parser.parseFromString(ssml, 'application/xml');
    const utterance = new SpeechSynthesisUtterance();
    utterance.voiceURI = 'Google US English'; // Change voice URI here
    utterance.lang = 'en-US'; // Change language code here
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.voice = synth.getVoices().find(voice => voice.voiceURI === utterance.voiceURI);
    utterance.text = ssmlDoc.getElementsByTagName('voice')[0].innerHTML;
    const audioData = new AudioContext().createBuffer(1, 1, 22050);
    const source = new AudioBufferSourceNode(audioData);
    source.buffer = audioData;
    source.connect(new GainNode(new AudioContext())).connect(new MediaStreamAudioDestinationNode(new AudioContext()).stream).onended = () => { };
    utterance.audioContext = source.context;
    utterance.audioContext.resume();
    synth.speak(utterance);
    return new Response(new Blob([new Uint8Array(await new Promise(resolve => source.onended = resolve)).buffer]), { headers: { 'Content-Type': 'audio/mp3' } }).arrayBuffer();
}

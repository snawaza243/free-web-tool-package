function downloadVideo() {
	const videoLink = document.getElementById('video-link').value;
	const errorElement = document.getElementById('error-message');

	// Check if video link is valid
	if (!videoLink) {
		errorElement.innerHTML = 'Please enter a valid video link.';
		return;
	}

	// Create a download link with the video link
	const downloadLink = document.createElement('a');
	downloadLink.href = videoLink;
	downloadLink.download = 'video.mp4';

	// Append the download link to the body and click it
	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
}

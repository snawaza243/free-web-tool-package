function removeBackground() {
    const input = document.getElementById("image-input");
    const resultDiv = document.getElementById("result");
    
    // Get the image file from the input field
    const file = input.files[0];
    
    // Check if a file was uploaded
    if (!file) {
      alert("Please select an image file");
      return;
    }
    
    // Create a new FileReader object
    const reader = new FileReader();
    
    // When the FileReader has loaded the image, remove the background using your algorithm
    reader.onload = function(event) {
      const img = new Image();
      img.onload = function() {
        // Remove the background here using your algorithm or a library like remove.bg
        const resultImage = img; // Replace this with the result of your algorithm or remove.bg
        
        // Display the original and result images to the user
        const originalImage = document.createElement("img");
        originalImage.src = event.target.result;
        
        const resultImageElement = document.createElement("img");
        resultImageElement.src = resultImage.src;
        
        resultDiv.innerHTML = "";
        resultDiv.appendChild(originalImage);
        resultDiv.appendChild(resultImageElement);
      };
      img.src = event.target.result;
    }
    
    // Read the image file as a data URL
    reader.readAsDataURL(file);
  }
  
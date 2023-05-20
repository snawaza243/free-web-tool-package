for(element of document.getElementsByClassName('ytp-ce-element')) {     
  element.style.display = 'none'; } 
 // Replace PLAYLIST_ID with your actual playlist ID
  const playlistId = "PLWrt9b23q7UEQzxmJh4tAXwU4OBPxEC7O";
  // const playlistId = "PLWrt9b23q7UHNYZ0gY6Oo0iWlyA_TWn_h";

  // Get playlist videos and add them to the playlist
  fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=AIzaSyDhb7446vWfvES-HhVbLWFS9Km4Hy0Bhe0`)
    .then(response => response.json())
    .then(data => {
      const playlist = document.getElementById("playlist");
      const index = 0;
      data.items.forEach(item => {
        const videoId = item.snippet.resourceId.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.default.url;
        const description = item.snippet.description;

        const li = document.createElement("li");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const h2 = document.createElement("h2");
        img.src = thumbnail;
        img.alt = title;
        p.innerHTML = description;
        h2.innerHTML = title;
        li.appendChild(img);
        li.appendChild(h2);
        // li.appendChild(p);
        li.addEventListener("click", ()=> {
          const player = document.getElementById("player");
          player.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        });
        playlist.appendChild(li);
      });
    })
    .catch(error => console.error(error));
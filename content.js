// Change all text to Skibidi weird text
async function transformText(apiKey) {
  const elements = document.querySelectorAll("*:not(script):not(style):not(meta):not(title)");
  elements.forEach(el => {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
      fetch("https://api.google.com/gemini/text", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
        body: JSON.stringify({ text: el.textContent })
      })
        .then(response => response.json())
        .then(data => { el.textContent = data.transformed_text; })
        .catch(console.error);
    }
  });
}

// Replace all images with memes generated from an API
function replaceImagesWithMemes() {
  const memeApiUrl = "https://meme-api.com/generate"; // Replace with your meme API's endpoint
  const images = document.querySelectorAll("img");

  images.forEach((img, index) => {
    fetch(memeApiUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.meme_url) {
          img.src = data.meme_url;
          img.alt = `Meme ${index + 1}`;
        }
      })
      .catch(console.error);
  });
}

// Apply Caveat font
function applyFont() {
  const link = document.createElement("link");
  link.href = "https://fonts.googleapis.com/css2?family=Caveat&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
  document.body.style.fontFamily = "'Caveat', cursive";

}


function displayRandomMeme() {
  const memeApiUrl = "https://meme-api.com/generate"; // Replace with your meme API's endpoint

  // Fetch a random meme from the API
  fetch(memeApiUrl)
    .then(response => response.json())
    .then(data => {
      // Assuming the API returns a meme URL in a field like `data.meme_url`
      if (data && data.meme_url) {
        const memeUrl = data.meme_url;

        // Create an image element to display the meme
        const memeImage = document.createElement("img");
        memeImage.src = memeUrl;
        memeImage.alt = "Random Meme";
        memeImage.style.position = "absolute";
        memeImage.style.zIndex = "9999";
        memeImage.style.maxWidth = "300px";  // Limit the size of the meme
        memeImage.style.borderRadius = "10px";

        // Set a random position for the meme on the screen
        memeImage.style.top = `${Math.random() * window.innerHeight}px`;
        memeImage.style.left = `${Math.random() * window.innerWidth}px`;

        // Append the meme image to the body of the page
        document.body.appendChild(memeImage);
      }
    })
    .catch(console.error);
}

// Function to repeatedly display memes at random intervals
function showMemesRandomly() {
  const memeInterval = 5000; // Display a meme every 5 seconds (you can adjust this)

  setInterval(() => {
    displayRandomMeme();
  }, memeInterval);
}


// Make the page spin and trigger meme replacement on each rotation
function spinPageAndReplaceMemes() {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      50% { transform: rotate(180deg); }
      100% { transform: rotate(360deg); }
    }
    body {
      animation: spin 10s linear infinite;
      transform-origin: center;
    }
  `;
  document.head.appendChild(style);

  let lastRotation = 0;

  setInterval(() => {
    const rotation = parseFloat(getComputedStyle(document.body).transform.match(/matrix.*\((.+)\)/)?.[1]?.split(',')[0] || 0);

    if (rotation !== lastRotation && Math.abs(rotation) < 0.001) {
      lastRotation = rotation;
      replaceImagesWithMemes();
    }
  }, 100);
}

// Make elements shake
function shakeElements() {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
    }
    .shake {
      animation: shake 0.5s infinite;
    }
  `;
  document.head.appendChild(style);

  const elements = document.querySelectorAll("*:not(script):not(style):not(meta):not(title)");
  elements.forEach(el => {
    if (Math.random() < 0.1) {
      el.classList.add("shake");
    }
  });
}

// Make buttons move dynamically
function moveButtons() {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes move {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(10px, 0); }
      50% { transform: translate(0, 10px); }
      75% { transform: translate(-10px, 0); }
    }
    button {
      animation: move 2s infinite;
    }
  `;
  document.head.appendChild(style);
}

// Function to make the background color flicker
function backgroundColorFlicker() {
  const colors = ["#ff5733", "#33ff57", "#3357ff", "#f0f0f0", "#ff33a1", "#a1ff33", "#a1a1ff"];
  const flickerInterval = 100; // Interval in milliseconds
  
  setInterval(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
  }, flickerInterval);
}


// Autofill input fields with random Skibidi phrases
function autofillInputs() {
  const skibidiPhrases = [
    "Skibidi bop bop!",
    "Doo doo doo Skibidi!",
    "Bop bop bop bop Skibidi!",
    "Skibidi dop dop yes yes!",
    "Dop dop bop bop bop!"
  ];

  const inputs = document.querySelectorAll("input[type='text'], textarea");

  inputs.forEach(input => {
    input.addEventListener("focus", () => {
      const randomPhrase = skibidiPhrases[Math.floor(Math.random() * skibidiPhrases.length)];
      input.value = randomPhrase;
    });
  });
}

// Forced fast scroll effect
function forceFastScroll() {
  let scrollDirection = 1; // 1 for down, -1 for up
  const scrollSpeed = 50; // Pixels per interval
  const scrollInterval = 50; // Interval in milliseconds

  setInterval(() => {
    window.scrollBy(0, scrollSpeed * scrollDirection);

    // Reverse direction when reaching the top or bottom
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      scrollDirection = -1; // Scroll up
    } else if (window.scrollY <= 0) {
      scrollDirection = 1; // Scroll down
    }
  }, scrollInterval);
}

// Initialize features
chrome.storage.sync.get("apiKey", ({ apiKey }) => {
  transformText(apiKey);
  replaceImagesWithMemes();
  applyFont();
  spinPageAndReplaceMemes();
  shakeElements();
  moveButtons();
  autofillInputs();
  forceFastScroll();
  addSaveButton(); // Add save button for editable memes
  backgroundColorFlicker(); // Add background color flicker effect
});


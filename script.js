//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadImages() {
  loading.style.display = "block";
  errorDiv.innerHTML = "";
  output.innerHTML = "";

  const promises = images.map((image) => downloadImage(image.url));

  Promise.all(promises)
    .then((downloadedImages) => {
      loading.style.display = "none";
      downloadedImages.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      loading.style.display = "none";
      errorDiv.innerHTML = err;
    });
}

btn.addEventListener("click", downloadImages);
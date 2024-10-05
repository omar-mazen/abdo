document.querySelectorAll(".image-gallery").forEach((viewer) => {
  const images = JSON.parse(viewer.getAttribute("data-images"));
  let currentIndex = 0;

  const largeImage = viewer.querySelector(".large-image");
  const thumbnailsContainer = viewer.querySelector(".thumbnails");
  const prevBtn = viewer.querySelector(".prevBtn");
  const nextBtn = viewer.querySelector(".nextBtn");

  // Function to update the large image and active thumbnail
  function updateLargeImage(index) {
    largeImage.src = images[index];
    const thumbnails = thumbnailsContainer.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumbnail, idx) => {
      thumbnail.classList.remove("active"); // Remove active class from all
      if (idx === index) {
        thumbnail.classList.add("active"); // Add active class to current
        thumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        }); // Adjust scrolling behavior
      }
    });
  }

  // Function to create thumbnail images
  function createThumbnails() {
    images.forEach((image, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = image;
      imgElement.classList.add("thumbnail");
      imgElement.onclick = () => {
        currentIndex = index;
        updateLargeImage(currentIndex);
      };
      thumbnailsContainer.appendChild(imgElement);
    });
  }

  // Function to show next image
  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLargeImage(currentIndex);
  }

  // Function to show previous image
  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLargeImage(currentIndex);
  }

  // Set up event listeners
  nextBtn.onclick = showNextImage;
  prevBtn.onclick = showPrevImage;

  // Initialize thumbnails and set the first large image
  createThumbnails();
  updateLargeImage(currentIndex);
});

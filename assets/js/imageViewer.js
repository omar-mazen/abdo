const imgsToView = document.querySelectorAll("img.view");
imgsToView.forEach((img) => {
  img.addEventListener("click", (e) => {
    document.body.style.overflowY = "hidden";
    const clickedImage = e.target.cloneNode();
    clickedImage.classList.remove("view");

    document.body.insertAdjacentHTML(
      "beforeend",
      `
            <div class="image-viewer">
                <div class="icons">
                    <span class="zoom-in"><img src="./assets/icons/zoomIn.svg" /></span>
                    <span class="zoom-out disabled"><img src="./assets/icons/zoomOut.svg" /></span>
                    <span class="close"><img src="./assets/icons/xicon.svg" /></span>
                </div>
                <div class="image-wrapper">
                </div>
            </div>
            `
    );
    const imageWrapper = document.querySelector(".image-viewer .image-wrapper");
    imageWrapper.appendChild(clickedImage);

    const imageViewer = document.querySelector(".image-viewer");
    const zoomInIcon = document.querySelector(".image-viewer .zoom-in");
    const zoomOutIcon = document.querySelector(".image-viewer .zoom-out");
    const closeIcon = document.querySelector(".image-viewer .close");
    const image = document.querySelector(".image-viewer .image-wrapper img");
    const minScale = 1,
      maxScale = 5;
    let scale = 1;

    const handleZoomIn = () => {
      scale += 0.5;
      scale = scale = Math.min(Math.max(minScale, scale), maxScale);
      console.log(scale);
      if (scale == minScale) {
        zoomOutIcon.classList.add("disabled");
        zoomInIcon.classList.remove("disabled");
      }
      if (scale > minScale && scale < maxScale) {
        zoomInIcon.classList.remove("disabled");
        zoomOutIcon.classList.remove("disabled");
      }
      if (scale == maxScale) {
        zoomInIcon.classList.add("disabled");
        zoomOutIcon.classList.remove("disabled");
      }
      image.style.transform = `scale(${scale})`;
    };

    const handleZoomOut = () => {
      scale -= 0.5;
      scale = scale = Math.min(Math.max(minScale, scale), maxScale);
      console.log(scale);
      if (scale == minScale) {
        zoomOutIcon.classList.add("disabled");
        zoomInIcon.classList.remove("disabled");
      }
      if (scale > minScale && scale < maxScale) {
        zoomInIcon.classList.remove("disabled");
        zoomOutIcon.classList.remove("disabled");
      }
      if (scale == maxScale) {
        zoomInIcon.classList.add("disabled");
        zoomOutIcon.classList.remove("disabled");
      }
      image.style.transform = `scale(${scale})`;
    };

    const handelWheel = (e) => {
      image.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;

      scale += e.deltaY * -0.01;
      scale = Math.min(Math.max(minScale, scale), maxScale);

      if (scale == minScale) {
        zoomOutIcon.classList.add("disabled");
        zoomInIcon.classList.remove("disabled");
      }
      if (scale > minScale && scale < maxScale) {
        zoomInIcon.classList.remove("disabled");
        zoomOutIcon.classList.remove("disabled");
      }
      if (scale == maxScale) {
        zoomInIcon.classList.add("disabled");
        zoomOutIcon.classList.remove("disabled");
      }
      if (scale == 1) {
        image.style.left = "0px";
        image.style.top = "0px";
      }

      image.style.transform = `scale(${scale})`;
    };

    zoomInIcon.addEventListener("click", handleZoomIn);
    zoomOutIcon.addEventListener("click", handleZoomOut);

    image.addEventListener("wheel", handelWheel);

    image.addEventListener("mouseup", () => (image.style.cursor = "auto"));

    image.addEventListener("dblclick", () => {
      image.style.transform = "scale(1)";
    });

    let clicked = false;

    image.addEventListener("mousedown", (e) => {
      e.preventDefault();
      clicked = true;
      xAxis = e.offsetX - image.offsetLeft;
      yAxis = e.offsetY - image.offsetTop;

      image.style.cursor = "grabbing";
    });

    window.addEventListener("mouseup", () => (clicked = false));

    image.addEventListener("mousemove", (e) => {
      if (!clicked) return;
      e.preventDefault();

      x = e.offsetX;
      y = e.offsetY;

      image.style.left = `${x - xAxis}px`;
      image.style.top = `${y - yAxis}px`;

      checkSize();
    });

    closeIcon.addEventListener("click", () => {
      if (imageViewer) {
        document.body.removeChild(imageViewer);
        document.body.style.overflowY = "auto";
      }
    });
  });
});
function checkSize() {
  let containerOut = image.getBoundingClientRect();
  let imgIn = image.getBoundingClientRect();

  if (parseInt(image.style.left) > 0) {
    image.style.left = "0px";
  } else if (imgIn.right < containerOut.right) {
    image.style.left = `-${imgIn.width - containerOut.width}px`;
  }
  if (parseInt(image.style.top) > 0) {
    image.style.top = "0px";
  } else if (imgIn.bottom < containerOut.bottom) {
    image.style.top = `-${imgIn.height - containerOut.height}px`;
  }
}

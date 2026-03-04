const images = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

let scale = 1;
let isZoomed = false;

images.forEach(image => {
    image.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = image.src;
        resetZoom();
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Click to zoom into specific point
lightboxImg.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!isZoomed) {
        scale = 3;

        // Set transform origin to click position (percentage)
        const rect = lightboxImg.getBoundingClientRect();
        const originX = ((e.clientX - rect.left) / rect.width) * 100;
        const originY = ((e.clientY - rect.top) / rect.height) * 100;

        lightboxImg.style.transformOrigin = `${originX}% ${originY}%`;
        lightboxImg.style.cursor = "zoom-out";
        isZoomed = true;
    } else {
        resetZoom();
    }

    lightboxImg.style.transform = `scale(${scale})`;
});

function resetZoom() {
    scale = 1;
    isZoomed = false;

    lightboxImg.style.transform = "scale(1)";
    lightboxImg.style.transformOrigin = "center center";
    lightboxImg.style.cursor = "zoom-in";
}
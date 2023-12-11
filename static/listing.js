
let slide_index = 1;
showSlides(slide_index);

// Next/previous controls
function plusSlides(n) {
    showSlides(slide_index += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slide_index = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("image-slides");
    if (n > slides.length) {
        slide_index = 1
    }
    if (n < 1) {
        slide_index = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slide_index - 1].style.display = "block";
}




document.addEventListener("DOMContentLoaded", () => {
    var images = ['artwork_1.png', 'artwork_2.png', 'artwork_3.png', 'artwork_4.png', 'artwork_5.png', 'artwork_6.png'];
    var imgSrc = '../public/assets/art/' + images[Math.floor(Math.random() * images.length)]
    $('#artwork1').attr('src', imgSrc)
});
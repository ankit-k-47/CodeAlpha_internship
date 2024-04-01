
    let menuIcon = document.querySelector("#menu-icon");
    let navbar = document.querySelector(".navbar");
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("header nav a");
 console.log(menuIcon);
    window.onscroll = () => {
        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute("id");
            if (top >= offset && top < offset + height) {
                navLinks.forEach(link => link.classList.remove("active"));
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            }
        });
    };
    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navbar.classList.toggle("active");
        console.log(navbar.classList);
    }
const aboutSection = document.querySelector('.about');
const aboutContent = document.querySelector('.about-content p');
const serSection = document.querySelector('.services-container');
const serBoxes = document.querySelectorAll('.service-info');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target === aboutContent) {
                aboutContent.classList.add('animation');
            } else if (entry.target.classList.contains('service-info')) {
                entry.target.classList.add('animation');
            }
        } 
    });
}, { rootMargin: '10%' });

observer.observe(aboutSection);
observer.observe(aboutContent);
serBoxes.forEach(box => {
    observer.observe(box);
}); 
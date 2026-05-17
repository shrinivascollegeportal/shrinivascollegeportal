let slides = document.querySelectorAll('.slide');
let index = 0;

function nextSlide() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

setInterval(nextSlide, 3000)
function login() {
  let u = document.getElementById("user").value;
  let p = document.getElementById("pass").value;

  if(u === "12345" && p === "admin") {
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong ID or Password");
  }
}
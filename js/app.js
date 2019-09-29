let acc = document.getElementsByClassName("accordion-trigger");

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    let panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//MODAL CONTROL

//LOGIN MODAL
// Get the modal
var loginModal = document.getElementById("login-modal");

// Get the button that opens the modal
var btn = document.getElementById("login-modal-trigger");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  loginModal.style.display = "flex";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  loginModal.style.display = "none";
};

//REGISTER MODAL
var registerModal = document.getElementById("register-modal");

// Get the button that opens the modal
var btn = document.getElementById("register-modal-trigger");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  registerModal.style.display = "flex";
};

//CLOSE ALL MODALS

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  registerModal.style.display = "none";
};


document.getElementById("login-signup-revert").addEventListener("click", e =>
{
	loginModal.style.display = "none";
	registerModal.style.display = "flex";
});
document.getElementById("signup-login-revert").addEventListener("click", e =>
{
	loginModal.style.display = "flex";
	registerModal.style.display = "none";
});


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
};
document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.key == "Escape") {
    loginModal.click();
    registerModal.click();
  }
};

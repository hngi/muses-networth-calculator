// let lineChartCanvas = document.getElementById("line-chart");
// // console.log();
// lineChartCanvas.height =
//   document.querySelector(".line-chart").offsetHeight - 40;
// lineChartCanvas.width = document.querySelector(".line-chart").offsetWidth - 40;

// let ctx = lineChartCanvas.getContext("2d");
// let chart = new Chart(ctx, {
//   // The type of chart we want to create
//   type: "line",

//   // The data for our dataset
//   data: {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//       {
//         label: "Spending",
//         backgroundColor: "rgb(255, 99, 132)",
//         borderColor: "rgb(255, 99, 132)",
//         data: [0, 10, 5, 2, 20, 30, 95]
//       }
//     ]
//   },

//   // Configuration options go here
//   options: {
//     maintainAspectRatio: true,
//     responsive: true
//   }
// });

//ACCORDION CONTROL
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
// Get the modal
var modal = document.getElementById("login-modal");

// Get the button that opens the modal
var btn = document.getElementById("login-modal-trigger");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

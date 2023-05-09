//input color
const paint_color = document.getElementById("paint-color");
//input radio
const paint_custom = document.getElementById("paint-custom");
//input radio
const paint_random = document.getElementById("paint-random");
//input radio
const paint_erase = document.getElementById("paint-erase");
/* ********************** */

//input color
const grid_color = document.getElementById("grid-color");
//input checkbox
const grid_show = document.getElementById("grid-show");
//input color
const canvas_color = document.getElementById("canvas-color");
//btn 
const clearbtn = document.getElementById("clear");
//input range
const canvas_size = document.getElementById("canvas-size");
//div
const range = document.getElementById("range");
//div game container
const canvas = document.getElementById("canvas");
/* ********************** */

//node list of the elements created
let squares;
/* ********************** */

//creation of the grid elements
function createGrid(num) {
    canvas.innerHTML = "";
    canvas.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${num}, 1fr)`;


    for (let i = 0; i < num * num; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        canvas.appendChild(square);

    }
    squares = document.querySelectorAll(".square");
};
/* ********************** */

/*Grid Color and Canvas Color*/
function updateGridStyle() {
    if (grid_show.checked) {
        squares.forEach(square => {
            square.style.border = "1px solid " + grid_color.value;
        })
    } else {
        squares.forEach(square => {
            square.style.border = "none";
        })
    }
}

grid_show.addEventListener("change", updateGridStyle);
grid_color.addEventListener("change", updateGridStyle);

function canvaColor() {
    squares.forEach(square => {
        square.style.backgroundColor = canvas_color.value;
    })
}

canvas_color.addEventListener("change", canvaColor);
/* **************** */


/* create the grid based in the input range value */
canvas_size.addEventListener("input", function () {
    createGrid(this.value);
    canvaColor();
    range.textContent = `${canvas_size.value} x ${canvas_size.value}`;
    updateGridStyle();
});
/* ************************* */


/* when page is loaded, create a grid */

window.addEventListener("load", function () {
    createGrid(canvas_size.value);
    canvaColor();
    range.textContent = `${canvas_size.value} x ${canvas_size.value}`;
    updateGridStyle();
});

/* ********************** */

/*function to know wether the input range to paint with the custom color is checked*/
paint_custom.addEventListener("change", function () {
    if (this.checked) {

        function paint(event) {
            const square = event.target;
            square.style.backgroundColor = paint_color.value;
        };

        canvas.addEventListener("mousedown", function () {
            canvas.addEventListener("mousemove", paint);
        });

        canvas.addEventListener("mouseup", function () {
            canvas.removeEventListener("mousemove", paint);
        });

        // mobile

        canvas.addEventListener("touchstart", function (event) {
            event.preventDefault(); // Prevent scrolling
            canvas.addEventListener("touchmove", paint);
        });

        canvas.addEventListener("touchend", function () {
            canvas.removeEventListener("touchmove", paint);
        });

    } else {
        return;
    };
});
/* ********************** */

/*function to know wether the input range to paint with the background color (erase) is checked*/
paint_erase.addEventListener("change", function () {
    if (this.checked) {

        function erase(event) {
            const square = event.target;
            square.style.backgroundColor = canvas_color.value;
        }

        canvas.addEventListener("mousedown", function () {
            canvas.addEventListener("mousemove", erase);
        });

        canvas.addEventListener("mouseup", function () {
            canvas.removeEventListener("mousemove", erase);
        });

        // mobile

        canvas.addEventListener("touchstart", function (event) {
            event.preventDefault(); // Prevent scrolling
            canvas.addEventListener("touchmove", erase);
        });

        canvas.addEventListener("touchend", function () {
            canvas.removeEventListener("touchmove", erase);
        });
    } else {
        return;
    };
});
/* ********************** */

/*function to know wether the input range to paint with random color is checked*/
paint_random.addEventListener("change", function () {
    if (this.checked) {

        function randomColor(event) {
            const square = event.target;

            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`

            square.style.backgroundColor = color;
        }

        canvas.addEventListener("mousedown", function () {
            canvas.addEventListener("mousemove", randomColor);
        });

        canvas.addEventListener("mouseup", function () {
            canvas.removeEventListener("mousemove", randomColor);
        });

        // mobile

        canvas.addEventListener("touchstart", function (event) {
            event.preventDefault(); // Prevent scrolling
            canvas.addEventListener("touchmove", randomColor);
        });

        canvas.addEventListener("touchend", function () {
            canvas.removeEventListener("touchmove", randomColor);
        });
    } else {
        return;
    };
});
/* ********************** */

/*clear button*/
clearbtn.addEventListener("click", function () {
    createGrid(canvas_size.value);
    canvaColor();
    updateGridStyle();
})
/* ********************** */





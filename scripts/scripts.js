const base_size = 16;
const container = document.querySelector("#container");
const sizeInput = document.querySelector("#numberInput")
const root = document.querySelector(":root");
const size1 = document.querySelector(".size1");
const size2 = document.querySelector(".size2");
const eraser = document.querySelector(".eraser");
const clear = document.querySelector(".clear");
const color = document.querySelector("#color-picker");

current_color = "#000000";
let mouseDown = false;
let eraser_val = false;

console.log(root);



function set_grid(size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let div = document.createElement("div");
            div.classList.add("container_item");
            div.addEventListener("mouseover", changeColor);
            div.addEventListener("mousedown", () => {
                mouseDown = true;
                changeColor(e);
            });
            div.addEventListener("mouseup", () => {
                mouseDown = false;
            });
            container.appendChild(div);
        }
    } 
}

function set_grid_item(size) {
    let new_width = 500.0 / size;
    let new_height = 500.0 / size;

    root.style.setProperty("--item-width", `${new_width}px`);
    root.style.setProperty("--item-height", `${new_height}px`);
    
}

function changeColor(e) {
    if (e.type == "mouseover" && !mouseDown) {
        return;
    }
    if (!eraser_val) {
        e.target.style.backgroundColor = current_color;
    }
    else {
        e.target.style.backgroundColor = "#fefefe";
    }
}

function reset_grid(size_value) {
    container.replaceChildren();
    set_grid(size_value);
}

color.addEventListener("input", (e) => {
    current_color = e.target.value;
});

sizeInput.addEventListener("input", () => {
    let size_value = sizeInput.value;
    size1.textContent = size_value;
    size2.textContent = size_value;
    set_grid_item(size_value);
    reset_grid(size_value);
});

eraser.addEventListener("mousedown", () => {
    eraser.classList.toggle("black");
    if (eraser_val) {
        eraser_val = false;
    }
    else {
        eraser_val = true;
    }
});

clear.addEventListener("mousedown", () => {
    reset_grid(sizeInput.value);
});




set_grid(base_size);

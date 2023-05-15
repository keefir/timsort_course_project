let boxes = document.getElementsByClassName("array_element");
let backend_stack = [];
let frontend_stack = document.getElementById("stack");
function reset() {
    backend_stack = [];
    while (frontend_stack.firstChild) {
        frontend_stack.removeChild(frontend_stack.firstChild);
    }
    document.getElementById("sort_button").disabled = false;
    for (let i = 0; i < boxes.length; ++i) {
        /*
            formula for size: random * (upper - lower + 1) + lower
         */
        boxes[i].style.height = String(Math.random() * (25 - 5 + 1) + 5) + "vh";
        boxes[i].style.background = "gray";
    }
}
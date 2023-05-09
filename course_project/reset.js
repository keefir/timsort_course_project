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
        boxes[i].style.height = String(Math.random() * (250 - 30 + 1) + 30) + "px";
        boxes[i].style.background = "gray";
    }
}
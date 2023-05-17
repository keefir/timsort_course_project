let boxes = document.getElementsByClassName("array_element");
let backend_stack = [];
let frontend_stack = document.getElementById("stack");
let merge_window1 = document.getElementById("merge_subwindow1");
let merge_window2 = document.getElementById("merge_subwindow2");
let state_window = document.getElementById("state_text");
function reset() {
    backend_stack = [];
    while (frontend_stack.firstChild) {
        frontend_stack.removeChild(frontend_stack.firstChild);
    }
    while (merge_window1.firstChild) {
        merge_window1.removeChild(merge_window1.firstChild);
    }
    while (merge_window2.firstChild) {
        merge_window2.removeChild(merge_window2.firstChild);
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
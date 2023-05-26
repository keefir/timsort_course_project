let boxes = document.getElementsByClassName("array_element");
let backend_stack = [];
let frontend_stack = document.getElementById("stack");
let merge_window1 = document.getElementById("merge_subwindow1");
let merge_window2 = document.getElementById("merge_subwindow2");
let merge_val1 = document.getElementById("merge_value_window1");
let merge_val2 = document.getElementById("merge_value_window2");
let state_window = document.getElementById("state_text");
let min_gal = 3;
const GLOBAL_CONST = 2000;
const MERGE_CONST = 2000;
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

    // for (let i = 0; i < 8; ++i) {
    //     boxes[i].style.height = String(i + 15) + "vh";
    //     boxes[i].style.background = "gray";
    // }
    // for (let i = 8; i < 16; ++i) {
    //     boxes[i].style.height = String(i / 5) + "vh";
    //     boxes[i].style.background = "gray";
    // }
    // for (let i = 16; i < 32; ++i) {
    //     boxes[i].style.height = String(i / 3) + "vh";
    //     boxes[i].style.background = "gray";
    // }

    state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state:</b>';
}
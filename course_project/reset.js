let boxes = document.getElementsByClassName("array_element");
function reset() {
    for (let i = 0; i < boxes.length; ++i) {
        boxes[i].style.height = String(Math.random() * (160 - 30 + 1) + 30) + "px";
    }
}

reset();

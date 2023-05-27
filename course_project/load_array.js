function load_array(nelems, container, type) {
    if (type === '') {
        alert("Choose array type.");
        return;
    } else if (isNaN(nelems)) {
        alert("Enter array length.");
        return;
    } else if (!Number.isInteger(nelems)) {
        alert("Length must be integer.");
        return;
    } else if (nelems < 16 || nelems > 512) {
        alert("Length must be in range [16, 512].")
        return;
    }
    if (type === 'Random') {
        for (let i = 0; i < nelems; ++i) {
            let div = container.appendChild(document.createElement("div"));
            div.className = "array_element";
            div.id = i;
            div.setAttribute("style", `width:${1900 / nelems}px`);
        }
        document.getElementById("sort_button").disabled = false;
        for (let i = 0; i < boxes.length; ++i) {
            /*
                formula for size: random * (upper - lower + 1) + lower
             */
            boxes[i].style.height = String(Math.random() * (25 - 5 + 1) + 5) + "vh";
            boxes[i].style.background = "gray";
        }
        document.getElementById('array_choosing_area').style.display = "none";
        document.getElementById('setting_area').style.display = "block";
        document.getElementById('array_description').innerHTML = "<b>Choose minrun, speed and misc.:</b>"
    } else {
        alert("Presorted type will be implemented soon!");
    }
}

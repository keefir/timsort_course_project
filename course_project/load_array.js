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
        alert("Length must be in range [16, 512].");
        return;
    }
    for (let i = 0; i < nelems; ++i) {
        let div = container.appendChild(document.createElement("div"));
        div.className = "array_element";
        div.id = i;
        div.setAttribute("style", `width:${1900 / nelems}px`);
    }
    let lengths = [];
    for (let i = 0; i < nelems; ++i) {
        lengths.push(Math.random() * (25 - 5 + 1) + 5);
    }
    if (type === 'Random') {

        for (let i = 0; i < nelems; ++i) {
            /*
                formula for size: random * (upper - lower + 1) + lower
             */
            boxes[i].style.height = String(lengths[i]) + "vh";
            boxes[i].style.background = "gray";
        }

    } else {

        let upper_bound = Math.ceil(nelems / 20);
        let lower_bound = Math.ceil(nelems / 100);
        let subarrays_number = Math.ceil(Math.random() * (upper_bound - lower_bound + 1) + lower_bound);
        let indexes = [0];

        for (let i = 0; i < subarrays_number; ++i) {
            indexes.push(Math.ceil(Math.random() * (nelems - 0 + 1) + 0));
        }

        indexes = indexes.sort((a, b) => a - b);

        for (let i = 1; i < indexes.length; ++i) {
            lengths = lengths.slice(0, indexes[i - 1]).concat(lengths.slice(indexes[i - 1], indexes[i]).sort((a, b) => a - b).concat(lengths.slice(indexes[i], lengths.length)));
        }

        lengths = lengths.slice(0, indexes[indexes.length - 1]).concat(lengths.slice(indexes[indexes.length - 1], lengths.length).sort((a, b) => a - b));

        for (let i = 0; i < nelems; ++i) {
            boxes[i].style.height = String(lengths[i]) + "vh";
            boxes[i].style.background = "gray";
        }



    }

    document.getElementById("sort_button").disabled = false;
    document.getElementById('array_choosing_area').style.display = "none";
    document.getElementById('setting_area').style.display = "block";
    document.getElementById('array_description').innerHTML = "<b>Choose minrun, speed and misc.:</b>";
}

async function merge_subarrays(first_arr, second_arr, speed) {
    // backend_stack: {start_index, size}
    /*
        filling frontend zone
    */
    // console.log(first_arr, second_arr);
    let container1 = document.getElementById('merge_subwindow1');
    let container2 = document.getElementById('merge_subwindow2');
    let backend_container1 = [];
    let backend_container2 = [];
    for (let i = 0; i < first_arr[1]; ++i) {
        let div = container1.appendChild(document.createElement("div"));
        div.className = "subarray_element";
        div.id = `subarr_1_${i}`;
        div.style.height = boxes[first_arr[0] + i].style.height;
        div.setAttribute("style",`height:${boxes[first_arr[0] + i].style.height}; width:${boxes[first_arr[0] + i].style.width}`);
        backend_container1.push(div.style.height);
    }
    for (let i = 0; i < second_arr[1]; ++i) {
        let div = container2.appendChild(document.createElement("div"));
        div.className = "subarray_element";
        div.id = `subarr_2_${i}`;
        div.style.height = boxes[second_arr[0] + i].style.height;
        div.setAttribute("style", `height:${boxes[second_arr[0] + i].style.height}; width:${boxes[first_arr[0] + i].style.width}`);
        backend_container2.push(div.style.height);
    }
    /*
        merge sort as it is; filling main window
    */
    let ptr1 = 0;
    let ptr2 = 0;
    let cntr = 0;
    console.log(backend_container1.length, container1.children.length, first_arr[1]);
    console.log(backend_container2.length, container2.children.length, second_arr[1]);
    while (ptr1 < first_arr[1] && ptr2 < second_arr[1]) {
        if (parseFloat(backend_container1[ptr1]) <= parseFloat(backend_container2[ptr2])) {
            // console.log(first_arr[0], cntr);
            boxes[first_arr[0] + cntr].style.height = backend_container1[ptr1];
            container1.removeChild(container1.firstChild);
            ++ptr1;
        } else {
            // console.log(first_arr[0], cntr);
            boxes[first_arr[0] + cntr].style.height = backend_container2[ptr2];
            container2.removeChild(container2.firstChild);
            ++ptr2;

        }
        await new Promise(r => setTimeout(r, 400 / speed));
        ++cntr;
    }
    console.log('part ended');
    if (backend_container1.length > 0) {
        for (let i = ptr1; i < first_arr[1]; ++i) {
            // console.log(first_arr[0] + cntr, parseFloat(backend_container1[i]));
            boxes[first_arr[0] + cntr].style.height = backend_container1[i];
            container1.removeChild(container1.firstChild);
            await new Promise(r => setTimeout(r, 400 / speed));
            ++cntr;
        }
    }
    if (backend_container2.length > 0) {
        for (let j = ptr2; j < second_arr[1]; ++j) {
            // console.log(first_arr[0] + cntr, parseFloat(backend_container2[i]));
            boxes[first_arr[0] + cntr].style.height = backend_container2[j];
            container2.removeChild(container2.firstChild);
            await new Promise(r => setTimeout(r, 400 / speed));
            ++cntr;
        }
    }
}
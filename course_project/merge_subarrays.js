function merge_subarrays(first_arr, second_arr) {
    /*
        backend_stack: {start_index, size}
    */
    console.log(first_arr, second_arr);
    let container1 = document.getElementById('merge_subwindow1');
    let container2 = document.getElementById('merge_subwindow2');
    for (let i = 0; i < first_arr[1]; ++i) {
        let div = container1.appendChild(document.createElement("div"));
        div.className = "subarray_element";
        div.id = `subarr_1_${i}`;
        // console.log(boxes[first_arr[0] + i].style.height);
        div.style.height = boxes[first_arr[0] + i].style.height;
        // div.setAttribute("style",``);
        div.setAttribute("style",`height:${boxes[first_arr[0] + i].style.height}; width:${1900 / first_arr[1]}px`);
    }
    for (let i = 0; i < second_arr[1]; ++i) {
        let div = container2.appendChild(document.createElement("div"));
        div.className = "subarray_element";
        div.id = `subarr_2_${i}`;
        // console.log(boxes[second_arr[0] + i].style.height);
        div.style.height = boxes[second_arr[0] + i].style.height;
        // div.setAttribute("style",`width:${1900 / second_arr[1]}px`);
        div.setAttribute("style", `height:${boxes[second_arr[0] + i].style.height}; width:${1900 / second_arr[1]}px`);
    }
}
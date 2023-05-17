async function insertion_sort(arr, arr_begin, arr_end, speed, vis_ins) {
    state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: sorting subarray</b>';
    for (let i = arr_begin; i < arr_end; ++i) {
        for (let j = i; j > arr_begin; --j) {
            arr[j].style.background = "orange";
            arr[j-1].style.background = "blue";
            if (vis_ins) {
                await new Promise(r => setTimeout(r, 0));
            }
            if (parseFloat(arr[j].style.height) < parseFloat(arr[j-1].style.height)) {
                let temp = arr[j].style.height;
                arr[j].style.height = arr[j-1].style.height;
                arr[j-1].style.height = temp;
                arr[j].style.background = "blue";
                arr[j-1].style.background = "orange";
                if (vis_ins) {
                    await new Promise(r => setTimeout(r, 0));
                }
            } else {
                arr[j].style.background = "green";
                arr[j-1].style.background = "green";
                break;
            }
            arr[j].style.background = "green";
            arr[j-1].style.background = "green";
        }
    }
}

function reverse_runs(arr) {
    let ascending = -1;
    let start_index = 0;
    for (let i = 0; i < arr.length - 1; ++i) {
        if (ascending === -1) {
            if (parseFloat(arr[i].style.height) > parseFloat(arr[i + 1].style.height)) {
                ascending = 0;
                start_index = i;
            } else {
                ascending = 1;
            }
            continue;
        }
        if (parseFloat(arr[i].style.height) <= parseFloat(arr[i + 1].style.height)) {
            if (ascending === 1) {
            } else {
                ascending = -1;
                reverse_subarray(arr, start_index, i + 1);
            }
        } else {
            if (ascending === 0) {
            } else {
                ascending = -1;
            }
        }
    }
}
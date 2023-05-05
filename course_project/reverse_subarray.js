async function reverse_subarray(arr, arr_begin, arr_end) {
    // console.log(`here : ${arr_begin}, ${arr_end}`);
    let subarr_len = arr_end - arr_begin;
    let cnt = 0;
    for (let i = arr_begin; i < arr_begin + (subarr_len - subarr_len % 2) / 2; ++i) {
        let t = arr[i].style.height;
        arr[i].style.height = arr[arr_end - 1 - cnt].style.height;
        arr[i].style.background = "green";
        arr[arr_end - 1 - cnt].style.height = t;
        arr[arr_end - 1 - cnt].style.background = "green";
        ++cnt;
    }
}
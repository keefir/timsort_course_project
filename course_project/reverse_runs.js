async function reverse_runs(arr, minrun, speed) {
    if (isNaN(minrun)) {
        alert(`${minrun} is not a valid number.`)
        return;
    } else if (Number(minrun) <= 0 || Number(minrun) > 128) {
        alert("Minrun must be in range (0, 128].");
        return;
    }
    if (isNaN(speed)) {
        alert(`${speed} is not a valid number.`);
        return;
    } else if (Number(speed) <= 0) {
        alert("Cannot set zero speed.");
        return;
    }
    // console.log(frontend_stack);
    minrun = Number(minrun);
    speed = Number(speed);
    document.getElementById("sort_button").disabled = true;
    document.getElementById("refresh_button").disabled = true;
    let ascending = -1;
    let start_index = 0;
    let run = 0;
    for (let i = 0; i < arr.length - 1; ++i) {
        console.log(i, arr.length-1);
        await new Promise(r => setTimeout(r, 2000 / speed));
        if (ascending === -1) {
            if (parseFloat(arr[i].style.height) > parseFloat(arr[i + 1].style.height)) {
                arr[i].style.background = "red";
                arr[i + 1].style.background = "red";
                ascending = 0;
            } else {
                arr[i].style.background = "lightgreen";
                arr[i + 1].style.background = "lightgreen";
                ascending = 1;
            }
            start_index = i;
            run = 2;
            continue;
        }
        if (parseFloat(arr[i].style.height) <= parseFloat(arr[i + 1].style.height)) {
            if (ascending === 1) {
                // here if we're at ascending subarray
                arr[i + 1].style.background = "lightgreen";
                ++run;
            } else {
                arr[i + 1].style.background = "black";
                await new Promise(r => setTimeout(r, 2000 / speed));
                ascending = -1;
                await reverse_subarray(arr, start_index, i + 1);
                if (run < minrun) {
                    i = Math.min(arr.length - 1, i + minrun - run);
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "yellow";
                    }
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    await insertion_sort(arr, start_index, i + 1, speed);
                } else {
                    // array.len > minrun
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "green";
                    }
                }
                let size = i - start_index + 1;
                stack_push(start_index, size);
                merge_stack_elements();
            }
        } else {
            if (ascending === 0) {
                // here if we're at decreasing subarray
                arr[i + 1].style.background = "red";
                ++run;
            } else {
                arr[i + 1].style.background = "black";
                await new Promise(r => setTimeout(r, 2000 / speed));
                ascending = -1;
                if (run < minrun) {
                    i = Math.min(arr.length - 1, i + minrun - run);
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "yellow";
                    }
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    await insertion_sort(arr, start_index, i + 1, speed);
                } else {
                    // array.len > minrun
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "green";
                    }
                }
                let size = i - start_index + 1;
                stack_push(start_index, size);
                merge_stack_elements();
            }
        }
    }
    console.log("hi");
    for (let j = start_index; j < arr.length; ++j) {
        arr[j].style.background = "green";
    }
    document.getElementById("refresh_button").disabled = false;
}
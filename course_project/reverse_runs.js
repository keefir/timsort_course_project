async function reverse_runs(arr, minrun, min_gal, speed, vis_ins) {

    minrun = Number(minrun);
    min_gal = Number(min_gal);
    speed = Number(speed);

    if (isNaN(minrun)) {
        alert(`${minrun} is not a valid number.`)
        return;
    } else if (!Number.isInteger(minrun)) {
        alert("Minrun must be integer.");
        return;
    } else if (minrun <= 3 || minrun > Math.min(arr.length, 128)) {
        alert("Minrun must be in range [4, min(128, len(arr))].");
        return;
    }

    if (isNaN(speed)) {
        alert(`${speed} is not a valid number.`);
        return;
    } else if (speed <= 0) {
        alert("Cannot set zero speed.");
        return;
    }

    if (isNaN(min_gal)) {
        alert(`${min_gal} is not a valid number.`);
        return;
    } else if (!Number.isInteger(min_gal)) {
        alert("Mingal must be integer.");
    } else if (min_gal < 4 || min_gal > Math.min(arr.length, 64)) {
        alert("Mingal must be in range [4, min(64, len(arr))].");
        return;
    }

    document.getElementById("sort_button").disabled = true;
    document.getElementById("refresh_button").disabled = true;
    let ascending = -1;
    let start_index = 0;
    let run = 0;
    for (let i = 0; i < arr.length - 1; ++i) {
        state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: reversing runs</b>';

        await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
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
            if (i === arr.length - 2) {
                if (parseFloat(arr[i].style.height) > parseFloat(arr[i + 1].style.height)) {
                    await reverse_subarray(arr, start_index, i + 2);
                }
                await stack_push(start_index, 2, speed);
                await merge_stack_elements(min_gal, speed, 0);
            }
            continue;
        }

        if (parseFloat(arr[i].style.height) <= parseFloat(arr[i + 1].style.height)) {
            if (ascending === 1) {
                // here if we're at ascending subarray
                arr[i + 1].style.background = "lightgreen";
                ++run;
                if (i === arr.length - 2) {
                    await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
                    for (let j = start_index; j <= i + 1; ++j) {
                        arr[j].style.background = "green";
                    }
                    let size = i - start_index + 2;
                    await stack_push(start_index, size, speed);
                    await merge_stack_elements(min_gal, speed, 0);
                }
            } else {
                arr[i + 1].style.background = "black";
                await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
                ascending = -1;
                await reverse_subarray(arr, start_index, i + 1);
                let end = i;
                arr[i + 1].style.background = "gray";
                if (run < minrun) {
                    i = Math.min(arr.length - 1, i + minrun - run);
                    end = i;
                    if (i === arr.length - 2) {
                        ++end;
                    }
                    for (let j = start_index; j <= end; ++j) {
                        arr[j].style.background = "yellow";
                    }
                    await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
                    await insertion_sort(arr, start_index, end + 1, speed, vis_ins);
                } else {
                    // array.len > minrun
                    await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "green";
                    }
                }
                let size = end - start_index + 1;
                await stack_push(start_index, size, speed);
                await merge_stack_elements(min_gal, speed, 0);
            }
        } else {
            if (ascending === 0) {
                // here if we're at decreasing subarray
                arr[i + 1].style.background = "red";
                ++run;
                if (i === arr.length - 2) {
                    await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
                    await reverse_subarray(arr, start_index, i + 2);
                    for (let j = start_index; j <= i + 1; ++j) {
                        arr[j].style.background = "green";
                    }
                    let size = i - start_index + 2;
                    await stack_push(start_index, size, speed);
                    await merge_stack_elements(min_gal, speed, 0);
                }
            } else {
                arr[i + 1].style.background = "black";
                await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
                ascending = -1;
                let end = i;
                arr[i + 1].style.background = "gray";
                if (run < minrun) {
                    i = Math.min(arr.length - 1, i + minrun - run);
                    end = i;
                    if (i === arr.length - 2) {
                        ++end;
                    }
                    for (let j = start_index; j <= end; ++j) {
                        arr[j].style.background = "yellow";
                    }
                    await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
                    await insertion_sort(arr, start_index, end + 1, speed, vis_ins);
                } else {
                    // array.len > minrun
                    await new Promise(r => setTimeout(r, GLOBAL_CONST / speed));
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "green";
                    }
                }
                let size = end - start_index + 1;
                await stack_push(start_index, size, speed);
                await merge_stack_elements(min_gal, speed, 0);
            }
        }
    }
    await merge_stack_elements(min_gal, speed, 1);
    console.log("hi");
    for (let j = start_index; j < arr.length; ++j) {
        arr[j].style.background = "green";
    }
    document.getElementById("refresh_button").disabled = false;
    state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: finished</b>';
    merge_val1.innerHTML = ``;
    merge_val2.innerHTML = ``;
}
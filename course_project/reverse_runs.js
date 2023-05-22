async function reverse_runs(arr, minrun, speed, vis_ins) {
    if (isNaN(minrun)) {
        alert(`${minrun} is not a valid number.`)
        return;
    } else if (Number(minrun) <= 3 || Number(minrun) > 128) {
        alert("Minrun must be in range [4, 128].");
        return;
    } else if (!Number.isInteger(Number(minrun))) {
        alert("Minrun must be integer.");
        return;
    }
    if (isNaN(speed)) {
        alert(`${speed} is not a valid number.`);
        return;
    } else if (Number(speed) <= 0) {
        alert("Cannot set zero speed.");
        return;
    }
    minrun = Number(minrun);
    speed = Number(speed);
    document.getElementById("sort_button").disabled = true;
    document.getElementById("refresh_button").disabled = true;
    let ascending = -1;
    let start_index = 0;
    let run = 0;
    for (let i = 0; i < arr.length - 1; ++i) {
        state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: reversing runs</b>';
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
            if (i === arr.length - 2) {
                if (parseFloat(arr[i].style.height) > parseFloat(arr[i + 1].style.height)) {
                    await reverse_subarray(arr, start_index, i + 2);
                }
                await stack_push(start_index, 2, speed);
                await merge_stack_elements(speed, 0);
            }
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
                let end = i;
                if (run < minrun) {
                    i = Math.min(arr.length - 1, i + minrun - run);
                    end = i;
                    if (i === arr.length - 2) {
                        ++end;
                    }
                    for (let j = start_index; j <= end; ++j) {
                        arr[j].style.background = "yellow";
                    }
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    await insertion_sort(arr, start_index, end + 1, speed, vis_ins);
                } else {
                    // array.len > minrun
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "green";
                    }
                }
                let size = end - start_index + 1;
                await stack_push(start_index, size, speed);
                await merge_stack_elements(speed, 0);
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
                let end = i;
                if (run < minrun) {
                    i = Math.min(arr.length - 1, i + minrun - run);
                    end = i;
                    if (i === arr.length - 2) {
                        ++end;
                    }
                    for (let j = start_index; j <= end; ++j) {
                        arr[j].style.background = "yellow";
                    }
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    await insertion_sort(arr, start_index, end + 1, speed, vis_ins);
                } else {
                    // array.len > minrun
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "green";
                    }
                }
                let size = end - start_index + 1;
                await stack_push(start_index, size, speed);
                await merge_stack_elements(speed, 0);
            }
        }
    }
    await merge_stack_elements(speed, 1);
    console.log("hi");
    for (let j = start_index; j < arr.length; ++j) {
        arr[j].style.background = "green";
    }
    document.getElementById("refresh_button").disabled = false;
    state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: finished</b>';
}
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
    minrun = Number(minrun);
    document.getElementById("sort_button").disabled = true;
    document.getElementById("refresh_button").disabled = true;
    let ascending = -1;
    let start_index = 0;
    let run = 0;
    for (let i = 0; i < arr.length - 1; ++i) {
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
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "green";
                    }
                }
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
                    await insertion_sort(arr, start_index, i + 1, document.querySelector('input').value);
                } else {
                    await new Promise(r => setTimeout(r, 2000 / speed));
                    for (let j = start_index; j <= i; ++j) {
                        arr[j].style.background = "green";
                    }
                }
            }
        }
    }
}
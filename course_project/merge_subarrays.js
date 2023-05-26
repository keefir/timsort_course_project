async function merge_subarrays(first_arr, second_arr, speed) {
    // backend_stack: {start_index, size}
    /*
        filling frontend zone
    */
    let container1 = document.getElementById('merge_subwindow1');
    let container2 = document.getElementById('merge_subwindow2');
    let backend_container1 = [];
    let backend_container2 = [];
    for (let i = 0; i < first_arr[1]; ++i) {
        let div = container1.appendChild(document.createElement("div"));
        div.className = "subarray_element";
        div.id = `subarr_1_${i}`;
        div.style.height = boxes[first_arr[0] + i].style.height;
        div.setAttribute("style", `height:${boxes[first_arr[0] + i].style.height}; width:${boxes[first_arr[0] + i].style.width}`);
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
    await new Promise(r => setTimeout(r, MERGE_CONST / speed));

    /*
        merge sort as it is; filling main window
    */

    let cntr = 0;
    let streak = 0; // >0 => galloping arr1; <0 => arr2
    while (backend_container1.length !== 0 && backend_container2.length !== 0) {

        console.log(backend_container1[0], backend_container2[0]);
        merge_val1.innerHTML = `<p style="font-size:16px"><b>Lowest element value: ${parseFloat(backend_container1[0])}</b><p>`;
        merge_val2.innerHTML = `<p style="font-size:16px"><b>Lowest element value: ${parseFloat(backend_container2[0])}</b><p>`;
        await new Promise(r => setTimeout(r, MERGE_CONST / speed));

        if (Math.abs(streak) >= min_gal) { // FIXME: gallop
            if (streak > 0 && parseFloat(backend_container1[0]) <= parseFloat(backend_container2[0])) {
                let new_ptr1 = await activate_gallop(backend_container1, backend_container2, container1, container2, streak, speed, merge_val1);
                container1.childNodes[new_ptr1].style.background = "yellow";
                merge_val1.innerHTML = `<p style="font-size:16px"><b>Gallop final value: ${parseFloat(backend_container1[new_ptr1])}</b><p>`;
                await new Promise(r => setTimeout(r, MERGE_CONST / speed));
                state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: merging subarrays</b>';
                console.log("res:", new_ptr1);
                for (let i = 0; i <= new_ptr1; ++i) {
                    container1.childNodes[i].style.background = "yellow";
                }
                await new Promise(r => setTimeout(r, MERGE_CONST / speed));
                for (let i = 0; i <= new_ptr1; ++i) {
                    boxes[first_arr[0] + cntr].style.height = backend_container1[0];
                    container1.removeChild(container1.firstChild);
                    backend_container1.shift();
                    ++cntr;
                }
            } else if (streak < 0 && parseFloat(backend_container2[0]) <= parseFloat(backend_container1[0])) {
                let new_ptr2 = await activate_gallop(backend_container2, backend_container1, container2, container1, streak, speed, merge_val2);
                container2.childNodes[new_ptr2].style.background = "yellow";
                merge_val2.innerHTML = `<p style="font-size:16px"><b>Gallop final value: ${parseFloat(backend_container2[new_ptr2])}</b><p>`;
                await new Promise(r => setTimeout(r, MERGE_CONST / speed));
                state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: merging subarrays</b>';
                console.log("res:", new_ptr2);
                for (let i = 0; i <= new_ptr2; ++i) {
                    container2.childNodes[i].style.background = "yellow";
                }
                await new Promise(r => setTimeout(r, MERGE_CONST / speed));
                for (let i = 0; i <= new_ptr2; ++i) {
                    boxes[first_arr[0] + cntr].style.height = backend_container2[0];
                    container2.removeChild(container2.firstChild);
                    backend_container2.shift();
                    ++cntr;
                }
            }
            await new Promise(r => setTimeout(r, MERGE_CONST / speed));
            streak = 0;
        }

        if (backend_container1.length > 0 && backend_container2.length > 0) {
            if (parseFloat(backend_container1[0]) <= parseFloat(backend_container2[0])) {
                boxes[first_arr[0] + cntr].style.height = backend_container1[0];
                container1.removeChild(container1.firstChild);
                backend_container1.shift();
                if (streak < 0) {
                    streak = 0;
                }
                ++streak;
            } else {
                boxes[first_arr[0] + cntr].style.height = backend_container2[0];
                container2.removeChild(container2.firstChild);
                backend_container2.shift();
                if (streak > 0) {
                    streak = 0;
                }
                --streak;
            }
            // await new Promise(r => setTimeout(r, MERGE_CONST / speed));
            ++cntr;
        }

    }

    await new Promise(r => setTimeout(r, MERGE_CONST / speed));

    if (backend_container1.length > 0) {
        let end = backend_container1.length;
        for (let i = 0; i < end; ++i) {
            boxes[first_arr[0] + cntr].style.height = backend_container1[0];
            container1.removeChild(container1.firstChild);
            backend_container1.shift();
            await new Promise(r => setTimeout(r, MERGE_CONST / speed));
            ++cntr;
        }
    }
    if (backend_container2.length > 0) {
        let end = backend_container2.length;
        for (let i = 0; i < end; ++i) {
            boxes[first_arr[0] + cntr].style.height = backend_container2[0];
            container2.removeChild(container2.firstChild);
            backend_container2.shift();
            await new Promise(r => setTimeout(r, MERGE_CONST / speed));
            ++cntr;
        }
    }
    merge_val1.innerHTML = ``;
    merge_val2.innerHTML = ``;
}
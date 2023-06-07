async function merge_stack_elements(min_gal, speed, is_last) {
    /*
        backend_stack: {start_index, size}
    */
    state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: merging subarrays</b>';
    if (is_last === 1) { // <-- мерджим, когда дошли до конца, а условия не нарушились
        for (let i = 0; i < frontend_stack.childNodes.length; ++i) {
            frontend_stack.childNodes[i].style.background = "red";
        }
        while (backend_stack.length > 1) {
            await merge_subarrays(backend_stack.at(-2), backend_stack.at(-1), min_gal, speed);
            let prev_el = backend_stack.pop();
            let cur_last = backend_stack[backend_stack.length - 1];
            backend_stack[backend_stack.length - 1] = [cur_last[0], cur_last[1] + prev_el[1]];
            frontend_stack.removeChild(frontend_stack.lastChild);
            frontend_stack.lastChild.innerHTML = `<p style="margin-top: 1vh">Start index: ${backend_stack.at(-1)[0]}, Size: ${backend_stack.at(-1)[1]}</p>`;
        }
        frontend_stack.lastChild.style.background = "lightgreen";
    } else {
        while (backend_stack.length > 2 && (backend_stack.at(-3)[1] <= (backend_stack.at(-2)[1] + backend_stack.at(-1)[1]) ||
            backend_stack.at(-2)[1] <= backend_stack.at(-1)[1])) {
            if (backend_stack.at(-1)[1] < backend_stack.at(-3)[1]) {
                frontend_stack.childNodes[frontend_stack.childNodes.length - 1].style.background = "red";
                frontend_stack.childNodes[frontend_stack.childNodes.length - 2].style.background = "red";
                await merge_subarrays(backend_stack.at(-2), backend_stack.at(-1), min_gal, speed);
                let prev_el = backend_stack.pop();
                let cur_last = backend_stack[backend_stack.length - 1];
                backend_stack[backend_stack.length - 1] = [cur_last[0], cur_last[1] + prev_el[1]];
                frontend_stack.removeChild(frontend_stack.lastChild);
                frontend_stack.lastChild.innerHTML = `<p style="margin-top: 1vh">Start index: ${backend_stack.at(-1)[0]}, Size: ${backend_stack.at(-1)[1]}</p>`;
                frontend_stack.lastChild.style.background = "lightgreen";
            } else {
                frontend_stack.childNodes[frontend_stack.childNodes.length - 2].style.background = "red";
                frontend_stack.childNodes[frontend_stack.childNodes.length - 3].style.background = "red";
                await merge_subarrays(backend_stack.at(-3), backend_stack.at(-2), min_gal, speed);
                backend_stack[backend_stack.length - 3] = [backend_stack.at(-3)[0], backend_stack.at(-2)[1] + backend_stack.at(-3)[1]];
                backend_stack[backend_stack.length - 2] = backend_stack.pop();
                frontend_stack.removeChild(frontend_stack.lastChild);
                frontend_stack.lastChild.innerHTML = `<p style="margin-top: 1vh">Start index: ${backend_stack.at(-1)[0]}, Size: ${backend_stack.at(-1)[1]}</p>`;
                frontend_stack.lastChild.style.background = "lightgreen";
            }
        }
        if (backend_stack.length === 2) {
            if (backend_stack.at(-2)[1] <= backend_stack.at(-1)[1]) {
                frontend_stack.childNodes[1].style.background = "red";
                frontend_stack.childNodes[0].style.background = "red";
                await merge_subarrays(backend_stack.at(-2), backend_stack.at(-1), min_gal, speed);
                let prev_el = backend_stack.shift();
                backend_stack[0] = [prev_el[0], prev_el[1] + backend_stack[0][1]];
                frontend_stack.removeChild(frontend_stack.firstChild);
                frontend_stack.firstChild.innerHTML = `<p style="margin-top: 1vh">Start index: ${backend_stack[0][0]}, Size: ${backend_stack[0][1]}</p>`;
                frontend_stack.firstChild.style.background = "lightgreen";
            }
        }
    }
}

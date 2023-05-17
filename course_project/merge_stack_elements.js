async function merge_stack_elements(speed, is_last) {
    /*
        backend_stack: {start_index, size}
    */
    state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: merging subarrays</b>';
    if (is_last === 1) {
        while (backend_stack.length > 1) {
            await merge_subarrays(backend_stack.at(-2), backend_stack.at(-1), speed);
            let prev_el = backend_stack.pop();
            let cur_last = backend_stack[backend_stack.length - 1];
            backend_stack[backend_stack.length - 1] = [cur_last[0], cur_last[1] + prev_el[1]];
            frontend_stack.removeChild(frontend_stack.lastChild);
            frontend_stack.lastChild.innerHTML = `<p>Start index: ${backend_stack.at(-1)[0]}, Size: ${backend_stack.at(-1)[1]}</p>`;
        }
    } else {
        console.log(backend_stack.length);
        while (backend_stack.length > 2 && (backend_stack.at(-3)[1] <= (backend_stack.at(-2)[1] + backend_stack.at(-1)[1]) ||
            backend_stack.at(-2)[1] <= backend_stack.at(-1)[1])) {
            if (backend_stack.at(-1)[1] < backend_stack.at(-3)[1]) {
                await merge_subarrays(backend_stack.at(-2), backend_stack.at(-1), speed);
                let prev_el = backend_stack.pop();
                let cur_last = backend_stack[backend_stack.length - 1];
                backend_stack[backend_stack.length - 1] = [cur_last[0], cur_last[1] + prev_el[1]];
                frontend_stack.removeChild(frontend_stack.lastChild);
                frontend_stack.lastChild.innerHTML = `<p>Start index: ${backend_stack.at(-1)[0]}, Size: ${backend_stack.at(-1)[1]}</p>`;
            } else {
                await merge_subarrays(backend_stack.at(-2), backend_stack.at(-3), speed);
                // TODO: merge -2 and -3 elements
            }
        }
        if (backend_stack.length === 2) {
            if (backend_stack.at(-2)[1] <= backend_stack.at(-1)[1]) {
                await merge_subarrays(backend_stack.at(-2), backend_stack.at(-1), speed);
                let prev_el = backend_stack.shift();
                backend_stack[0] = [prev_el[0], prev_el[1] + backend_stack[0][1]];
                console.log(frontend_stack.childNodes[0]);
                frontend_stack.removeChild(frontend_stack.firstChild);
                frontend_stack.firstChild.innerHTML = `<p>Start index: ${backend_stack[0][0]}, Size: ${backend_stack[0][1]}</p>`;
            }
        }
    }
}

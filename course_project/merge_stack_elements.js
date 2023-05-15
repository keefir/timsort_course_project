function merge_stack_elements() {
    /*
        backend_stack: {start_index, size}
    */
    console.log(backend_stack);
    if (backend_stack.length === 2) {
        if (backend_stack.at(-2)[1] <= backend_stack.at(-1)[1]) {
            console.log('merge');
            merge_subarrays(backend_stack.at(-2), backend_stack.at(-1));
        }
    } else if (backend_stack.length > 2) {
        if (backend_stack.at(-3)[1] <= (backend_stack.at(-2)[1] + backend_stack.at(-1)[1]) ||
            backend_stack.at(-2)[1] <= backend_stack.at(-1)[1]) {
            if (backend_stack.at(-1)[1] < backend_stack.at(-3)[1]) {
                merge_subarrays(backend_stack.at(-2), backend_stack.at(-1));
            } else {
                merge_subarrays(backend_stack.at(-2), backend_stack.at(-3));
            }
        }
    }
}

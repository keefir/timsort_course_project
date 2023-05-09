function stack_push(start_index, size) {
    backend_stack.push({start_index, size});
    // console.log(frontend_stack.firstChild);
    if (backend_stack.length > 10) {
        frontend_stack.removeChild(frontend_stack.firstChild);
    }
    let div = frontend_stack.appendChild(document.createElement("rect"));
    div.className = "stack_element";
    div.innerHTML = `<p>Start index: ${start_index}, Size: ${size}</p>`;
}
function load_array(nelems, container) {
    // let grand_container = document.getElementById("sort_window");
    // grand_container.setAttribute("style", `width:${nelems * 3}px`);
    for (let i = 0; i < nelems; ++i) {
        let div = container.appendChild(document.createElement("div"));
        div.className = "array_element";
        div.id = i;
        div.setAttribute("style",`width:${1900 / nelems}px`);
    }
    reset();
}

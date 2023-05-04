function load_array(nelems) {
    let container = document.getElementById("array_window");
    let grand_container = document.getElementById("sort_window");
    grand_container.setAttribute("style", `width:${nelems * 3}px`);
    for (let i = 0; i < nelems; ++i) {
        let div = container.appendChild(document.createElement("div"));
        div.className = "array_element";
        div.id = i;
        div.setAttribute("style","width:3px");
    }
    reset();
}

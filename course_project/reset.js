function reset(container) {
    backend_stack = [];
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    while (frontend_stack.firstChild) {
        frontend_stack.removeChild(frontend_stack.firstChild);
    }
    while (merge_window1.firstChild) {
        merge_window1.removeChild(merge_window1.firstChild);
    }
    while (merge_window2.firstChild) {
        merge_window2.removeChild(merge_window2.firstChild);
    }
    document.getElementById("sort_button").disabled = false;
    document.getElementById('array_choosing_area').style.display = "block";
    document.getElementById('setting_area').style.display = "none";
    document.getElementById('array_description').innerHTML = "<b>Choose array type and length:</b>"
    state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state:</b>';
    merge_val1.innerHTML = ``;
    merge_val2.innerHTML = ``;
}
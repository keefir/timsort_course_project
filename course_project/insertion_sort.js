async function insertion_sort(arr, speed) {
    console.log(speed);
    if (isNaN(speed)) {
        alert(`${speed} is not a valid number.`);
        return;
    } else if (Number(speed) === 0) {
        alert("Cannot set zero speed.");
        return;
    }
    document.getElementById("sort_button").disabled = true;
    document.getElementById("refresh_button").disabled = true;
    for (let i = 1; i < arr.length; ++i) {
        for (let j = i; j > 0; --j) {
            arr[j].style.background = "red";
            arr[j-1].style.background = "blue";
            await new Promise(r => setTimeout(r, 2000 / speed));
            if (parseInt(arr[j].style.height) < parseInt(arr[j-1].style.height)) {
                let temp = arr[j].style.height;
                arr[j].style.height = arr[j-1].style.height;
                arr[j-1].style.height = temp;
                arr[j].style.background = "blue";
                arr[j-1].style.background = "red";
                await new Promise(r => setTimeout(r, 2000 / speed));
            } else {
                arr[j].style.background = "gray";
                arr[j-1].style.background = "gray";
                break;
            }
            arr[j].style.background = "gray";
            arr[j-1].style.background = "gray";
        }
    }
    document.getElementById("sort_button").disabled = false;
    document.getElementById("refresh_button").disabled = false;
}
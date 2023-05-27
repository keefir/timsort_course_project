async function activate_gallop(arr1, arr2, frontend_arr1, frontend_arr2, streak, speed, merge_val1) {
    /*
        возвращает индекс последнего элемента, меньшего или равного сравниваемому
     */

    state_window.innerHTML = '<b style="font-size:18px" class="state_text" id="state_text">Current state: GALLOP! 🐎</b>';

    // await new Promise(r => setTimeout(r, MERGE_CONST / speed));
    merge_val1.innerHTML = `<p style="font-size:16px"><b>Gallop value: ${parseFloat(arr1[0])}</b><p>`;

    if (arr1.length === 1 || parseFloat(arr1[1]) > parseFloat(arr2[0])) {
        return 0;
    }

    frontend_arr1.childNodes[0].style.background = "blue";
    await new Promise(r => setTimeout(r, MERGE_CONST / speed));
    let i = 1;
    merge_val1.innerHTML = `<p style="font-size:16px"><b>Gallop value: ${parseFloat(arr1[i])}</b><p>`;
    frontend_arr1.childNodes[0].style.background = "gray";
    frontend_arr1.childNodes[1].style.background = "blue";
    await new Promise(r => setTimeout(r, MERGE_CONST / speed));

    while (i < arr1.length - 1 && parseFloat(arr1[i]) <= parseFloat(arr2[0])) {
        frontend_arr1.childNodes[i].style.background = "gray";
        i = Math.min(arr1.length - 1, i * 2);
        merge_val1.innerHTML = `<p style="font-size:16px"><b>Gallop value: ${parseFloat(arr1[i])}</b><p>`;
        frontend_arr1.childNodes[i].style.background = "blue";
        await new Promise(r => setTimeout(r, MERGE_CONST / speed));
    }

    if (i === arr1.length - 1 && parseFloat(arr1[i]) <= parseFloat(arr2[0])) {
        return i;
    }

    await new Promise(r => setTimeout(r, MERGE_CONST / speed));

    let r = i; // правая граница интервала поиска
    let l = Math.ceil(i / 2); // левая
    i = Math.ceil((r + l) / 2);
    frontend_arr1.childNodes[l].style.background = "orange";

    await new Promise(r => setTimeout(r, MERGE_CONST / speed));

    while (l < r) { // бинпоиск
        console.log(i);
        merge_val1.innerHTML = `<p style="font-size:16px"><b>Gallop value: ${parseFloat(arr1[i])}</b><p>`;
        // let prev_color = frontend_arr1.childNodes[i].style.background;
        // frontend_arr1.childNodes[i].style.background = "yellow";

        if (parseFloat(arr1[i]) > parseFloat(arr2[0])) {

            if (i > 0 && parseFloat(arr1[i - 1]) <= parseFloat(arr2[0])) {
                console.log('a');
                frontend_arr1.childNodes[l].style.background = "gray";
                frontend_arr1.childNodes[r].style.background = "gray";
                return i - 1;
            }

            await new Promise(r => setTimeout(r, MERGE_CONST / speed));
            frontend_arr1.childNodes[r].style.background = "gray";
            r = i;
            frontend_arr1.childNodes[r].style.background = "blue";
            await new Promise(r => setTimeout(r, MERGE_CONST / speed));

        } else if (parseFloat(arr1[i]) < parseFloat(arr2[0])) {

            if (i < arr1.length - 1 && parseFloat(arr1[i + 1]) > parseFloat(arr2[0])) {
                console.log('b');
                frontend_arr1.childNodes[l].style.background = "gray";
                frontend_arr1.childNodes[r].style.background = "gray";
                return i;
            }

            frontend_arr1.childNodes[l].style.background = "gray";
            await new Promise(r => setTimeout(r, MERGE_CONST / speed));
            l = i;
            frontend_arr1.childNodes[l].style.background = "orange";
            await new Promise(r => setTimeout(r, MERGE_CONST / speed));

        } else {
            frontend_arr1.childNodes[l].style.background = "gray";
            frontend_arr1.childNodes[r].style.background = "gray";
            while (i < arr1.length - 1 && parseFloat(arr1[i + 1]) === parseFloat(arr2[0])) { // для устойчивости. берём все равные эл-ты из первого массива
                ++i;
            }
            console.log('c');
            return i;

        }
        // frontend_arr1.childNodes[i].style.background = "gray";
        // await new Promise(r => setTimeout(r, MERGE_CONST / speed));
        frontend_arr1.childNodes[i].style.background = "gray";
        i = Math.ceil((r + l) / 2);
        // frontend_arr1.childNodes[i].style.background = "yellow";
        // await new Promise(r => setTimeout(r, MERGE_CONST / speed));
        // console.log(l, r, i); // 10 20 15
    }
    frontend_arr1.childNodes[l].style.background = "gray";
    frontend_arr1.childNodes[r].style.background = "gray";
    console.log('d');
    return i;
}

function bubble_sort(array) {
    for (let i = 0; i < array.length; ++i) {
        for (let j = i; j < array.length - 1; ++j) {
            if (array[j] > array[j+1]) {
                let t = array[j];
                array[j] = array[j+1];
                array[j+1] = t;
            }
        }
    }
    return array;
}

console.log(bubble_sort([1, 5, 4, 6, 12]))
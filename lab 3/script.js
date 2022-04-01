const insertionSort = arr => {
    for (let i = 1, l = arr.length; i < l; i++) {
        const current = arr[i];
        let j = i;
        while (j > 0 && arr[j - 1] > current) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = current;
    }
    return arr;
};

let text = document.getElementById("arr")
let arr = [];
let length = 15
for (let i = 0, t = 10; i < length; i++) {
    arr.push(Math.round(Math.random() * t))
}
text.value = arr;

let arr_sort = document.getElementById("arr_sort");


let button = document.getElementById("But_sort");
button.onclick = function() {
    let array = insertionSort(arr);
    arr_sort.value = array;
}
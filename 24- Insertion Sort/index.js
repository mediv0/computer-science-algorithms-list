const insertionSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let current_element = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current_element) {
            arr[j + 1] = arr[j];
            j--;
        }

        arr[j + 1] = current_element;
    }
};

const arr = [1, 5, 2, 4, 3];
insertionSort(arr);
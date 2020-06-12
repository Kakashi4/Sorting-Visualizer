
export function mergeSortOutside(arr) {
    const animations = [];
    const tempArr = arr.slice();
    mergeSort(arr, 0, arr.length - 1, animations, tempArr);
    return animations;
}

function mergeSort(arr, L, R, animations, tempArr) {
    if (R === L) return;
    const mid = Math.floor((L + R) / 2);
    mergeSort(tempArr, L, mid, animations, arr);
    mergeSort(tempArr, mid + 1, R, animations, arr);
    merge(arr, L, mid, R, animations, tempArr);
}

function merge(arr, L, mid, R, animations, tempArr) {
    let k = L;
    let i = L;
    let j = mid + 1;
    
    while (i <= mid && j <= R) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (tempArr[i] <= tempArr[j]) {
            animations.push([k, tempArr[i]]);
            animations.push([k, tempArr[i]]);
            arr[k++] = tempArr[i++];
        }
        else {
            animations.push([k, tempArr[j]]);
            animations.push([k, tempArr[j]]);
            arr[k++] = tempArr[j++];
        }
    }
    while (i <= mid) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, tempArr[i]]);
        animations.push([k, tempArr[i]]);
        arr[k++] = tempArr[i++];
    }
    while (j <= R) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, tempArr[j]]);
        animations.push([k, tempArr[j]]);
        arr[k++] = tempArr[j++];
    }
}

export function selectionSortOutside(arr) {
    const animations = [];
    for (let i = 0; i < arr.length; i++) {
        var minIndex = i;
        for(let j = i; j < arr.length; j++) {
            animations.push([minIndex, j, 0]);
            animations.push([minIndex, j, 1]);
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }        
        }
        animations.push([i, minIndex, 2]);
        animations.push([i, minIndex, 3, arr[i], arr[minIndex]]);
        animations.push([i, minIndex, 4]);
        let temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }
    return animations;
}

export function bubbleSortOutside(arr) {
    const animations = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            animations.push([j, j + 1, 0])
            animations.push([j, j + 1, 1]);
            if (arr[j] > arr[j+1]) {
                animations.push([j, j + 1, 2, arr[j], arr[j + 1]]);
                animations.push([j, j + 1, 1]);
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return animations;
}
export function quickSortOutside(arr) {
    const animations = [];
    quickSort(arr, 0, arr.length - 1, animations);
    return animations;
}

function quickSort(arr, L, R, animations) {
    if (L < R) {
        let partitionIdx = partition(arr, L, R, animations);
        quickSort(arr, L, partitionIdx, animations);
        quickSort(arr, partitionIdx + 1, R, animations);
    }
    return animations;
}

function partition(arr, L, R, animations) {
    let pivot = arr[Math.floor((L + R)/2)];
    animations.push([Math.floor((L + R) / 2), 0, 3]);
    let i = L;
    let j = R;
    while(true) {
        while (arr[i] < pivot) {
            animations.push([i, j, 0]);
            animations.push([i, j, 1]);
            i++;
        }
        while (arr[j] > pivot) {
            animations.push([j, i, 0]);
            animations.push([j, i, 1]);
            j--;
        }
        if (i >= j) return j;
        animations.push([i, j, 0]);
        animations.push([i, j, 1]);
        animations.push([j, i, 0]);
        animations.push([j, i, 1]);
        animations.push([i, j, 2, arr[i], arr[j]]);
        animations.push([i, j, 1]);
        let temp = arr[i]
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j--;
    }
}

export function shellSortOutside(arr, gapcount) {
    const animations = [];
    if (gapcount === 1) {
        var gaps = [1];
    }
    else {
        gaps = [132, 57, 23, 10, 4, 1];
    }
    for (let gap of gaps) {
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i];
            animations.push([i, arr[i], 1]);
            var j = i;
            for (j = i; j >= gap && arr[j - gap] > temp; j-= gap) {
                animations.push([j, arr[j - gap], 0]);
                animations.push([j, arr[j - gap], 2]);
                arr[j] = arr[j - gap];
            }
            animations.push([i, arr[i], 2]);
            animations.push([j, temp, 0]);
            animations.push([j, temp, 2]);
            arr[j] = temp;
        }
    }
    return animations;
}

export function heapSortOutside(arr) {
    const animations = [];
    const N  = arr.length;
    for (let i =  Math.floor(N / 2); i >= 0; i--) {
        heapify(arr, N, i, animations);
    }
    for (let i = N - 1; i > 0; i--) {
        let max = arr[0];
        arr[0] = arr[i];
        arr[i] = max;
        animations.push([i, max, 3]);
        animations.push([0, arr[i], 3]);
        animations.push([i, max, 4]);
        animations.push([0, arr[i], 1]);
        heapify(arr, i, 0, animations);
    }
    return animations;
}

function heapify(arr, N, i, animations) {
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    let largest = i;

    if (l < N && arr[l] > arr[largest]) {
        animations.push([l, arr[l], 2]);
        animations.push([i, arr[i], 2]);
        animations.push([l, arr[l], 0]);
        animations.push([i, arr[i], 0]);
        largest = l;
    }
    if (r < N && arr[r] > arr[largest]) {
        animations.push([r, arr[r], 2]);
        animations.push([largest, arr[largest], 2]);
        animations.push([r, arr[r], 0]);
        animations.push([largest, arr[largest], 0]);
        largest = r;
    }

    if (largest !== i) {
        let temp = arr[largest];
        arr[largest] = arr[i];
        arr[i] = temp;
        animations.push([i, temp, 3]);
        animations.push([largest, arr[largest], 3]);
        animations.push([i, temp, 1]);
        animations.push([largest, arr[largest], 1]);
        heapify(arr, N, largest, animations);
    }
}
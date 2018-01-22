var App = App || {};
App.define = function(namespace) {
    var parts = namespace.split("."),
        parent = App,
        i;
    if (parts[0] == "App") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i++) {
        if (typeof parent[parts[i]] == "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
}
App.define("utils");
App.utils = (function() {
    function swap(a, x, y) {
        if (a.length === 1) {
            return a
        }
        a.splice(y, 1, a.splice(x, 1, a[y])[0]);
        return a;
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function arrayRandom(length, min, max) {
        var arr = [];
        for (var i = 0; i < length; i++) {
            arr[i] = App.utils.getRandom(min, max);
        }
        return arr
    }

    function factorial(number) {
        if (number == 0) return 1;
        var i;
        for (i = number - 1; i > 0; i--) {
            number *= i;
        }
        return number;
    }

    function factorialRecursive(number) {
        if (number == 0) return 1;
        var fact = number;
        if (number == 1) {
            return number;
        }
        return number = number * factorialRecursive(number - 1);
    }
    return {
        swap: swap,
        getRandom: getRandom,
        arrayRandom: arrayRandom,
        factorial: factorial,
        factorialRecursive: factorialRecursive
    }
}());
App.define("sortAlgorithms");
App.sortAlgorithms = (function() {
    var constantRandomArr = App.utils.arrayRandom(500, -500, 500),
        arrayConst = [3, -212, 213, -467, 747, -2415, 2526, 2314, 77, -2144, -35677, 2333332, -42345, 3424];

    function sortChoice(arr) {
        var i, j, min;
        for (i = 0; i < arr.length - 1; i++) {
            min = i;
            for (j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            if (min !== i) {
                App.utils.swap(arr, i, min);
            }
        }
        return arr
    }

    function sortBubble(arr) {
        var counter, j;
        for (counter = 1; counter > 0;) {
            counter = 0;
            for (j = 0; j < arr.length; j++) {
                if (arr[j] > arr[j + 1]) {
                    App.utils.swap(arr, j, j + 1);
                    counter++;
                }
            }
        }
        return arr;
    }

    function sortInsert(arr) {
        var i, j, element;
        for (i = 0; i < arr.length; i++) {
            element = arr[i];
            for (j = i; j > 0 && arr[j - 1] > element; j--) {
                arr[j] = arr[j - 1];
            }
            arr[j] = element;
        }
        return arr
    }

    function merge(a, low, mid, high) {
        var b = new Array(high + 1 - low),
            h = low,
            i,
            j = mid + 1,
            k;
        for (i = 0; h <= mid && j <= high; i++) {
            if (a[h] <= a[j]) {
                b[i] = a[h];
                h++;
            } else {
                b[i] = a[j];
                j++;
            }
        }
        if (h > mid) {
            for (k = j; k <= high; k++) {
                b[i] = a[k];
                i++;
            }
        } else {
            for (k = h; k <= mid; k++) {
                b[i] = a[k];
                i++;
            }
        }
        for (k = 0; k <= high - low; k++) {
            a[k + low] = b[k];
        }
        return a;
    }

    function mergeSortRecursive(array) {
        function merge_sort(a, low, high) {
            if (low < high) {
                var mid = Math.floor((low + high) / 2);
                merge_sort(a, low, mid);
                merge_sort(a, mid + 1, high);
                merge(a, low, mid, high);
            }
        }
        var n = array.length;
        merge_sort(array, 0, n - 1);
        return array;
    }

    function mergeSortIterative(array) {
        if (array.length < 2) {
            return array;
        }
        var work = [],
            i,
            len = array.length;
        for (i = 0; i < len; i++) {
            work.push([array[i]]);
        }
        work.push([]);
        for (var lim = len; lim > 1; lim = Math.floor((lim + 1) / 2)) {
            for (var j = 0, k = 0; k < lim; j++, k += 2) {
                work[j] = mergeForIterative(work[k], work[k + 1]);
            }
            work[j] = [];
        }
        return work[0];
    };

    function mergeForIterative(left, right) {
        var result = [];
        while (left.length > 0 && right.length > 0) {
            if (left[0] < right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        result = result.concat(left).concat(right);
        left.splice(0, left.length);
        right.splice(0, right.length);
        return result;
    }

    function compareNumeric(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
    }
    // TODO exchange recursion
    function binarySearch(sortedArr, number, min, max) {
        var mid = parseInt(min + ((max - min) / 2));
        if (max <= min) {
            return "Number out of this array";
        }
        if (sortedArr[mid] == number) {
            return mid;
        }
        if (sortedArr[mid] > number) {
            return binarySearch(sortedArr, number, min, mid);
        }
        if (sortedArr[mid] < number) {
            return binarySearch(sortedArr, number, mid + 1, max);
        }
    }
    return {
        constantRandomArr: constantRandomArr,
        arrayConst: arrayConst,
        sortBubble: sortBubble,
        sortChoice: sortChoice,
        sortInsert: sortInsert,
        merge: merge,
        mergeSortRecursive: mergeSortRecursive,
        mergeSortIterative: mergeSortIterative,
        mergeForIterative: mergeForIterative,
        compareNumeric: compareNumeric,
        binarySearch: binarySearch
    }
}());
var a =75;
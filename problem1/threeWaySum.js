var sum_to_n_a = function(n) {
    // Iterative
    //The for loop runs from i = 0 to i = n =>> it runs n + 1 times.
    //Time Complexity: O(n). The runtime grows linearly with the size of the input n.
    //Space Complexity: O(1). The memory used does not depend on n.
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function(n) {
    // Arithmetic Series formula
    //Time Complexity: O(1). The runtime does not depend on n.
    //Space Complexity: O(1). The memory used does not depend on n.
    return (n * (n + 1)) / 2;
};

var sum_to_n_c = function(n) {
    // Recursive
    //Time Complexity: O(n). The runtime grows linearly with the size of the input n.
    //Space Complexity: O(n). The memory grows linearly with the size of the input n.
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_c(n - 1);
};

// THE MOST EFFECTIVE METHOD: 
// B - The time and space complexity is constant regardless of the size of n 
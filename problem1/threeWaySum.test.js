function testSumToN() {
    // Test cases
    const testCases = [
        {input: 1, expected: 1},
        {input: 2, expected: 3},
        {input: 3, expected: 6},
        {input: 4, expected: 10},
        {input: 5, expected: 15},
        {input: 10, expected: 55},
        {input: 100, expected: 5050}
    ];

    // Helper function to run tests
    function runTests(sumFunction, functionName) {
        console.log(`Testing ${functionName}`);
        testCases.forEach(test => {
            const result = sumFunction(test.input);
            if (result === test.expected) {
                console.log(`PASS: ${functionName}(${test.input}) === ${test.expected}`);
            } else {
                console.log(`FAIL: ${functionName}(${test.input}) === ${result} (expected ${test.expected})`);
            }
        });
        console.log('\n');
    }

    // Run tests for each implementation
    runTests(sum_to_n_a, 'sum_to_n_a');
    runTests(sum_to_n_b, 'sum_to_n_b');
    runTests(sum_to_n_c, 'sum_to_n_c');
}

// Run the tests
testSumToN();

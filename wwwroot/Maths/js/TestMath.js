$('#submitUrl').on("click", async function () {
    let url = $('#urlValue').val() + '/api/maths'
    $('#Main').empty();
    $('#testResult').empty();
    let result = 'échec'
    let overallresult = 'Aucun problem'
     ProblemCount = 0;

    const testCases = [
        { op: '+', x: -111, y: -244, expected: '-355' },
        { op: '-', x: 1, y: 'abc', expectedError: 'Y must be an Integer' },
        { n: 'a', op: 'p', expectedError: 'n parameter is not a number' },
        { op: '-', x: 111, y: 244, expected: '-133' },
        { op: '*', x: 11.56, y: 244.12345, expected: '2822.067082' },
        { op: '/', x: 99, y: 11.06, expected: '8.95117540687161' },
        { op: '/', x: 99, y: 0, expected: 'Infinity' },
        { op: '/', x: 0, y: 0, expected: 'NaN' },
        { op: '%', x: 5, y: 5, expected: '0' },
        { op: '%', x: 100, y: 13, expected: '9' },
        { op: '%', x: 100, y: 0, expected: 'NaN' },
        { op: '%', x: 0, y: 0, expected: 'NaN' },
        { op: '!', n: 0, expectedError: 'n must be an Integer > 0' },
        { op: 'p', n: 0, expectedError: 'n must be an Integer > 0' },
        { op: 'p', n: 1, expected: false },
        { op: 'p', n: 2, expected: true },
        { op: 'p', n: 5, expected: true },
        { op: 'p', n: 6, expected: false },
        { op: 'p', n: 6.5, expectedError: 'n must be an Integer > 0' },
        { op: 'p', n: 113, expected: true },
        { op: 'p', n: 114, expected: false },
        { op: 'np', n: 1, expected: '2' },
        { op: 'np', n: 30, expected: '113' },
        { op: '+', X: 111, y: 244, expectedError: 'x parameter is missing' },
        { op: '+', Y: 111, x: 244, expectedError: 'y parameter is missing' },
        { op: '-', y: 33, x: 244, z: 0, expectedError: 'too many parameters' },
        { op: '!', n: 33, z: 0, expectedError: 'too many parameters' },
        { op: '!', n: 3.3, expectedError: 'n must be an Integer > 0' },
        { n: 3.3, expectedError: 'op parameter missing' },
        { op: '!', n: -6, expectedError: 'n must be an Integer > 0' },
        { x: null, expectedError: 'op parameter missing' },
    ];

    // Loop through each test case
    for (const testCase of testCases) {
        let queryString = `?op=${testCase.op}`; // Start with the operation
        let parameterCount = 1; // Initialize parameter count (1 for 'op')

        // Iterate through the properties of testCase and add to queryString
        for (let key in testCase) {
            if (key !== 'op' && key != 'expected' && key != 'expectedError' && testCase[key] !== undefined) {
                queryString += `&${key}=${testCase[key]}`;
                parameterCount++;
            }
        }
        try {
            const response = await fetch(url + queryString, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                const errorData = await response.json(); 
                const errorDescription = errorData.error_description;
                throw new Error(`${errorDescription}`);
            }
            const data = await response.json().catch(() => null); 
            if (data.value != null) {
                result = testresult(data.value, testCase.expected);
            }
            ProblemCount = ProblemCount + asProblem(data.value,testCase.expected)
            console.log('problemes' + ' ' + ProblemCount);
            Affichetest(`${result} ==> ${queryString}: ${JSON.stringify(data)}`);

        } catch (error) {
            console.error('Request failed:', error.message);
            result = testresult(error.message, testCase.expectedError);
            ProblemCount += asProblem(error.message, testCase.expectedError);
            let param =queryStringToObject(queryString)
            Affichetest(`${result} ==> ${queryString}: ${JSON.stringify(param)}:${error.message}`);
        }
    }
    Afficheresult(ProblemCount,overallresult)
});
// Function to display the test result
function Affichetest(message) {
    $("#Main").append(`
        <div id='message'>
            ${message}
        </div>
    `);
}
function Afficheresult(ProblemCount,message) {
    let s = (ProblemCount > 1) ? 's':'';
    if(ProblemCount !== 0) 
        message = `${ProblemCount} erreur${s} trouvé${s}`
    $("#testResult").append(`
        <div id='message'>
            ${message}
        </div>
    `);
}
// Function to compare actual and expected result
function testresult(data, expected) {
    return data === expected ? 'ok' :  `échec: expected ${expected}, got ${data}`;
}
function asProblem(data, expected){
 return data === expected ? 0 : 1;
}
function queryStringToObject(queryString) {
    const params = new URLSearchParams(queryString);
    const obj = {};
    params.forEach((value, key) => {
        obj[key] = value;
    });
    return obj;
}
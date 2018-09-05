(async () => {
    console.log('Watch the order....');

    console.log('1 Starting');

    let hello
    try {
        hello = await new Promise((res, rej) => {
            throw new Error('OH NOZ');
            setTimeout(() => {
                // Let's pretend this is a long API call
                console.log('2 Timeout finished');
                res('hello');
            }, 3000);
        });
    } catch {
        console.log('Could not get hello');

    }
    console.log('3 After promise', hello);

    console.log('2 Passed the promise');
})();

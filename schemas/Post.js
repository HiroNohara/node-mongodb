module.exports = {
    title: String,
    content: String,
    created: {type: Date, default: Date.now}
};


// const test = require('./test');
// const {foo} = require('./test');
// test === 1;
// foo === 'bar';

// // test.js
// module.exports = 1;
// module.exports.foo = 'bar';


// // lib.js
// module.exports.function1 = asasdasdad;
// module.exports.function2 = asasdasdad;
// module.exports.function2 = asasdasdad;


// // anotherfile.js
// const lib = require('./lib');
// lib.function1();
// lib.function2();

// module.exports = {
//     println: function (output) {
//         console.log(output);
//     }
// }

// function println(output) {
//     console.log(output);
// }

// var Logger = {
//     log: function log(output) {
//         console.log(output);
//     }
// }

// module.exports.println = println;
// module.exports.Logger = Logger;

module.exports = {
    println: function (output) {
        console.log(output);
    },
    Logger: {
        log: function (output) {
                 console.log(output);
        }
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testAsync = void 0;
exports.testAsync = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('resolved');
    }, 1000);
});

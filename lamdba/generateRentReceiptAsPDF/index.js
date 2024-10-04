"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.handler = void 0;
var pdf_utils_1 = require("./pdf.utils");
;
var handler = function (event, context) { return __awaiter(void 0, void 0, void 0, function () {
    function parseUrlEncodedString(urlEncodedStr) {
        // Step 1: Create a new URLSearchParams object with the input string
        var params = new URLSearchParams(urlEncodedStr);
        // Step 2: Convert URLSearchParams into a plain object
        var result = {};
        // Iterate over the params and populate the object
        params.forEach(function (value, key) {
            result[key] = value;
        });
        return result;
    }
    var body, requestBody, decodedBody, owner, lodger, address, rent, charges, signature, date, result, response, e_1, response;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                body = (event === null || event === void 0 ? void 0 : event.body) ? event.body : event;
                console.log('body', body);
                requestBody = void 0;
                if (event.isBase64Encoded) {
                    decodedBody = Buffer.from(body, 'base64').toString('utf-8');
                    requestBody = parseUrlEncodedString(decodedBody); //= JSON.parse(decodedBody); // parse JSON body
                }
                else {
                    requestBody = body; // parse directly if not base64
                }
                body = requestBody;
                owner = { name: body.ownerName, street: body.ownerStreet, city: body.ownerCity };
                lodger = { name: body.lodgerName, street: body.lodgerStreet, city: body.lodgerCity };
                address = body.address;
                rent = parseInt(body.rent);
                charges = parseInt(body.charges);
                signature = (_a = body === null || body === void 0 ? void 0 : body.signature) !== null && _a !== void 0 ? _a : '';
                date = { start: body === null || body === void 0 ? void 0 : body.startDate, end: body === null || body === void 0 ? void 0 : body.endDate };
                return [4 /*yield*/, (0, pdf_utils_1.createQuittance)(owner, lodger, address, rent, charges, signature, date)];
            case 1:
                result = _b.sent();
                response = {
                    statusCode: 200,
                    isBase64Encoded: true, // Tells API Gateway the response is base64 encoded
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': '*',
                        'Access-Control-Allow-Headers': '*',
                        'Access-Control-Allow-Credentials': true,
                        'Content-Disposition': 'attachment; filename="receipt.pdf"',
                    },
                    body: result.toString('base64')
                };
                return [2 /*return*/, response];
            case 2:
                e_1 = _b.sent();
                console.error('error creating quittance', e_1);
                response = {
                    statusCode: 500,
                    body: 'error creating quittance'
                };
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.handler = handler;

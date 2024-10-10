"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuittance = void 0;
var fs_1 = __importDefault(require("fs"));
var pdfkit = __importStar(require("pdfkit"));
;
// const createPath = (path: string): string => {
//   try {
//     if (!fs.existsSync(path)) {
//       fs.mkdirSync(path, { recursive: true });
//     }
//     return path;
//   } catch (err) {
//     console.error(err);
//     return '';
//   }
// }
var calculateProportionalRentAndCharges = function (startDate, endDate, monthlyRent, monthlyCharges, alignOnAMonthas31days) {
    if (alignOnAMonthas31days === void 0) { alignOnAMonthas31days = true; }
    var totalRent = 0;
    var totalCharges = 0;
    var currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        var lastDayOfMonth = alignOnAMonthas31days ? 31 : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        var isFirstDayOfMonth = currentDate.getDate() === 1;
        var isLastDayOfMonth = endDate.getDate() === lastDayOfMonth && currentDate.getMonth() === endDate.getMonth();
        if (isFirstDayOfMonth && isLastDayOfMonth) {
            // Si le mois entier est compris, ajoutez le montant mensuel total
            totalRent += monthlyRent;
            totalCharges += monthlyCharges;
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Passez au mois suivant
        }
        else if (alignOnAMonthas31days && currentDate.getDate() > 1) {
            var allDays = getNumberOfDaysBetween2Dates(currentDate, endDate);
            console.log('allDays', allDays);
            return allDays * (monthlyRent + monthlyCharges) / lastDayOfMonth;
        }
        else {
            var daysInCurrentMonth = (currentDate.getMonth() === endDate.getMonth() && currentDate.getFullYear() === endDate.getFullYear())
                ? endDate.getDate() - currentDate.getDate() + 1
                : lastDayOfMonth - currentDate.getDate() + 1;
            totalRent += (monthlyRent / lastDayOfMonth) * daysInCurrentMonth;
            totalCharges += (monthlyCharges / lastDayOfMonth) * daysInCurrentMonth;
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Passez au mois suivant
        }
    }
    return Math.round((totalRent + totalCharges) * 100) / 100;
};
var formatDateFromISOString = function (dateStr) {
    console.log('formatDateFromISOString', dateStr);
    // Extrait les composants de la date de la chaîne ISO sans convertir le fuseau horaire
    var _a = dateStr.split('T')[0].split('-'), year = _a[0], month = _a[1], day = _a[2];
    return "".concat(day, "/").concat(month, "/").concat(year);
};
var getNumberOfDaysBetween2Dates = function (dateStart, dateEnd) {
    return Math.round((dateEnd.getTime() - dateStart.getTime()) / (1000 * 3600 * 24));
};
var createQuittance = function (bailleur, locataire, address, loyer, charges, signature, date, madeAt) {
    if (date === void 0) { date = { start: null, end: null }; }
    //@ts-ignore
    return new Promise(function (resolve, reject) {
        try {
            if (!date) {
                date = { start: null, end: null };
            }
            if (!date.start) {
                var now = new Date();
                var firstDayOfMonthUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
                date.start = new Date(firstDayOfMonthUtc).toISOString();
            }
            if (!date.end) {
                var now = new Date();
                var nextMonthFirstDay = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
                date.end = new Date(nextMonthFirstDay.getTime() - 1).toISOString();
            }
            var doc = new pdfkit.default({
                margins: { top: 50, bottom: 50, left: 50, right: 50 }
            });
            // createPath('quittances');
            var fileName_1 = 'quittance' + Date.now();
            var stream = fs_1.default.createWriteStream("/tmp/".concat(fileName_1, ".pdf"));
            stream.on('finish', function () {
                var document = fs_1.default.readFileSync("/tmp/".concat(fileName_1, ".pdf"));
                resolve(document);
            });
            doc.pipe(stream);
            var totalRent = calculateProportionalRentAndCharges(new Date(date.start), new Date(date.end), loyer, charges);
            var pageWidth = doc.page.width;
            var marginLeft = 50;
            var textHeight = 15;
            var padding = 5;
            var tabCenter = marginLeft + (pageWidth - marginLeft * 2) / 2;
            var y = 50;
            doc.text(bailleur.name, marginLeft, y);
            doc.text(bailleur.street, marginLeft, y += textHeight);
            doc.text(bailleur.city, marginLeft, y += textHeight);
            y = 50;
            // Informations du destinataire
            doc.text(locataire.name, 0, y, { align: 'right' });
            doc.text(locataire.street, 0, y += textHeight, { align: 'right' });
            doc.text(locataire.city, 0, y += textHeight, { align: 'right' });
            fs_1.default.readdir('./', function (err, files) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(files);
            });
            // const fontPath = path.join(__dirname, 'fonts', 'times_bold.ttf');
            // console.log(fontPath);
            // doc.registerFont('TimesBold', fontPath);
            y += textHeight * 4;
            // En-tête de la quittance
            doc.font('fonts/times_bold.ttf').text('QUITTANCE DE LOYER', marginLeft, y += textHeight, { underline: true, align: 'center' });
            doc.font('Times-Roman').text("P\u00E9riode: du ".concat(formatDateFromISOString(date.start), " au ").concat(formatDateFromISOString(date.end)), marginLeft, y += textHeight * 1.5, { align: 'center' });
            doc.text(address, marginLeft, y += textHeight, { align: 'center' });
            var tabTop = y + textHeight * 2;
            doc.moveTo(marginLeft, y += textHeight * 2)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            // Détails du paiement
            doc.font('fonts/times_bold.ttf').text('PROPRIETAIRE:', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text('LOCATAIRE:', tabCenter + padding, y);
            doc.font('Times-Roman').text(bailleur.name, marginLeft + padding, y += textHeight);
            doc.text(locataire.name, tabCenter + padding, y);
            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.text('Loyer', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text(loyer + ' €', tabCenter + padding, y);
            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.text('Charges', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.text(charges + ' €', tabCenter + padding, y);
            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.font('fonts/times_bold.ttf').text('Total', marginLeft + padding, y += textHeight * 0.5 + padding);
            doc.font('Times-Roman').text(totalRent + ' €', tabCenter + padding, y);
            doc.moveTo(marginLeft, y += textHeight + padding)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.moveTo(marginLeft, tabTop)
                .lineTo(marginLeft, y)
                .stroke();
            doc.moveTo(tabCenter, tabTop)
                .lineTo(tabCenter, y)
                .stroke();
            doc.moveTo(pageWidth - marginLeft, tabTop)
                .lineTo(pageWidth - marginLeft, y)
                .stroke();
            doc.font('Times-Roman').text("Je soussign\u00E9 ".concat(bailleur.name, ", propri\u00E9taire du logement d\u00E9sign\u00E9 ci dessus avoir re\u00E7u de la part du locataire l'ensemble des sommes mentionn\u00E9es au titre du loyer et des charges."), marginLeft, y += textHeight * 2);
            doc.text("Fait ".concat(madeAt ? ('à ' + madeAt + ' ') : '', "le ").concat(formatDateFromISOString(new Date().toISOString())), marginLeft, y += textHeight * 4);
            doc.text('Le bailleur,', pageWidth - marginLeft * 4, y += textHeight * 2);
            doc.text(bailleur.name, pageWidth - marginLeft * 4, y += textHeight * 1.5);
            console.log('signature', signature);
            try {
                var matches = signature.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
                // const imageType = matches![1];
                var imageData = Buffer.from(matches[2], 'base64');
                doc.image(imageData, tabCenter, y += textHeight * 2, { height: 120 });
            }
            catch (e) {
                console.error('error signature', e);
            }
            y = doc.page.height - 100;
            // Texte de pied de page
            doc.fontSize(10).text('Cette quittance annule tous les reçus qui auraient pu être donnés pour acomptes versés au titre du loyer et des charges pour l’échéance correspondante. Le paiement de la présente quittance ne présume pas du paiement des termes précédents. A conserver 3 ans après échéance du bail', marginLeft, y);
            doc.save();
            doc.end();
        }
        catch (e) {
            console.error(e);
            reject(e);
        }
    });
};
exports.createQuittance = createQuittance;

import fs from 'fs';
import * as pdfkit from 'pdfkit';
interface Person { name: string, street: string, city: string };
import path from 'path';

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

const calculateProportionalRentAndCharges = (
  startDate: Date,
  endDate: Date,
  monthlyRent: number,
  monthlyCharges: number,
  alignOnAMonthas31days = true
): number => {
  let totalRent = 0;
  let totalCharges = 0;

  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const lastDayOfMonth = alignOnAMonthas31days ? 31 : new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const isFirstDayOfMonth = currentDate.getDate() === 1;
    const isLastDayOfMonth = endDate.getDate() === lastDayOfMonth && currentDate.getMonth() === endDate.getMonth();

    if (isFirstDayOfMonth && isLastDayOfMonth) {
      // Si le mois entier est compris, ajoutez le montant mensuel total
      totalRent += monthlyRent;
      totalCharges += monthlyCharges;
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Passez au mois suivant
    } else if (alignOnAMonthas31days && currentDate.getDate() > 1) {

      const allDays = getNumberOfDaysBetween2Dates(currentDate, endDate);
      console.log('allDays', allDays);
      return allDays * (monthlyRent + monthlyCharges) / lastDayOfMonth;

    } else {

      const daysInCurrentMonth = (currentDate.getMonth() === endDate.getMonth() && currentDate.getFullYear() === endDate.getFullYear())
        ? endDate.getDate() - currentDate.getDate() + 1
        : lastDayOfMonth - currentDate.getDate() + 1;
      totalRent += (monthlyRent / lastDayOfMonth) * daysInCurrentMonth;
      totalCharges += (monthlyCharges / lastDayOfMonth) * daysInCurrentMonth;
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1); // Passez au mois suivant
    }
  }

  return Math.round((totalRent + totalCharges) * 100) / 100;
}

const formatDateFromISOString = (dateStr: string): string => {
  console.log('formatDateFromISOString', dateStr);
  // Extrait les composants de la date de la chaîne ISO sans convertir le fuseau horaire
  const [year, month, day] = dateStr.split('T')[0].split('-');

  return `${day}/${month}/${year}`;
}

const getNumberOfDaysBetween2Dates = (dateStart: Date, dateEnd: Date): number => {
  return Math.round((dateEnd.getTime() - dateStart.getTime()) / (1000 * 3600 * 24));
}


export const createQuittance = (
  bailleur: Person,
  locataire: Person,
  address: string,
  loyer: number,
  charges: number,
  signature: string,
  date: { start?: string | null, end?: string | null } = { start: null, end: null },
  madeAt?: string | null
) => {

  return new Promise<Buffer>((resolve, reject) => {
    try {

      if(!date){
        date = {start: null, end: null};
      }

      if (!date.start) {
        const now = new Date();
        const firstDayOfMonthUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1);
        date.start = new Date(firstDayOfMonthUtc).toISOString();
      }
      if (!date.end) {
        const now = new Date();
        const nextMonthFirstDay = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
        date.end = new Date(nextMonthFirstDay.getTime() - 1).toISOString();
      }

      const doc = new pdfkit.default({
        margins: { top: 50, bottom: 50, left: 50, right: 50 }
      });
      // createPath('quittances');
      const fileName = 'quittance' + Date.now();
      const stream = fs.createWriteStream(`/tmp/${fileName}.pdf`);
      stream.on('finish', () => {
        const document = fs.readFileSync(`/tmp/${fileName}.pdf`);
        resolve(document);
      });
      doc.pipe(stream);

      const totalRent = calculateProportionalRentAndCharges(new Date(date.start), new Date(date.end), loyer, charges);
      const pageWidth = doc.page.width;
      const marginLeft = 50;
      const textHeight = 15;
      const padding = 5;
      const tabCenter = marginLeft + (pageWidth - marginLeft * 2) / 2;
      let y = 50;

      doc.text(bailleur.name, marginLeft, y);
      doc.text(bailleur.street, marginLeft, y += textHeight);
      doc.text(bailleur.city, marginLeft, y += textHeight);

      y = 50;
      // Informations du destinataire
      doc.text(locataire.name, 0, y, { align: 'right' });
      doc.text(locataire.street, 0, y += textHeight, { align: 'right' });
      doc.text(locataire.city, 0, y += textHeight, { align: 'right' });

      fs.readdir('./', (err, files) => {
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
      doc.font('Times-Roman').text(`Période: du ${formatDateFromISOString(date.start)} au ${formatDateFromISOString(date.end)}`, marginLeft, y += textHeight * 1.5, { align: 'center' });
      doc.text(address, marginLeft, y += textHeight, { align: 'center' });

      let tabTop = y + textHeight * 2;

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

      doc.font('Times-Roman').text(`Je soussigné ${bailleur.name}, propriétaire du logement désigné ci dessus avoir reçu de la part du locataire l'ensemble des sommes mentionnées au titre du loyer et des charges.`, marginLeft, y += textHeight * 2);
      doc.text(`Fait ${madeAt ? ('à ' + madeAt + ' ') : ''}le ${formatDateFromISOString(new Date().toISOString())}`, marginLeft, y += textHeight * 4);

      doc.text('Le bailleur,', pageWidth - marginLeft * 4, y += textHeight * 2);
      doc.text(bailleur.name, pageWidth - marginLeft * 4, y += textHeight * 1.5);

      console.log('signature', signature);
      try {

        const matches = signature.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        // const imageType = matches![1];
        const imageData = Buffer.from(matches![2], 'base64');

        doc.image(imageData, tabCenter, y += textHeight * 2, { height: 120 });
      } catch (e) {
        console.error('error signature', e);
      }

      y = doc.page.height - 100;
      // Texte de pied de page
      doc.fontSize(10).text('Cette quittance annule tous les reçus qui auraient pu être donnés pour acomptes versés au titre du loyer et des charges pour l’échéance correspondante. Le paiement de la présente quittance ne présume pas du paiement des termes précédents. A conserver 3 ans après échéance du bail', marginLeft, y);

      doc.save();
      doc.end();
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });

}

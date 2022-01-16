import ExcelJs from 'exceljs';
import { mappingClinicData } from '../utils/mapData.js';

const exportDataFromExcel = async (buffer) => {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(process.env.SHEET_UPLOAD);
   
    let data = []
    // Iterate over all rows that have values in a worksheet
    worksheet.eachRow(function (row, rowNumber) {
        // console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
        if(rowNumber <= 1){
            return 
        }
        let clinic = mappingClinicData(row.values)
        data = [...data, clinic]
    });

    return data 
}

export default exportDataFromExcel
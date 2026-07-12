import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export class ExcelReader {
    static getData<T>(fileName: string, sheetName: string): T[] {

        const fullPath = path.resolve(`src/resources/data/${fileName}`);
        const workbook = XLSX.readFile(fullPath);
        const worksheet = workbook.Sheets[sheetName]

        const records = XLSX.utils.sheet_to_json(worksheet);

        return records as T[];
    }
}
export function readExcelData<T>(fileName: string, sheetName: string): T[] {
    return ExcelReader.getData<T>(fileName, sheetName);
}
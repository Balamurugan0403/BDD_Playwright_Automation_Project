import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

export class CSVReader {
    static getData<T>(fileName: string, sheetName: string): T[] {

        const fullPath = path.resolve(`src/resources/data/${fileName}`);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const workbook = XLSX.readFile(fileContent);
        const worksheet = workbook.Sheets[sheetName]

        const records = XLSX.utils.sheet_to_json(worksheet);
        
        return records as T[];
    }
}
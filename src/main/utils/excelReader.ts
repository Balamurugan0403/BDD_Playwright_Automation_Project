import * as XLSX from 'xlsx'
import * as path from 'path'

export function readExcelData(filename:string,sheetname:string) {
    const filepath = path.resolve(__dirname, '../testData/', filename)
    const workbook = XLSX.readFile(filepath)
    const sheet = workbook.Sheets[sheetname]
    if(!sheet){
        throw new Error(`${sheetname} not found`)
    }
    return XLSX.utils.sheet_to_json(sheet)
}
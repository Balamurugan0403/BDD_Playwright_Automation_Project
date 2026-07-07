import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export class CSVReader {
    static getData(filePath: string): Record<string, string>[] {
        const fullPath = path.resolve(filePath);
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        }) as Record<string, string>[];
        return records;
    }
}
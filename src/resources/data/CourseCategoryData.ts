import fs from "fs";
import path from "path";
import { CourseCategory } from "../../main/types/CourseCategory";
import { CSVReader } from "../../main/utils/csv_reader";

const dataFile = path.resolve(__dirname, ".generated-category.json");
export function generateCourseCategoryData(
    courseName: string,
    description: string): CourseCategory {
    const category: CourseCategory = {
        categoryName: `Category_${Date.now()}`,
        courseName,
        description
    };
    fs.writeFileSync(dataFile, JSON.stringify(category, null, 2));
    return category;
}
export function getCourseCategoryData(): CourseCategory {
    if (!fs.existsSync(dataFile)) {
        throw new Error("Category data not generated yet. Run the creation scenario first.");
    }
    return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}

export function getExistingCategory(): CourseCategory {
    const rows = CSVReader.getData("src/resources/data/CourseCategory.csv");
    if (rows.length === 0) {
        throw new Error("CSV file has no data");
    }
    return rows[0] as CourseCategory;
}
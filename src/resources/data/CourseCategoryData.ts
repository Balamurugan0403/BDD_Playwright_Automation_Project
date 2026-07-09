
import fs from "fs";
import path from "path";
import { CourseCategory } from "../../main/types/CourseCategory";

const dataFile = path.resolve(__dirname, ".generated-category.json");

export function generateCourseCategoryData(
    courseName: string,
    description: string):CourseCategory {
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
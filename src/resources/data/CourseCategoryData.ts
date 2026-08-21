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

// ---------------------------------------------------------------------
// New: fully auto-generated data (no hardcoded Category/Course/Description
// values anywhere). Used by the new scenarios only - none of the functions
// above were changed.
// ---------------------------------------------------------------------

function uniqueSuffix(): string {
    return `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

/**
 * Generates a fully unique CourseCategory - Category Name, Course Name AND
 * Description are all auto-generated, nothing hardcoded - and persists it
 * to the shared data file so later steps/scenarios can look it up via
 * getCourseCategoryData().
 */
export function generateUniqueCourseCategoryData(): CourseCategory {
    const suffix = uniqueSuffix();
    const category: CourseCategory = {
        categoryName: `Category_${suffix}`,
        courseName: `Course_${suffix}`,
        description: `Auto generated description ${suffix}`
    };
    fs.writeFileSync(dataFile, JSON.stringify(category, null, 2));
    return category;
}

/**
 * Same as generateUniqueCourseCategoryData(), but does NOT persist to the
 * shared data file. Use this for flows that never complete a real category
 * creation (Cancel, blocked creation due to a missing mandatory field) so
 * they can't overwrite the data other scenarios (Search/Edit/Delete/Partial
 * search) rely on.
 */
export function generateTempUniqueCourseCategoryData(): CourseCategory {
    const suffix = uniqueSuffix();
    return {
        categoryName: `TempCategory_${suffix}`,
        courseName: `TempCourse_${suffix}`,
        description: `Temp auto generated description ${suffix}`
    };
}

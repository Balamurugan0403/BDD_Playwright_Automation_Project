import { EditCourse } from "../../main/types/EditCourse";
import { CSVReader } from "../../main/utils/csv_reader";

export function getEditCourseData(): EditCourse{
    const rows = CSVReader.getData("src/resources/data/EditCourse.csv");
    if (rows.length === 0) {
        throw new Error("CSV file has no data");
    }
    return rows[0] as EditCourse;
}
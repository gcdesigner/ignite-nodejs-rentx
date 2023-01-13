import type { UnitType } from "dayjs";
interface IDateProvider {
  dateNow(): Date;
  convertToUTC(date: Date): string;
  compare(start_date: Date, end_date: Date, diff_unit: UnitType): number;
  addDays(days: number): Date;
}

export { IDateProvider };

import dayjs, { UnitType } from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  compare(start_date: Date, end_date: Date, diff_unit: UnitType): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    return dayjs(end_date_utc).diff(start_date_utc, diff_unit);
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }
}

export { DayjsDateProvider };

export interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  start_date: Date;
  end_date: Date;
  total: number;
}

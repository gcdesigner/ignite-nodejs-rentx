import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "../../../../../modules/cars/infra/typeorm/entities/Car";

@Entity("rentals")
class Rental {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  user_id: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id", referencedColumnName: "id" })
  car: Car;

  @Column()
  car_id: string;

  @Column({ default: null })
  total: number;

  @Column({ default: new Date() })
  start_date: Date;

  @Column({ default: null })
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @CreateDateColumn({ default: new Date() })
  created_at: Date;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };

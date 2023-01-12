import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "./Car";

@Entity("cars_image")
class CarImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id", referencedColumnName: "id" })
  car: Car;

  @CreateDateColumn({ default: new Date() })
  create_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { CarImage };

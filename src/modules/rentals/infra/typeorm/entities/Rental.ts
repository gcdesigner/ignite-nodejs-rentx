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

// import { User } from "@modules/accounts/infra/typeorm/entities/User";

@Entity("rentals")
class Rental {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  // @ManyToOne(() => User)
  // @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  // user: User;

  @Column()
  user_id: string;

  @Column()
  car_id: string;

  @Column({ default: null })
  total: number;

  @CreateDateColumn({ default: new Date() })
  start_date: Date;

  @Column({ default: null })
  end_date: Date;

  @CreateDateColumn()
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

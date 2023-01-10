import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

// import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column({ default: false })
  is_admin?: boolean;

  @Column({ default: null })
  avatar?: string;

  // @OneToMany(() => Rental, (rental) => rental.user)
  // rental: Rental[];

  @CreateDateColumn({ default: new Date() })
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };

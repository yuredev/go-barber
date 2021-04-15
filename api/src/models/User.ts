import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // tipo varchar por padrão
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'created_at ' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at ' })
  updatedAt: Date;
}

export default User;

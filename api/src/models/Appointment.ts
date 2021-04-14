import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointment')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // tipo varchar por padrõa
  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;
}

export default Appointment;

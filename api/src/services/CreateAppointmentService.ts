import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import { getCustomRepository, getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  providerId: string;
  date: Date;
}

// Single Responsability Principle: classe responsável somente por criar agendamentos (Solid)
class CreateAppointmentsService {
  public async run({ date, providerId }: RequestDTO): Promise<Appointment> {
    // pegar repositório customizado com métodos adicioados como findByDate por exemplo
    const appointmentRepo = getCustomRepository(AppointmentRepository);
    // pegar repositório padrão do TypeORM
    const userRepo = getRepository(User);

    const appointmentDate = startOfHour(date);

    const thereAreAppointmentsInSameDate =
      (await appointmentRepo.findByDate(appointmentDate)) !== null;

    if (thereAreAppointmentsInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const providerFound = await userRepo.findOne(providerId);

    if (!providerFound) {
      throw new AppError('No provider found for this providerId');
    }

    // o create apenas cria a instancia mas não salva no banco de dados
    const appointment = appointmentRepo.create({
      providerId,
      date: appointmentDate,
    });

    await appointmentRepo.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentsService;

import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import { getCustomRepository } from 'typeorm';

interface RequestDTO {
  provider: string;
  date: Date;
}

// Single Responsability Principle: classe responsável somente por criar agendamentos (Solid)
class CreateAppointmentsService {
  public async run({ date, provider }: RequestDTO): Promise<Appointment> {
    const repository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const thereAreAppointmentsInSameDate =
      repository.findByDate(appointmentDate) !== null;

    if (thereAreAppointmentsInSameDate) {
      throw Error("This appointment is already booked");
    }

    // o create apenas cria a instancia mas não salva no banco de dados
    const appointment = repository.create({
      provider,
      date: appointmentDate
    });

    await repository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentsService;

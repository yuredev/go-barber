import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

// Single Responsability Principle: classe responsável somente por criar agendamentos (Solid)
class CreateAppointmentService {
  private repository: AppointmentRepository;
  // Dependency Inversion Principle (soliD)
  constructor(appointmentsRepository: AppointmentRepository) {
    this.repository = appointmentsRepository;
  }
  public run({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const thereAreAppointmentsInSameDate =
      this.repository.findByDate(appointmentDate) !== null;

    if (thereAreAppointmentsInSameDate) {
      throw Error("This appointment is already booked");
    }

    const appointment = this.repository.create({
      provider,
      date: appointmentDate
    });

    return appointment;
  }
}

export default CreateAppointmentService;

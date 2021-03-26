import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private repository: AppointmentRepository;
  constructor() {
    this.repository = new AppointmentRepository();
  }
  public run({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const thereAreAppointmentsInSameDate =
      this.repository.findByDate(date) !== null;

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

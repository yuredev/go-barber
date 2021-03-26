import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
};

class AppointmentRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findAll(): Appointment[] {
    return [ ...this.appointments ];
  }

  public findByDate(date: Date): Appointment | null {
    const appointmentFound = this.appointments.find(appoint =>
      isEqual(date, appoint.date)
    );
    return appointmentFound || null;
  }

  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const newAppointment = new Appointment({
      provider,
      date
    });
    this.appointments.push(newAppointment);
    return newAppointment;
  }
}

export default AppointmentRepository;

import { Router } from "express";
import { uuid } from "uuidv4";
import Appointment from "../models/Appointment";
import { startOfHour, parseISO, isEqual } from "date-fns";

const appointmentsRouter = Router();
const appointments: Appointment[] = [];

appointmentsRouter.get("/", (req, res) => {
  return res.json({});
});

appointmentsRouter.post("/", (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));
  const thereAreAppointmentsInSameDate = appointments.find(({ date }) =>
    isEqual(parsedDate, date),
  );

  if (thereAreAppointmentsInSameDate) {
    return res.status(400).json({
      message: "This appointment is already booked",
    });
  }

  const appointment = new Appointment(parsedDate, provider, uuid());
  appointments.push(appointment);

  return res.status(201).json(appointment);
});

export { appointmentsRouter };

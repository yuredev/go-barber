import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";
import AppointmentRepository from "../repositories/AppointmentRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();
const repository = new AppointmentRepository();
const createAppointmentService = new CreateAppointmentService();

appointmentsRouter.get("/", (req, res) => {
  const appointments = repository.findAll();
  return res.json(appointments);
});

appointmentsRouter.post("/", (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  try {
    const appointmentCreated = createAppointmentService.run({ provider, date });
    return res.status(201).json(appointmentCreated);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export { appointmentsRouter };

import { parseISO } from 'date-fns';
import { Router } from 'express';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const repository = new AppointmentRepository();
const createAppointmentService = new CreateAppointmentService(repository);

appointmentsRouter.get('/', (req, res) => {
  const appointments = repository.findAll();
  return res.json(appointments);
});

appointmentsRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;
    const parsedDate = parseISO(date);
    const appointmentCreated = createAppointmentService.run({
      provider,
      date: parsedDate,
    });
    return res.status(201).json(appointmentCreated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

export { appointmentsRouter };

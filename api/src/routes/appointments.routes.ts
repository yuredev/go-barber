import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentRepository);
  // busca todos os dados
  const appointments = await repository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  const { providerId, date } = req.body;
  const createAppointmentService = new CreateAppointmentService();
  const parsedDate = parseISO(date);
  const appointmentCreated = await createAppointmentService.run({
    providerId,
    date: parsedDate,
  });
  return res.status(201).json(appointmentCreated);
});

export default appointmentsRouter;

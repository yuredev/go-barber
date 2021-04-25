import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const repository = getCustomRepository(AppointmentRepository);
  // busca todos os dados
  const appointments = await repository.find();
  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { providerId, date } = req.body;
    const createAppointmentService = new CreateAppointmentService();
    const parsedDate = parseISO(date);
    const appointmentCreated = await createAppointmentService.run({
      providerId,
      date: parsedDate,
    });
    return res.status(201).json(appointmentCreated);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: error.message });
  }
});

export default appointmentsRouter;

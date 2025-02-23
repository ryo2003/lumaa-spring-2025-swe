// backend/src/routes/tasks.routes.ts
import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.controller';
import { verifyToken } from '../middleware/authMiddleware';

const router = Router();

// Protect all task routes
router.use(verifyToken);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;

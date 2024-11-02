import express from 'express';
import {
  getAllHouses,
  createHouse,
  updateHouse,
  approveHouse,
  rejectHouse,
  deleteHouse
} from '../controlers/houseController.js';

const router = express.Router();

router.get('/houses', getAllHouses);
router.post('/houses', createHouse);
router.put('/houses/:id', updateHouse);
router.patch('/houses/:id/approve', approveHouse);
router.patch('/houses/:id/reject', rejectHouse);
router.delete('/houses/:id', deleteHouse);

export default router;

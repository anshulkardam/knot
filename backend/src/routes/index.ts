import { Router } from 'express';

const router: Router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    message: 'API is live',
    status: 'ok',
    version: '1.0.0',
    docs: '',
    timestamp: new Date().toISOString(),
  });
});

export default router;

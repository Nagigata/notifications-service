import { Router } from 'express';
import * as notifications from './controllers/notificationsController.js';
import * as preferences from './controllers/preferencesController.js';

export function createRoutes() {
	const router = Router();

	router.get('/health', (_req, res) => {
		res.json({ status: 'ok' });
	});

	router.get('/notifications', notifications.list);
	router.patch('/notifications/:id/read', notifications.markRead);
	router.patch('/notifications/read-all', notifications.markAll);

	router.get('/preferences', preferences.get);
	router.put('/preferences', preferences.put);

	return router;
}

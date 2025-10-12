import { createApp } from './app.js';
import { env, assertEnv } from './shared/env.js';
import { logger } from './shared/logger.js';

async function bootstrap() {
	try {
		assertEnv();
		const app = createApp();
		const server = app.listen(env.port, () => {
			logger.info({ port: env.port }, 'Notifications service listening');
		});

		// Start Kafka consumer in background
		import('./kafka/consumer.js').then(({ startConsumer }) => startConsumer().catch(err => {
			logger.error({ err }, 'Kafka consumer failed to start');
		}));

		process.on('SIGINT', () => {
			server.close(() => process.exit(0));
		});
	} catch (err) {
		logger.error({ err }, 'Failed to bootstrap');
		process.exit(1);
	}
}

bootstrap();

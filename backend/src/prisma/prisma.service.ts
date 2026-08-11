import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit {
	// Minimal shape to satisfy services during development
	user: any = {} as any;
	task: any = {} as any;

	async $connect(): Promise<void> {
		// no-op for environments without a Prisma client
		return Promise.resolve();
	}

	async onModuleInit() {
		await this.$connect();
	}
}

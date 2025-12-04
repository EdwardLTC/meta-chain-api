"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app/app.module");
const common_1 = require("@nestjs/common");
const environment_service_1 = require("./environment/environment.service");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    BigInt.prototype.toJSON = function () {
        return this.toString();
    };
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const env = app.get(environment_service_1.EnvironmentService);
    app.enableCors({
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: errors => {
            return new common_1.BadRequestException('validation.fail', {
                cause: errors.map(error => ({ property: error.property, constraints: error.constraints })),
            });
        },
    }));
    const documentBuilder = new swagger_1.DocumentBuilder().setTitle(`Meta Chain API - ${env.environment}`).addBearerAuth();
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuilder.build());
    swagger_1.SwaggerModule.setup('docs', app, document);
    logger.debug(`Documentation: http://localhost:${env.port}/docs`);
    await app.listen(env.port);
    logger.debug(`Application is running on: ${await app.getUrl()} - ${env.environment}`);
}
void bootstrap();
//# sourceMappingURL=main.js.map
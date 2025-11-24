"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let ExceptionsFilter = ExceptionsFilter_1 = class ExceptionsFilter {
    logger = new common_1.Logger(ExceptionsFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const req = ctx.getRequest();
        let responseBody = {
            statusCode: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date(),
            message: 'Something went wrong',
            cause: null,
        };
        if (exception instanceof common_1.HttpException) {
            responseBody = {
                statusCode: exception.getStatus(),
                timestamp: new Date(),
                message: exception.getStatus() == common_1.HttpStatus.INTERNAL_SERVER_ERROR ? 'Something went wrong' : exception.getResponse()['message'],
                cause: exception?.cause || null,
            };
        }
        this.logger.error(`[${req.method}] ${req.path} [Error] >> Message:: ${exception.toString()}`, exception.stack);
        response.status(responseBody.statusCode).json(responseBody);
    }
};
exports.ExceptionsFilter = ExceptionsFilter;
exports.ExceptionsFilter = ExceptionsFilter = ExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], ExceptionsFilter);
//# sourceMappingURL=exceptions.filter.js.map
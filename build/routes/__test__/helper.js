"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.config = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const file_route_1 = require("../file-route");
// Fill in this config with all the configurations
// needed for testing the application
function config() {
    return __awaiter(this, void 0, void 0, function* () {
        return {};
    });
}
exports.config = config;
// Automatically build and tear down our instance
function build() {
    const app = (0, fastify_1.default)();
    // fastify-plugin ensures that all decorators
    // are exposed for testing purposes, this is
    // different from the production setup
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        void app.register((0, fastify_plugin_1.default)(file_route_1.fileRoute), yield config());
        yield app.ready();
    }));
    afterAll(() => app.close());
    return app;
}
exports.build = build;

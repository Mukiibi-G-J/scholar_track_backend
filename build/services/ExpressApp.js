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
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes");
exports.default = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(express_1.default.json({ limit: "30mb" }));
    app.use(express_1.default.urlencoded({ extended: true }));
    // const imagePath = path.join(__dirname, '../images');
    app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
    app.use("/student", routes_1.StudentsRoutes);
    // app.use('/admin', AdminRoute);
    // app.use('/vandor', VandorRoute);
    // app.use('/customer', CustomerRoute);
    // app.use(ShoppingRoute);
});
//# sourceMappingURL=ExpressApp.js.map
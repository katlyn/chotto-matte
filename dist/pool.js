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
const rethinkdbdash_1 = __importDefault(require("rethinkdbdash"));
exports.r = rethinkdbdash_1.default({
    host: 'localhost',
    db: 'chotto_matte',
    optionalRun: false,
    cursor: false
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const dbList = yield exports.r.dbList().run();
    if (!dbList.includes('chotto_matte')) {
        yield exports.r.dbCreate('chotto_matte').run();
    }
    const tableList = yield exports.r.tableList().run();
    if (!tableList.includes('user_codes')) {
        yield exports.r.tableCreate('user_codes').run();
    }
}))()
    .catch(console.error);
//# sourceMappingURL=pool.js.map
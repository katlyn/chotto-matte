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
Object.defineProperty(exports, "__esModule", { value: true });
const pool_1 = require("../pool");
const strings_1 = require("../strings");
exports.get = (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = yield msg.channel.createMessage(strings_1.strings.getCode.pending);
    if (args.length === 0) {
        const userCode = yield pool_1.r.table('user_codes').get(msg.author.id).run();
        if (!userCode) {
            return reply.edit(strings_1.strings.getCode.personalNotFound);
        }
        else {
            return reply.edit(strings_1.strings.getCode.personal.replace('$c', userCode.code));
        }
    }
    else if (msg.mentions[0] && args[0].includes(msg.mentions[0].id)) {
        const userCode = yield pool_1.r.table('user_codes').get(msg.mentions[0].id).run();
        if (!userCode) {
            return reply.edit(strings_1.strings.getCode.notFound);
        }
        else {
            return reply.edit(strings_1.strings.getCode.user.replace('$c', userCode.code).replace('$m', msg.mentions[0].mention));
        }
    }
    else {
        return reply.edit(strings_1.strings.getCode.invalidArgs);
    }
});
exports.set = (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (!args[0]) {
        return msg.channel.createMessage(strings_1.strings.setCode.missingArgs);
    }
    else if (!Number(args[0])) {
        return msg.channel.createMessage(strings_1.strings.setCode.isNaN);
    }
    else if (args[0].length > 4) {
        return msg.channel.createMessage(strings_1.strings.setCode.incorrectFormat);
    }
    else {
        const reply = yield msg.channel.createMessage(strings_1.strings.setCode.storing);
        try {
            pool_1.r.table('user_codes').insert({
                id: msg.author.id,
                code: args[0]
            }, {
                conflict: 'update'
            }).run();
        }
        catch (err) {
            return reply.edit(strings_1.strings.setCode.error);
        }
        return reply.edit(strings_1.strings.setCode.success.replace('$c', args[0]));
    }
});
exports.list = (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
    const codes = yield pool_1.r.table('user_codes').run();
    const embeds = [''];
    for (let c in codes) {
        let line = `<@${codes[c].id}> - **\`${codes[c].code}\`**`;
        if (embeds[0].length + line.length > 2040) {
            embeds.unshift('');
        }
        embeds[0] += `\n${line}`;
    }
    for (let e in embeds) {
        yield msg.channel.createMessage({ embed: {
                description: embeds[e]
            } });
    }
});
exports.remove = (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
    const reply = yield msg.channel.createMessage(strings_1.strings.remove.pending);
    yield pool_1.r.table('user_codes').get(msg.author.id).delete().run();
    return reply.edit(strings_1.strings.remove.success);
});
exports.reset = (msg, args) => __awaiter(void 0, void 0, void 0, function* () {
    if (args[0] && args[0] === 'yes') {
        const reply = yield msg.channel.createMessage(strings_1.strings.reset.pending);
        yield pool_1.r.table('user_codes').delete().run();
        return reply.edit(strings_1.strings.reset.success);
    }
    else {
        return msg.channel.createMessage(strings_1.strings.reset.confirm);
    }
});
//# sourceMappingURL=codes.js.map
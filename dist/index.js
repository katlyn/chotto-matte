"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const eris_1 = require("eris");
const codes = __importStar(require("./plugins/codes"));
const strings_1 = require("./strings");
const config = require('../config.json');
if (!(config.token || config.token.length !== 0)) {
    throw new Error('No token specified!');
}
const bot = new eris_1.CommandClient(config.token, {
    defaultImageFormat: 'png'
}, {
    defaultHelpCommand: true,
    defaultCommandOptions: {
        permissionMessage: strings_1.strings.permissionDenied,
        caseInsensitive: true
    },
    description: strings_1.strings.descrition,
    prefix: '!',
    owner: 'theGordHoard#9607'
});
const codeCommand = bot.registerCommand('code', codes.get, {
    aliases: ['codes'],
    description: strings_1.strings.help.codes.quick,
    fullDescription: strings_1.strings.help.codes.full
});
codeCommand.registerSubcommand('set', codes.set, {
    description: strings_1.strings.help.set.quick,
    fullDescription: strings_1.strings.help.set.full
});
codeCommand.registerSubcommand('list', codes.list, {
    description: strings_1.strings.help.list.quick,
    fullDescription: strings_1.strings.help.list.full
});
codeCommand.registerSubcommand('remove', codes.remove, {
    description: strings_1.strings.help.remove.quick,
    fullDescription: strings_1.strings.help.remove.full
});
codeCommand.registerSubcommand('reset', codes.reset, {
    requirements: {
        roleIDs: config.adminRoles
    },
    description: strings_1.strings.help.reset.quick,
    fullDescription: strings_1.strings.help.reset.full
});
bot.on('ready', () => {
    console.log(`Ready! Connected to Discord as ${bot.user.username}#${bot.user.discriminator}.`);
});
bot.connect()
    .catch(console.error);
//# sourceMappingURL=index.js.map
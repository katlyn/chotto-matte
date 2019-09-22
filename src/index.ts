import 'source-map-support/register'

import { CommandClient, Message } from 'eris'

import * as codes from './plugins/codes'
import { strings } from './strings'

const config = require('../config.json')

if (!(config.token || config.token.length !== 0)) {
  throw new Error('No token specified!')
}

const bot = new CommandClient(config.token, {
  defaultImageFormat: 'png'
}, {
  defaultHelpCommand: true,
  defaultCommandOptions: {
    permissionMessage: strings.permissionDenied,
    caseInsensitive: true
  },
  description: strings.descrition,
  prefix: '!',
  owner: 'theGordHoard#9607'
})

const codeCommand = bot.registerCommand('code', codes.get, {
  aliases: [ 'codes' ],
  description: strings.help.codes.quick,
  fullDescription: strings.help.codes.full
})
codeCommand.registerSubcommand('set', codes.set, {
  description: strings.help.set.quick,
  fullDescription: strings.help.set.full
})
codeCommand.registerSubcommand('list', codes.list, {
  description: strings.help.list.quick,
  fullDescription: strings.help.list.full
})
codeCommand.registerSubcommand('remove', codes.remove, {
  description: strings.help.remove.quick,
  fullDescription: strings.help.remove.full
})
codeCommand.registerSubcommand('reset', codes.reset, {
  requirements: {
    roleIDs: config.adminRoles
  },
  description: strings.help.reset.quick,
  fullDescription: strings.help.reset.full
})

bot.on('ready', () => {
  console.log(`Ready! Connected to Discord as ${bot.user.username}#${bot.user.discriminator}.`)
})

bot.connect()
  .catch(console.error)

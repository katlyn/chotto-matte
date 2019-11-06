import 'source-map-support/register'

import { CommandClient, Message } from 'eris'

import * as codes from './plugins/codes'
import { strings } from './strings'

if (!(process.env.TOKEN || process.env.TOKEN.length !== 0)) {
  throw new Error('No token specified!')
}

const bot = new CommandClient(process.env.TOKEN, {
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
    roleIDs: process.env.ADMIN_ROLES.split(',')
  },
  description: strings.help.reset.quick,
  fullDescription: strings.help.reset.full
})
codeCommand.registerSubcommand('count', codes.count, {
  description: strings.help.count.quick,
  fullDescription: strings.help.count.full
})

codes.changefeed(bot)
  .catch(console.error)

bot.on('ready', () => {
  console.log(`Ready! Connected to Discord as ${bot.user.username}#${bot.user.discriminator}.`)
})

bot.connect()
  .catch(console.error)

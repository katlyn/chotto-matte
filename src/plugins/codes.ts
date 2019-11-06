import { Client, Message } from 'eris'
import { ArrayResult, CursorResult } from 'rethinkdb'
import { r, UserCodes as UserCode } from '../pool'
import { strings } from '../strings'

export const get = async (msg: Message, args: string[]) => {
  const reply = await msg.channel.createMessage(strings.getCode.pending)
  if (args.length === 0) {
    const userCode = await r.table<UserCode>('user_codes').get(msg.author.id).run()
    if (!userCode) {
      return reply.edit(strings.getCode.personalNotFound)
    } else {
      return reply.edit(strings.getCode.personal.replace('$c', userCode.code))
    }
  } else if (msg.mentions[0] && args[0].includes(msg.mentions[0].id)) {
    const userCode = await r.table<UserCode>('user_codes').get(msg.mentions[0].id).run()
    if (!userCode) {
      return reply.edit(strings.getCode.notFound)
    } else {
      return reply.edit(strings.getCode.user.replace('$c', userCode.code).replace('$m', msg.mentions[0].mention))
    }
  } else {
    return reply.edit(strings.getCode.invalidArgs)
  }
}

export const set = async (msg: Message, args: string[]) => {
  if (!args[0]) {
    return msg.channel.createMessage(strings.setCode.missingArgs)
  } else if (!Number(args[0])) {
    return msg.channel.createMessage(strings.setCode.isNaN)
  } else if (args[0].length > 10) {
    return msg.channel.createMessage(strings.setCode.incorrectFormat)
  } else {
    // const reply = await msg.channel.createMessage(strings.setCode.storing)
    try {
      r.table('user_codes').insert({
        id: msg.author.id,
        code: args[0]
      }, {
        conflict: 'update'
      }).run()
    } catch (err) {
      return msg.channel.createMessage(strings.setCode.error)
    }
    // return reply.edit(strings.setCode.success.replace('$c', args[0]))
    await msg.addReaction(':hahaa:503098345116532741')
  }
}

export const list = async (msg: Message, args: string[]) => {
  const codes = await r.table('user_codes').run() as unknown as ArrayResult<UserCode>
  const embeds: string[] = ['']
  for (let c in codes) {
    let line = `<@${codes[c].id}> - **\`${codes[c].code}\`**`
    if (embeds[0].length + line.length > 2040) {
      embeds.unshift('')
    }
    embeds[0] += `\n${line}`
  }
  for (let e in embeds) {
    await msg.channel.createMessage({ embed: {
      description: embeds[e]
    }})
  }
}

export const remove = async (msg: Message, args: string[]) => {
  const reply = await msg.channel.createMessage(strings.remove.pending)
  await r.table('user_codes').get(msg.author.id).delete().run()
  return reply.edit(strings.remove.success)
}

export const reset = async (msg: Message, args: string[]) => {
  if (msg.mentions.length > 0) {
    const reply = await msg.channel.createMessage(strings.reset.mentions.pending)
    const reset: string[] = []
    for (let m in msg.mentions) {
      await r.table('user_codes').get(msg.mentions[m].id).delete().run()
      reset.push(msg.mentions[m].mention)
    }
    return reply.edit(strings.reset.mentions.success.replace('$m', reset.join(', ')))
  } else if (args[0] && args[0] === 'yes') {
    const reply = await msg.channel.createMessage(strings.reset.pending)
    await r.table('user_codes').delete().run()
    return reply.edit(strings.reset.success)
  } else {
    return msg.channel.createMessage(strings.reset.confirm)
  }
}

export const count = async (msg: Message, args: string[]) => {
  const count = await r.table('user_codes').count().run()
  return msg.channel.createMessage(strings.count.msg.replace('$c', count.toString()))
}

export const changefeed = async (bot: Client) => {
  await r.table('user_codes').wait().run()
  r.table('user_codes').changes().run(((err: any, cursor: CursorResult<UserCode>) => {
    if (err) {
      console.error(err)
      return
    }
    cursor.on('data', async () => {
      const count = await r.table('user_codes').count().run()
      bot.editStatus('online', {
        name: `${count} codes!`
      })
    })
  }) as any)
  const count = await r.table('user_codes').count().run()
  bot.editStatus('online', {
    name: `${count} codes!`
  })
}

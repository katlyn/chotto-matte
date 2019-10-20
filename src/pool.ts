import rethinkDBDash from 'rethinkdbdash'

export interface UserCodes {
  /** User ID - matches Discord ID */
  id: string,
  /** User specified code */
  code: string
}

export const r = rethinkDBDash({
  host: '172.20.0.2',
  db: 'chotto_matte',
  optionalRun: false,
  cursor: false
})

;(async () => {
  const dbList = await r.dbList().run()
  if (!dbList.includes('chotto_matte')) {
    await r.dbCreate('chotto_matte').run()
  }
  const tableList = await r.tableList().run()
  if (!tableList.includes('user_codes')) {
    await r.tableCreate('user_codes').run()
  }
})()
  .catch(console.error)

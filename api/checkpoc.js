const debug = require('debug')('rsvpbot:api/checkpoc.js')

module.exports = async function (id) {
  let ifs = JSON.parse(process.env.IFS_INFO)
  for (let i in ifs) {
    let faction = ''
    if (ifs[i].enlpoc.indexOf(id) !== -1) {
      faction = 'ENL'
    } else if (ifs[i].respoc.indexOf(id) !== -1) {
      faction = 'RES'
    }
    if (faction !== '') return { faction, location: ifs[i].location}
  }
  throw `抱歉喵！，你没有权限使用本功能，请联系你所在阵营的 PoC 完成签到。希望你可以在武汉IFS 9.0玩得愉快！`
}

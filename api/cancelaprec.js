// Import Airtable API and config
const Airtable = require('airtable');

// Import RSVP base
const base = new Airtable({apiKey: process.env.AIRTABLE_TOKEN}).base(process.env.BASE_ID);

module.exports = async function (faction, location, operator) {
  // get agent record
  let agentsbase = await base(location).select({
    view: "Grid view",
    filterByFormula: `AND({阵营} = '${faction}', NOT({正在登记经验值} = ''), {操作人} = ${operator})`
  }).firstPage()
  agentsbase.forEach(record => {
    base(location).update(record.getId(), {
      "正在登记经验值": null,
      "操作人": null
    }, (err, record) => {
      if (err) throw err
    });
    return
  })
}

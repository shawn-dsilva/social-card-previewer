const got = require('got')
const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-title')(),
  require('metascraper-url')()
]);


exports.getSite = (req, res) => {
  const { target } = req.body;
  (async () => {
    const { body: html, url } = await got(`https://${target}`)
    const metadata = await metascraper({ html, url })
    console.log(metadata)
    return res.status(200).json(metadata);
  })()


};


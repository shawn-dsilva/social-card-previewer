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

const validateInput = (target) => {
  if(target.indexOf("http://") == 0 || target.indexOf("https://") == 0) {
    return target;
  } else {
    return "https://"+target;
  }

}

const truncate = (input) => {
  const MAX_LEN = 150
  if(input.length > MAX_LEN) {
    return `${input.substring(0, MAX_LEN)}...`;
  } else {
    return input;
  }
}

exports.getSite = (req, res) => {
  let { target } = req.body;

  // append https:// to url if not already present
  typeof(target) != undefined ? target = validateInput(target) : null;
  (async () => {
    const { body: html, url } = await got(`${target}`)
    const metadata = await metascraper({ html, url })
    console.log(metadata)

    // truncate description to 150 chars
    metadata.description = truncate(metadata.description);

    // remove http(s) or www from URL
    metadata.url = metadata.url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
    return res.status(200).json(metadata);
  })()


};


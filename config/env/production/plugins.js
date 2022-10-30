const parse = require("pg-connection-string").parse;
const config = parse(process.env.CLOUDINARY_URL);
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: "hfml52lvr",
        api_key: "171351988191182",
        api_secret: "iTqlUAPo3cbztZIzipDHXDfPjVE",
      },
    },
  },
});

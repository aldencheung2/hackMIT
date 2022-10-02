import axios from 'axios';

export default async function handler(req, res) {
    const url =
      "https://publish.twitter.com/oembed?url=https://twitter.com/TwitterDev";
    const result = await (await axios.get(url)).data;
    res.status(200).send(result.html);
}
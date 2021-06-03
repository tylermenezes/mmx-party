import fetch from 'node-fetch';

const dataUrl = `https://script.googleusercontent.com/macros/echo?user_content_key=${process.env.GOOGLE_ID}&lib=${process.env.GOOGLE_LIB}`;

export default async function (req, res) {
  if (req?.query?.key !== process.env.KEY) res.send({});

  res.send(await (await fetch(dataUrl)).json());
}

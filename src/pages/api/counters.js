import fetch from 'node-fetch';

const url = `https://script.googleusercontent.com/macros/echo?user_content_key=FFgCsZJ858W5UaO0ANui3LJMDl7ymgULAx6lObdYhMhLe8sftCTMW70XE1g8teyRd0f7jwN9IhEswA9qGhctWN-sE-7QbYC2m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPwaLjpaU3mXdFbkS9tSgg4yp-9Sr5STY72hKu3SZTqPVDw8xBRCRuT2JD68pOOJCbCCEwCpCe_eRLhqJoIzIdjDXtTNXRon3g&lib=M7k7YCsiYnPSuiymS3WfqVSZNcORKOCcz`;

export default async function (req, res) {
  res.send(await (await fetch(url)).json());
}

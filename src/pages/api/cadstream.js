import fetch from 'node-fetch';

const dataUrl = `https://script.googleusercontent.com/macros/echo?user_content_key=sBqtkR0-BQGrg9LfqXLhVZELEGf1gML9JOmSkNBXzwY52j7UFhUp-AIGIv4-Orxh6U2nSAUAaj_XGHNW6pGj_eMd0mfDBXT-m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFXq6L9c4Ruwh_bHFFy-RktrEkFKEVoNFRhuI73impi-D89C7XcYVd5klhiE_Wd-oOURet4dikZfDLxrYEkeUq5C57fyQzJaBNz9Jw9Md8uu&lib=MpUi4x5V94LmwibeEnd29Ph9CguL9NoTU`;

export default async function (req, res) {
  res.send(await (await fetch(dataUrl)).json());
}

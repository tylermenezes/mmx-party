import Airtable from 'airtable';

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_KEY });
const table = airtable.base(process.env.AIRTABLE_BASE)(process.env.AIRTABLE_TABLE)

async function fetchPages(request) {
	const result = [];

	await new Promise((resolve, reject) => {
		request.eachPage((records, nextPage) => {
			records.forEach((rec) => result.push(rec));
			nextPage();
		}, (err) => err ? reject(JSON.stringify(err)) : resolve());
	});

	return result;
}

export default async function (req, res) {
  const allEligibleFanart = await fetchPages(table.select({
    filterByFormula: `AND({Issue Category} = "${process.env.AIRTABLE_CATEGORY}", {# of bulbs} > 5, {Attachment Photo} > 0)`,
    fields: ['Posted By', 'Post Image(s)']
  }));

  const fanartImages = allEligibleFanart
    .map(({ fields }) => fields)
    .reduce((accum, obj) => [
      ...accum,
      ...obj['Post Image(s)'].map(({ url, thumbnails, type }) => ({
        type,
        credit: obj['Posted By'],
        images: {
          full: url,
          preview: thumbnails?.large?.url || url,
        }
      })),
    ], [])
    .filter(({ type }) => ['image/png', 'image/jpeg', 'image/jpg'].includes(type))
    .map(({ credit, images }) => ({ credit, images }));

  res.send(fanartImages);
}

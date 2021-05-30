export default function (req, res) {
  res.send({
    washers: Math.floor(Math.random() * 1000),
    wilsons: Math.floor(Math.random() * 100),
    marbles: Math.floor(Math.random() * 10000),
  });
}

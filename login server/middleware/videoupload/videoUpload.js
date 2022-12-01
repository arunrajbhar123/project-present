const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dmv7inc9a",
  api_key: "383384771635858",
  api_secret: "mehcuApuI2G0GMk6OZILru6rK3o",
});
const videoUpload =  (req, res, next) => {
  const data = req.body;

  //    video: {
  // name: '2.mp4',
  // size: 18513813,
  // type: 'video/mp4',
  // lastModified: 1626568446000

  //   cloudinary.v2.uploader
  //     .upload(data.img.name)
  //     .then((result) => console.log(result));
  const dsa =  cloudinary.v2.uploader.upload(
    data.img.name,

    function (error, result) {
      console.log(result, error);
      res.send({ error, result });
    }
  );
};

module.exports = videoUpload;

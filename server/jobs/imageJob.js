const imageJob = async (data) => {
  console.log("🖼️ Processing image:", data.image);

  await new Promise((res) => setTimeout(res, 3000));

  return "Image processed";
};

module.exports = imageJob;
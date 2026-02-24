const emailJob = async (data) => {
  console.log("📧 Sending email to:", data.to);

  await new Promise((res) => setTimeout(res, 2000));

  return "Email sent successfully";
};

module.exports = emailJob;
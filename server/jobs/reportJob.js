const reportJob = async (data) => {
  console.log("📊 Generating report for:", data.user);

  await new Promise((res) => setTimeout(res, 4000));

  return "Report generated";
};

module.exports = reportJob;
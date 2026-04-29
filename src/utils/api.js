/* eslint-disable no-unused-vars */
export const sendToSheet = async (data) => {
  try {
    await fetch("https://script.google.com/macros/s/AKfycbxktbDg_Vqa0QePcMURNPZJgnMFdAs_VwdU6hwQPWZqpH5y0bnH0nlbLYEU45IMejxqPA/exec", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.log("Sheet sync failed");
  }
};
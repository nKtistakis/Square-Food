import fetch from "node-fetch";
import { Headers } from "node-fetch";

export default async function convertCurrency(to, from, amount) {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "ZaHPXiQQCuSc8iGGG5lmn2ITeHwwIeXo");

  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions,
      { method: "GET" }
    );

    return response.json();
  } catch (e) {
    return "Error with fixerAPi: " + e;
  }
}

import { dataPayment } from "../interface/paymentGatewayInterface"

export const fetchResponse = async (dataPayment: dataPayment) => {
  return await fetch("http://localhost:3000/pay", {
    method: "POST",
    body: JSON.stringify(dataPayment),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json())
}

var receiver = null;

export function setReceiver(callback) {
  console.log("setting receiver", callback)
  receiver = callback
}
export async function sendRequest(transaction) {
  console.log("SENDING ???", transaction)
  console.log("SENDING ---", receiver)
  if (receiver !== null) {
    console.log("SENDING !!!")
    await receiver(transaction)
  }
}


export default async function cancelMultipleBookings(req, res){
  const urls = req.body.bookings;
  console.log("URLS:");
  console.log(urls);
  try {
    for (let i in urls) {
      const options = {
        method: "POST",
        url: `${urls[i]}/cancellation`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CALENDLY_API_KEY}`,
        },
        data: { reason: "The reservation has not been paid." },
      };
      console.log("Option:");
      console.log(options);
      const response = await axios.request(options);
    }
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
}

import nodemailer from 'nodemailer'
export default async (req, res) => {

  const data = JSON.parse(req.body)

  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.user,
      pass: process.env.pass,
    },
  })

  try {
    const emailRes = await transporter.sendMail({
      from: process.env.user,
      to: 'mailsavlex@gmail.com',
      subject: `Отзыв от пользователя`,
      html: `<p>Нужна модерация <a href="${process.env.API_URL}review/${data.id}">отзыва!</p>`,
    })

    console.log('Message Sent')
  } catch (err) {
    console.log(err)
  }

  res.status(200).json(req.body)
}

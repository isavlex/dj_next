import dbConnect from '../../../utils/dbConnect'
import Image from '../../../models/Image'

dbConnect()

export default async (req, res) => {
  const {method} = req

  switch (method) {
    case 'GET':
      try {
        const images = await Image.find({})

        res.status(200).json({success: true, data: images})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    case 'POST':
      try {
        const image = await Image.create(req.body)
        res.status(201).json({success: true, data: image})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    default:
      res.status(400).json({success: false})
      break
  }
}

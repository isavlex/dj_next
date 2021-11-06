import dbConnect from '../../../utils/dbConnect'
import Image from '../../../models/Image'

dbConnect()

export default async (req, res) => {
  const {
    query: {id},
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const image = await Image.findById(id)

        if (!image) {
          return res.status(400).json({success: false})
        }

        res.status(200).json({success: true, data: image})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    case 'PUT':
      try {
        const image = await Image.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })

        if (!image) {
          return res.status(400).json({success: false})
        }

        res.status(200).json({success: true, data: image})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    case 'DELETE':
      try {
        const deletedImage = await Image.deleteOne({_id: id})

        if (!deletedImage) {
          return res.status(400).json({success: false})
        }

        res.status(200).json({success: true, data: {}})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    default:
      res.status(400).json({success: false})
      break
  }
}

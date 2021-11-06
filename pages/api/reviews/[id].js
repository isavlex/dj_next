import dbConnect from '../../../utils/dbConnect'
import Review from '../../../models/Review'
import {verifyIdToken} from '../../../firebaseAdmin'

dbConnect()

export default async (req, res) => {
  const {
    query: {id},
    method,
  } = req
 
  switch (method) {
    case 'GET':
      try {
        const review = await Review.findById(id)

        if (!review) {
          return res.status(400).json({success: false})
        }

        res.status(200).json({success: true, data: review})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break
    case 'PUT':
      try {
        const review = await Review.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })

        if (!review) {
          return res.status(400).json({success: false})
        }

        res.status(200).json({success: true, data: review})
      } catch (error) {
        res.status(400).json({success: false})
      }

      break
    case 'DELETE':
      try {
        const deletedReview = await Review.deleteOne({_id: id})

        if (!deletedReview) {
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

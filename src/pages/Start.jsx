import { Link } from 'react-router-dom'
import { motion } from "motion/react"
import bgImage from '../assets/background.png'
import titleImage from '../assets/title.png'

export default function Start() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}>

      <div className="relative overflow-hidden w-full flex justify-center">
        <motion.img
          src={titleImage}
          className="cursor-pointer"
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
        />
      </div>
          
      <div className="flex flex-col gap-4 w-60 mb-30">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }} className="overflow-hidden rounded-lg">
          <Link
            to="/home"
            className="block bg-yellow border-4 border-royal-blue font-press-start text-dark-gray text-center py-4 px-6 rounded-lg shadow"
          >
            PLAY
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="overflow-hidden rounded-lg">
          <Link
            to="/home/stats"
            className="block bg-powder-blue border-4 border-royal-blue font-press-start text-dark-gray text-center py-4 px-6 rounded-lg shadow"
          >
            STATS
          </Link>
        </motion.div>
      </div>

    </div>
  )
}
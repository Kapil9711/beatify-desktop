import backgroundImage from '../assets/3d-background.jpg'

// *****************icons**************
import eyeBold from '@iconify-icons/solar/eye-bold'
import eyeClosed from '@iconify-icons/solar/eye-closed-linear'
import googleIcon from '@iconify-icons/flat-color-icons/google'
import { MdOutlineLightMode, MdDarkMode } from 'react-icons/md'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoIosNotifications } from 'react-icons/io'

export const images = { backgroundImage }
export const icons = {
  eyeBold,
  eyeClosed,
  googleIcon,
  LightMode: MdOutlineLightMode,
  DarkMode: MdDarkMode,
  UserIcon: FaRegUserCircle,
  Notification: IoIosNotifications
}

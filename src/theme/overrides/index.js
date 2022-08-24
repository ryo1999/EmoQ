import Chip from "./Chip"
import Typography from './Typography'

export default function ComponentsOverrides(theme) {
   return Object.assign(
      Typography(theme),
      Chip(theme),
   )
}

import React from "react"
import Appbar from "@/components/molecules/appbar"
import { Box } from "@mui/material"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Toolbar from '@mui/material/Toolbar';
import IconButton from "@mui/material/IconButton"
import StarIcon from "@mui/icons-material/Star"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import CommentIcon from "@mui/icons-material/Comment"

export default function Home() {
  const [starColor, setStarColor] = React.useState(false)
  return (
    <>
      <Appbar />
      <Toolbar/>
      <Box component="div" sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
          <Card sx={{ width: "100%", maxWidth: "800px", mt:"10px" }}>
            <CardContent>
              
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="body2">well meaning and kindly.</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "right" }}>
              <IconButton sx={{fontSize:"15px"}}>
                <CommentIcon sx={{ color: "blue" }} />
                {4}
              </IconButton>
              <IconButton onClick={() => setStarColor(!starColor)}>
                {starColor ? <StarIcon sx={{ color: "blue" }} /> : <StarOutlineIcon sx={{ color: "blue" }} />}
              </IconButton>
            </CardActions>
          </Card>

          <Card sx={{ width: "100%", maxWidth: "800px", mt:"10px" }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="body2">well meaning and kindly.</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "right" }}>
              <IconButton sx={{fontSize:"15px"}}>
                <CommentIcon sx={{ color: "blue" }} />
                {4}
              </IconButton>
              <IconButton onClick={() => setStarColor(!starColor)}>
                {starColor ? <StarIcon sx={{ color: "blue" }} /> : <StarOutlineIcon sx={{ color: "blue" }} />}
              </IconButton>
            </CardActions>
          </Card>
      </Box>
    </>
  )
}

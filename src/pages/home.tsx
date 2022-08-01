import React from "react"
import Appbar from "@/components/molecules/appbar"
import Button from "@mui/material/Button"
import { Box } from "@mui/material"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import StarIcon from "@mui/icons-material/Star"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import CommentIcon from "@mui/icons-material/Comment"

export default function Home() {
  const [starColor, setStarColor] = React.useState(false)
  return (
    <>
      <Appbar />
      <Box component="div" sx={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
          <Card sx={{ width: "100%", maxWidth: "800px", mt:"10px" }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant="body2">well meaning and kindly.</Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "right" }}>
              <Button>
                <CommentIcon sx={{ color: "blue" }} />
                {4}
              </Button>
              <Button onClick={() => setStarColor(!starColor)}>
                {starColor ? <StarIcon sx={{ color: "blue" }} /> : <StarOutlineIcon sx={{ color: "blue" }} />}
              </Button>
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
              <Button>
                <CommentIcon sx={{ color: "blue" }} />
                {4}
              </Button>
              <Button onClick={() => setStarColor(!starColor)}>
                {starColor ? <StarIcon sx={{ color: "blue" }} /> : <StarOutlineIcon sx={{ color: "blue" }} />}
              </Button>
            </CardActions>
          </Card>
      </Box>
    </>
  )
}

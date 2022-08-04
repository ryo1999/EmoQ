import React from "react"
import Appbar from "@/components/molecules/appbar"
import { Box } from "@mui/material"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Typography from "@mui/material/Typography"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Avatar from "@mui/material/Avatar"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import CommentIcon from "@mui/icons-material/Comment"

export default function Home() {
  const [bookMark, setBookMark] = React.useState(false)
  return (
    <>
      <Appbar />
      <Toolbar />
      <Box component="div" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Card sx={{ width: "100%", maxWidth: "800px", mt: "10px" }}>
          <CardHeader avatar={<Avatar />} title={"大月凌"} subheader={"2022-7-28"} />
          <CardContent>
            <Typography variant="body2">
              well meaning and kindlywell meaning and kindlywell meaning and kindlywell meaning and kindlywell meaning
              and kindlywell meaning and kindlywell meaning and kindlywell meaning and kindly
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "right" }}>
            <IconButton onClick={() => setBookMark(!bookMark)}>
              {bookMark ? <BookmarkIcon sx={{ color: "blue" }} /> : <BookmarkBorderIcon sx={{ color: "blue" }} />}
            </IconButton>
            <IconButton sx={{ fontSize: "15px" }}>
              <CommentIcon sx={{ color: "blue" }} />
              {4}
            </IconButton>
          </CardActions>
        </Card>

        <Card sx={{ width: "100%", maxWidth: "800px", mt: "10px" }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant="body2">well meaning and kindly.</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "right" }}>
            <IconButton onClick={() => setBookMark(!bookMark)}>
              {bookMark ? <BookmarkIcon sx={{ color: "blue" }} /> : <BookmarkBorderIcon sx={{ color: "blue" }} />}
            </IconButton>
            <IconButton sx={{ fontSize: "15px" }}>
              <CommentIcon sx={{ color: "blue" }} />
              {4}
            </IconButton>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

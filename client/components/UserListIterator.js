import React from 'react'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
const UserListIterator = ({user}) => {
  const theme = useTheme();
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex' , alignItems:"center" }}>
      {
        user[1]&&(
          <CardContent  >
            {user[0]}
          </CardContent>
        )
      }
      {
        user[1]&&(
          <CardContent >
            <Button variant='contained' sx={{backgroundColor:"red"}} >Remove</Button>
          </CardContent>
        )
      }
        
        
      </Box>
      
    </Card>
  )
}

export default UserListIterator
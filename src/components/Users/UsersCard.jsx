import React from "react";
import { Card, CardHeader, Avatar, Grid, CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const UsersCard = ({ user }) => {
  const firstLetterOfName = user.Name[0].toUpperCase();
  const navigate = useNavigate();
  const handleClick = e => {
    navigate(`/user/${user.Id}`);
  };

  return (
    <Grid item xs={6} md={4}>
      <Card onClick={handleClick}>
        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: user.color }}
                aria-label="recipe"
                src={user.Image}
              >
                {!user.Image && firstLetterOfName}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={user.Name}
            subheader="September 14, 2016"
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default UsersCard;

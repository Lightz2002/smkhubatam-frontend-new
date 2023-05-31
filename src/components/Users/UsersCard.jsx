import React from "react";
import { Card, CardHeader, Avatar, Grid, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UsersCard = ({ user }) => {
  const firstLetterOfName = user.Name[0].toUpperCase();
  const navigate = useNavigate();
  const handleClick = e => {
    navigate(`/user/${user.Id}`);
  };

  return (
    <Grid item xs={6} md={3} style={{ pl: 0, px: 0 }}>
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
            title={`${user.Name} - ${user.Username}`}
            subheader={user?.Role?.Name}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default UsersCard;

import React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled(props => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const UsersCard = ({ user }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const firstLetterOfName = user.Name[0].toUpperCase();

  return (
    <Grid item xs={4}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: user.color }} aria-label="recipe">
              {firstLetterOfName}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={user.Name}
          subheader="September 14, 2016"
        />
        {/* <CardContent>
          <Box>
            <Typography variant="body2" color="text.primary" fontWeight="bold">
              PT. WEEFER
            </Typography>
            <Typography variant="body2" color="primary.light">
              Location
            </Typography>
          </Box>
          <Box>
            <Typography></Typography>
          </Box>
        </CardContent> */}
        {/* <CardActions disableSpacing>
          <Typography variant="body2" color="text.primary">
            Show More
          </Typography>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    </Grid>
  );
};

export default UsersCard;

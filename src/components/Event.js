import { Container, Card, CardContent, CardMedia, useTheme, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import {useRouter} from 'next/router';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '800px',
  },
  cardContent: {
    padding: "2px 16px"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const Event = (props) => {
  const router = useRouter();

  const {
    name, description, owner, location, duration, status, time, window, rsvps, _id
  } = props;
  console.log(props);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
      <Card color="primary" className={classes.card}>
        <CardMedia
          image="https://www.colesclassroom.com/wp-content/uploads/2020/03/white-and-red-cherry-blossom-flowers-3979186.jpg"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h6">{name}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="share">
            <ShareIcon onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/invite-page/${_id}`)}}/>
          </IconButton>
          <IconButton aria-label="edit" onClick={()=>{router.push(`/event/${_id}`)}}>
            <EditIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <Typography variant="body1" component="p">
              {description}
              {owner}
            </Typography>
          </CardContent>
        </Collapse>
      </Card >
  )
}

export default Event;




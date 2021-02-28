import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { styles } from "./materialUi";
import { AiTwotoneEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";

class Cardcomp extends Component {
  state = {
    
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className="bg-modal" variant="outlined">
        <CardMedia
          className={classes.media}
          image={this.props.foto}
          title="Paella dish"

        />
        <CardActions>
          <IconButton className="heart" color="inherit" onClick={this.props.delete}>
            <BiTrash />
          </IconButton>
          <IconButton className="share" color="inherit" onClick={this.props.edit}>
            <AiTwotoneEdit />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography variant="body2"  component="p">
            {this.props.caption}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Cardcomp);
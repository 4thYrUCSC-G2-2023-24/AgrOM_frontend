import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import './../../assets/styles/guide.css';

export const GuideCard = (props)=>{

    const card = props;
    
    console.log(card)

    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ maxWidth: 345 }} >
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="140"
              image={card.props.image}
              alt={card.props.title}
            />
            <CardContent>
              <Typography gutterBottom component="div" variant="h5">
                {card.props.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {card.props.subtitle}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
}
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

export const GuideCard = (props)=>{

    const card = props;
    
    console.log(card)

    return (
        <Card style={{ display: 'flex', marginBottom: '10px', borderRadius: '20px', backgroundColor: '#ffffff', 
                        textAlign:"left" ,height: '220px' }}>
                    <CardMedia
                      component="img"
                      style={{ width: '25%', height: '200px', padding: '10px', borderRadius: '30px' }} // Image takes up 25% (one quarter) of the card
                      image={card.props.image}
                      alt={card.props.title}
                    />
                    <CardContent style={{ flex: '1' }}>
                      <Typography component="div" variant="h5">
                        {card.props.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {card.props.subtitle}
                      </Typography>
                    </CardContent>
                  </Card>
    );
}
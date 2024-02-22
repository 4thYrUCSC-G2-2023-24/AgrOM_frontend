import { Card, CardActionArea, CardContent, CardMedia, Grid, Modal, Typography } from "@material-ui/core";
import './../../assets/styles/guide.css';
import { useState } from "react";

export const GuideCard = (props) => {

  const card = props;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = async (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = async () => {
    setSelectedImage(null);
  };

  return (
    <Grid item xs={12} sm={6} md={4} >
      <Card sx={{ maxWidth: 345 }} style={{ border: '1px solid #ccc', borderRadius: '15px' }} >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            width="140"
            image={card.props.image}
            onClick={e => handleImageClick(card.props.image)}
            alt={card.props.title}
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5" style={{ fontFamily: 'Poppins' }}>
              {card.props.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div" style={{ fontFamily: 'Poppins' }}>
              {card.props.subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Modal open={!!selectedImage} onClose={handleCloseModal}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img src={selectedImage} alt="Zoomed Image" style={{ maxWidth: '90%', maxHeight: '90%' }} onClick={handleCloseModal} />
        </div>
      </Modal>
    </Grid>
  );
}
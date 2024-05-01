import { Card, CardActionArea, CardContent, CardMedia, Grid, Modal, Typography } from "@material-ui/core";
import './../../assets/styles/guide.css';
import { useState } from "react";

export const GuideCard = (props) => {

  const card = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);


  const handleImageClick = async (imageUrl, description, title) => {
    setSelectedImage(imageUrl);
    setSelectedDescription(description);
    setSelectedTitle(title);
  };

  const handleCloseModal = async () => {
    setSelectedImage(null);
    setSelectedDescription(null);
    setSelectedTitle(null);
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
            onClick={e => handleImageClick(card.props.image, card.props.subtitle, card.props.title)}
            alt={card.props.title}
          />
          <CardContent>
            <Typography gutterBottom component="div" variant="h5" style={{ fontFamily: 'Poppins' }}>
              {card.props.title}
            </Typography>

          </CardContent>
        </CardActionArea>
      </Card>

      <Modal open={!!selectedImage} onClose={handleCloseModal}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <Card sx={{ width: 300 }} style={{ margin: 'auto' }}>
            <img src={selectedImage} alt="Zoomed Image" style={{ width: '300px', height: '300px' }} onClick={handleCloseModal} />
            <Typography gutterBottom component="div" variant="h5" style={{ fontFamily: 'Poppins', wordWrap: 'break-word', fontSize: '15px', marginLeft: '10px' }}>
              {selectedTitle}
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ wordWrap: 'break-word', maxWidth: '280px', margin: '0 auto' }}
            >
              {selectedDescription}
            </Typography>
          </Card>
        </div>
      </Modal>
    </Grid>
  );
}
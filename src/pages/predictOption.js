import { Button, Card, CardContent, CardMedia, Container, Typography } from "@material-ui/core";

import './../assets/styles/predictOption.css';
import image2 from "./../tomato-bg.JPG";


export const PredictOption = ({ onOptionChange }) => {

    const handleOnClick = async (value) => {
        onOptionChange(value);
    }

    return (
        <div className="layoutDiv">
            <Container>
                <div className="layoutTitle">
                    Choose your option
                </div>
                <div className="buttonBox">
                    <Button className='button' variant="outlined" onClick={e => handleOnClick(1)}
                        style={{ width: '40%', height: '40vh', padding: '5px', border: '3px solid green', borderRadius: '30px' }}>
                        <Typography variant="h6">
                            Predict using Leaf images
                        </Typography>
                    </Button>
                    <Button className='button' variant="outlined" onClick={e => handleOnClick(2)}
                        style={{ width: '40%', height: '40vh', border: '3px solid green', borderRadius: '30px' }}>
                        <Typography variant="h6"> Predict without images </Typography>
                    </Button>
                </div>
            </Container>
        </div>
    );
}
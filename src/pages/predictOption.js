import { Button, Card, CardContent, CardMedia, Container, Typography } from "@material-ui/core";

import './../assets/styles/predictOption.css';


export const PredictOption = ({predictOption, onOptionChange})=>{

    const handleOnClick = async (value) => {
        onOptionChange(value);
    }

    return (
        <div className="layoutDiv" style={{ height: '70vh', marginBottom:'60px', overflowY: 'hidden', width: '90%', textAlign:"center", backgroundColor:"white" }}>
              <Container>
                <div style={{margin: '10px', height: '5vh', padding: '10px', textAlign: 'left', fontFamily: 'georgia', fontSize: '25px'}}>
                    Choose your option
                </div>
                <div style={{height:'55vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Button defaultValue={1} value={1}
                        variant="outlined" onClick={e => handleOnClick(1)} 
                        style={{width: '90%', height: '30%', borderWidth: '10px', border: '3px solid green', borderRadius: '30px'}}>
                        <Typography variant="h6">
                        Predict using Leaf images
                        </Typography>
                    </Button>
                    <Button defaultValue={2} value={2} variant="outlined" onClick={e => handleOnClick(2)} 
                        style={{width: '90%', height: '30%', borderWidth: '10px', border: '3px solid green', borderRadius: '30px'}}>
                        <Typography variant="h6"> Predict without images </Typography>
                    </Button>
                </div>
              </Container>
            </div>
    );
}
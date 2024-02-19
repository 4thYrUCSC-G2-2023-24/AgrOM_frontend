import { Button, Card, CardContent, CardMedia, Container, Typography } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { useCallback } from "react";

import './../assets/styles/predictOption.css';


export const PredictOption = ({predictStep, onStepChange})=>{

    const handleOnClick = useCallback(value => {
        console.log("haiii");
        onStepChange(value);
        console.log(predictStep);
    }, [onStepChange, predictStep]);

    return (
        <div className="layoutDiv" style={{ height: '70vh', marginBottom:'60px', overflowY: 'hidden', width: '90%', textAlign:"center", backgroundColor:"white" }}>
              <Container>
                <div style={{height: '5vh', padding: '10px', textAlign: 'left', fontFamily: 'cambria', fontSize: '25px'}}>
                    Choose your option
                </div>
                <div style={{height:'55vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Button defaultValue={1} value={1}
                        variant="outlined" onClick={handleOnClick(1)} 
                        style={{width: '100%', height: '30%', borderWidth: '10px', border: '3px solid green', borderRadius: '30px'}}>
                        <Typography variant="h6">
                        Predict using Leaf images
                        </Typography>
                    </Button>
                    <Button defaultValue={2} value={2} variant="outlined" onClick={handleOnClick(2)} 
                        style={{width: '100%', height: '30%', borderWidth: '10px', border: '3px solid green', borderRadius: '30px'}}>
                        <Typography variant="h6"> Predict without images </Typography>
                    </Button>
                </div>
              </Container>
            </div>
    );
}
import { Button, Card, CardContent, CardMedia, Container, Typography } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";
import { useCallback } from "react";

import './../assets/styles/predictOption.css';


export const PredictOption = ({predictStep, onStepChange})=>{

    const handleOnClick = useCallback(e => {
        console.log("haiii");
        onStepChange(e.target.value);
        console.log(predictStep);
    }, [onStepChange, predictStep]);

    return (
        <div className="layoutDiv" style={{ height: '70vh', marginBottom:'60px', overflowY: 'hidden', width: '90%', textAlign:"center", backgroundColor:"white" }}>
              <Container>
                <div style={{height: '5vh', padding: '10px', textAlign: 'left', fontFamily: 'cambria', fontSize: '25px'}}>
                    Choose your option
                </div>
                <div style={{height:'55vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Button defaultValue={1} value={1}
                        variant="outlined" onClick={handleOnClick} 
                        style={{width: '30%', height: '50vh', borderWidth: '10px', border: '3px solid green', borderRadius: '30px'}}>
                        <Typography variant="h6">
                        Predict using Leaf images
                        </Typography>
                    </Button>
                    <Button defaultValue={2} value={2} variant="outlined" onClick={handleOnClick} 
                        style={{width: '30%', height: '50vh', borderWidth: '10px', border: '3px solid green', borderRadius: '30px'}}>
                        <Typography variant="h6"> Predict without images </Typography>
                    </Button>
                </div>
              </Container>
            </div>
    );
}
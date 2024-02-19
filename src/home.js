import { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Tabs, Tab } from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Paper, CardActionArea, CardMedia, Grid, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, CircularProgress } from "@material-ui/core";
import logo from "./logo.png";
import image from "./bg2.jpg";
import image2 from "./tomato-bg.JPG";
// import ooze from "./ooze.png";
// import halo from './halo.png';
// import cross from './cross_section.png'
// import rings from './rings.jpg'
// import stem_ring from './stem_rings.PNG'
// import lesion from './Lesion.PNG'
// import spot from './Spots.PNG'
// import fungus from './Fungus.png'
import { DropzoneArea } from 'material-ui-dropzone';
import { common } from '@material-ui/core/colors';
import Clear from '@material-ui/icons/Clear';
import Select from 'react-select';
import Box from '@material-ui/core/Box';

import {options, leaf_symptom_color_option, fruit_symptom_options, fruit_symptom_color_options, stem_symptom_options, stem_symptom_color_options, fungus_symptom_options, fungus_symptom_color_options, wilting_options, leaf_halo_options, leaf_halo_color_options, fruit_halo_options, fruit_halo_color_options, bad_odor_symptom_options, ooze_liquid_symptom_options, cross_section_of_stem_symptom_options, curling_symptom_options } from "./constants/symptomOptions";
import { Guide } from "./pages/guide";
import Questions from "./questions";

import { containerStyles, containerStyles2, labelStyles, buttonStyles } from "./assets/styles/home";
import { PredictOption } from "./pages/predictOption";
import HomePage from "./pages/homePage";


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(common.white),
    backgroundColor: common.white,
    '&:hover': {
      backgroundColor: '#ffffff7a',
    },
  },
}))(Button);

const axios = require("axios").default;

const useStyles = makeStyles((theme) => ({
  title:{
    fontFamily: "Montserrat"
  },
  grow: {
    flexGrow: 1,
  },
  clearButton: {
    width: "-webkit-fill-available",
    borderRadius: "15px",
    padding: "15px 22px",
    color: "#000000a6",
    fontSize: "20px",
    fontWeight: 900,
  },
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 300,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  gridContainer: {
    justifyContent: "center",
    padding: "4em 1em 0 1em",
  },
  mainContainer: {
    // backgroundImage: `url(${image})`,
    backgroundImage: `url(${image2})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: "100%",
    marginTop: "8px",
    fontFamily: "verdana"
  },
  imageCard: {
    margin: "auto",
    maxWidth: 400,
    height: 300,
    backgroundColor: '#008000',
    boxShadow: '0px 9px 70px 0px rgb(0 0 0 / 30%) !important',
    borderRadius: '15px',
  },
  imageCardEmpty: {
    height: 'auto',
  },
  noImage: {
    margin: "auto",
    width: 400,
    height: "400 !important",
  },
  input: {
    display: 'none',
  },
  uploadIcon: {
    background: 'white',
  },
  tableContainer: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none !important',
  },
  table: {
    backgroundColor: 'transparent !important',
  },
  tableHead: {
    backgroundColor: 'transparent !important',
  },
  tableRow: {
    backgroundColor: 'transparent !important',
  },
  tableCell: {
    fontSize: '22px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableCell1: {
    fontSize: '14px',
    backgroundColor: 'transparent !important',
    borderColor: 'transparent !important',
    color: '#000000a6 !important',
    fontWeight: 'bolder',
    padding: '1px 24px 1px 16px',
  },
  tableBody: {
    backgroundColor: 'transparent !important',
  },
  text: {
    color: 'white !important',
    textAlign: 'center',
  },
  buttonGrid: {
    maxWidth: "416px",
    width: "100%",
  },
  detail: {
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appbar: {
    background: '#193a1e',
    boxShadow: 'none',
    color: 'white',
  },
  footer: {
    backgroundColor: '#193a1e',
    marginTop: 'auto',
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  loader: {
    color: '#be6a77 !important',
  },


  logo: {
    marginLeft: theme.spacing(2), // Add spacing between logo and tabs
  },

}));

export const ImageUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [data, setData] = useState();
  const [image, setImage] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [disease, setDisease] = useState();
  const [possibleDiseases, setPossibleDiseases] = useState();
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [predictStep, setPredictStep] = useState(0);

  const handlePredictStep = (stepOption) => {
    setPredictStep(stepOption);
  }

  let confidence = 0;

  const sendFile = async (sympom_set) => {

    let ress = await axios({
      method: "post",
      url: '/extra_symptoms',
      headers: {
        "Content-type": "application/json"
      },
      data: sympom_set,
    });

    if (ress.status === 200) {
      console.log("success")
      if (image) {
        let formData = new FormData();
        formData.append("file", selectedFile);
        let res = await axios({
          method: "post",
          mode: 'no-cors',
          url: "/image_upload",
          data: formData,

        });
        if (res.status === 200) {
          console.log(res.data)
          setDisease(res.data.disease)
        }

      } else {
        let res = await axios({
          method: "get",
          mode: 'no-cors',
          url: "/ontology_detection",
        });
        if (res.status === 200) {
          console.log(res.data)
          setPossibleDiseases(res.data.disease)
        }

      }

    }

    // if (image) {
    //   let formData = new FormData();
    //   formData.append("file", selectedFile);
    //   let res = await axios({
    //     method: "post",
    //     mode: 'no-cors',
    //     url: process.env.REACT_APP_API_URL,
    //     data: formData,

    //   });
    //   if (res.status === 200) {
    //     console.log(res.data)

    //   }

    // }


  }

  const clearData = () => {
    setData(null);
    setImage(false);
    setSelectedFile(null);
    setPreview(null);
    setDisease(null);
    setPossibleDiseases(null);

  };



  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile]);

  // useEffect(() => {
  //   if (!preview) {
  //     return;
  //   }
  //   setIsloading(true);
  //   sendFile();
  // }, [preview]);

  const onSelectFile = (files) => {
    if (!files || files.length === 0) {
      setSelectedFile(undefined);
      setImage(false);
      setData(undefined);
      return;
    }
    setSelectedFile(files[0]);
    setData(undefined);
    setImage(true);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (data) {
    confidence = (parseFloat(data.confidence) * 100).toFixed(2);
  }

  const customStyles = {
    control: (base) => ({
      ...base,
      width: '200px',
      margin: 'auto',
      marginTop: '10px',
    }),
    menu: (base) => ({
      ...base,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '400px',
    }),
  };

  const handleSubmit = () => {

    var sympom_set = {
      "hasLeafSymptom": selectedLeafSymptomOption.value,
      "hasLeafSymptomColour": selectedLeafColorSymptomOption.value,
      "hasFruitSymptom": selectedFruitSymptomOption.value,
      "hasFruitSymptomColour": selectedFruitColorSymptomOption.value,
      "hasStemSymptom": selectedStemSymptomOption.value,
      "hasStemSymptomColor": selectedStemColorSymptomOption.value,
      "hasFungusSymptom": selectedFungusSymptomOption.value,
      "hasFungusSymptomColor": selectedFungusColorSymptomOption.value,
      "hasFruitHalo": selectedFruitHaloSymptomOption.value,
      "hasLeafHalo": selectedLeafHaloSymptomOption.value,
      "wilting_symptom": selectedWiltingSymptomOption.value,

    }

    var x = sendFile(sympom_set);


    //console.log(sympom_set)
  };

  const [selectedLeafSymptomOption, setSelectedLeafSymptomOption] = useState('None');
  const [selectedLeafColorSymptomOption, setSelectedLeafColorSymptomOption] = useState('None');
  const [selectedFruitSymptomOption, setSelectedFruitSymptomOption] = useState("None");
  const [selectedFruitColorSymptomOption, setSelectedFruitColorSymptomOption] = useState("None");
  const [selectedStemSymptomOption, setSelectedStemSymptomOption] = useState("None");
  const [selectedStemColorSymptomOption, setSelectedStemColorSymptomOption] = useState("None");
  const [selectedFungusSymptomOption, setSelectedFungusSymptomOption] = useState("None");
  const [selectedFungusColorSymptomOption, setSelectedFungusColorSymptomOption] = useState("None");
  const [selectedFruitHaloSymptomOption, setSelectedFruitHaloSymptomOption] = useState("None");
  const [selectedLeafHaloSymptomOption, setSelectedLeafHaloSymptomOption] = useState("None");
  const [selectedWiltingSymptomOption, setSelectedWiltingSymptomOption] = useState("None");
  const [selectedBadOdorSymptomOption, setSelectedBadOdorSymptomOption] = useState("None");
  const [selectedOozeLiquidPresenceSymptomOption, setSelectedOozeLiquidPresenceSymptomOption] = useState("None");
  const [selectedCrossSectionOfStemSymptomOption, setSelectedCrossSectionOfStemSymptomOption] = useState("None");
  const [selectedCurlingSymptomOption, setSelectedCurlingSymptomOption] = useState("None");


  const handleChange = (selectedOption, selectName) => {
    if (selectName === 'select1') {
      setSelectedLeafSymptomOption(selectedOption);
    }

    else if (selectName === 'select2') {
      setSelectedLeafColorSymptomOption(selectedOption);
    }

    else if (selectName === 'select3') {
      setSelectedFruitSymptomOption(selectedOption);
    }

    else if (selectName === 'select4') {
      setSelectedFruitColorSymptomOption(selectedOption);
    }

    else if (selectName === 'select5') {
      setSelectedStemSymptomOption(selectedOption);
    }

    else if (selectName === 'select6') {
      setSelectedStemColorSymptomOption(selectedOption);
    }

    else if (selectName === 'select7') {
      setSelectedFungusSymptomOption(selectedOption);
    }

    else if (selectName === 'select8') {
      setSelectedFungusColorSymptomOption(selectedOption);
    }

    else if (selectName === 'select9') {
      setSelectedFruitHaloSymptomOption(selectedOption);
    }

    else if (selectName === 'select10') {
      setSelectedLeafHaloSymptomOption(selectedOption);
    }

    else if (selectName === 'select11') {
      setSelectedWiltingSymptomOption(selectedOption);
    }

    else if (selectName === 'select12') {
      setSelectedBadOdorSymptomOption(selectedOption);
    }

    else if (selectName === 'select13') {
      setSelectedOozeLiquidPresenceSymptomOption(selectedOption);
    }

    else if (selectName === 'select14') {
      setSelectedCrossSectionOfStemSymptomOption(selectedOption);
    }

    else if (selectName === 'select15') {
      setSelectedCurlingSymptomOption(selectedOption);
    }

  };

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap href = "#" sx={{flexGrow: 1 }}>
            AgrOM : A Hybrid System
          </Typography>
          <div className={classes.grow} />
          <Tabs value={selectedTab} onChange={handleTabChange}>
            <Tab label="Home" />
            <Tab label="Predict" />
            <Tab label="Guide" />
            <Tab label="Questions" />
            {/* Add more tabs as needed */}
          </Tabs>
          <Avatar src={logo} className={classes.logo}></Avatar>
        </Toolbar>
      </AppBar>
      { selectedTab === 0 && <HomePage changeSelectTab={setSelectedTab} />}
      { selectedTab !== 0 && 
      <Container maxWidth={false} className={classes.mainContainer} disableGutters={true}>        
        <Grid
          className={classes.gridContainer}
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >

          { selectedTab === 1 && predictStep === 0 && 
            <PredictOption predictStep={predictStep} onStepChange={handlePredictStep}/>
          }

          { selectedTab === 1 && predictStep === 2 && 
            <PredictOption predictStep={predictStep} onStepChange={handlePredictStep}/>
          }

          {selectedTab === 1 && predictStep === 1 &&  <Grid item xs={12}>
              <ColorButton variant="contained" color="primary" component="div" onClick={(e)=>{setPredictStep(0)}} >
                Go Back
              </ColorButton>
              <Card className={`${classes.imageCard} ${!image ? classes.imageCardEmpty : ''}`} style={{height:"350px"}}>
              {image && <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={preview}
                  component="image"
                  title="Leaf symptom"
                />
              </CardActionArea>
              }
              {!image && <CardContent className={classes.content}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image of a tomato plant leaf to process"}
                  onChange={onSelectFile}
                />
              </CardContent>}
              {/* {data && <CardContent className={classes.detail}>
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead className={classes.tableHead}>
                      <TableRow className={classes.tableRow}>
                        <TableCell className={classes.tableCell1}>Label:</TableCell>
                        <TableCell align="right" className={classes.tableCell1}>Confidence:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      <TableRow className={classes.tableRow}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                          {data.class}
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>{confidence}%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>} */}
              {/* {isLoading && <CardContent className={classes.detail}>
                <CircularProgress color="secondary" className={classes.loader} />
                <Typography className={classes.title} variant="h6" noWrap>
                  Processing
                </Typography>
              </CardContent>} */}
            </Card>

            <div style={containerStyles}>
              <div>
                <label htmlFor="selectField1" style={labelStyles}>Leaf Symptom: </label>
                <Select
                  value={selectedLeafSymptomOption}
                  options={options}
                  styles={customStyles}
                  onChange={(selectedLeafSymptomOption) => handleChange(selectedLeafSymptomOption, 'select1')}
                  isClearable={true}

                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField2" style={labelStyles}>Leaf Symptom Color:</label>
                <Select
                  options={leaf_symptom_color_option}
                  styles={customStyles}
                  value={selectedLeafColorSymptomOption}
                  onChange={(selectedLeafColorSymptomOption) => handleChange(selectedLeafColorSymptomOption, 'select2')}
                  isClearable={true}

                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField3" style={labelStyles}>Fruit Symptom:</label>
                <Select
                  options={fruit_symptom_options}
                  styles={customStyles}
                  value={selectedFruitSymptomOption}
                  onChange={(selectedFruitSymptomOption) => handleChange(selectedFruitSymptomOption, 'select3')}
                  isClearable={true}

                // other props and styles for the Select component
                />
              </div>
            </div>

            <div style={containerStyles}>
              <div>
                <label htmlFor="selectField1" style={labelStyles}>Fruit Symptom Color:</label>
                <Select
                  options={fruit_symptom_color_options}
                  styles={customStyles}
                  value={selectedFruitColorSymptomOption}
                  onChange={(selectedFruitColorSymptomOption) => handleChange(selectedFruitColorSymptomOption, 'select4')}
                  isClearable={true}

                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField2" style={labelStyles}>Stem Symptom:</label>
                <Select
                  options={stem_symptom_options}
                  styles={customStyles}
                  value={selectedStemSymptomOption}
                  onChange={(selectedStemSymptomOption) => handleChange(selectedStemSymptomOption, 'select5')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField3" style={labelStyles}>Stem Symptom Color:</label>
                <Select
                  options={stem_symptom_color_options}
                  styles={customStyles}
                  value={selectedStemColorSymptomOption}
                  onChange={(selectedStemColorSymptomOption) => handleChange(selectedStemColorSymptomOption, 'select6')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
            </div>

            <div style={containerStyles}>
              <div>
                <label htmlFor="selectField1" style={labelStyles}>Fungus Symptom:</label>
                <Select
                  options={fungus_symptom_options}
                  styles={customStyles}
                  value={selectedFungusSymptomOption}
                  onChange={(selectedFungusSymptomOption) => handleChange(selectedFungusSymptomOption, 'select7')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField2" style={labelStyles}>Fungus Symptom Color:</label>
                <Select
                  options={fungus_symptom_color_options}
                  styles={customStyles}
                  value={selectedFungusColorSymptomOption}
                  onChange={(selectedFungusColorSymptomOption) => handleChange(selectedFungusColorSymptomOption, 'select8')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField3" style={labelStyles}>Fruit Halo:</label>
                <Select
                  options={fruit_halo_options}
                  styles={customStyles}
                  value={selectedFruitHaloSymptomOption}
                  onChange={(selectedFruitHaloSymptomOption) => handleChange(selectedFruitHaloSymptomOption, 'select9')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
            </div>

            <div style={containerStyles}>
              <div>
                <label htmlFor="selectField1" style={labelStyles}>Leaf Halo:</label>
                <Select
                  options={leaf_halo_options}
                  styles={customStyles}
                  value={selectedLeafHaloSymptomOption}
                  onChange={(selectedLeafHaloSymptomOption) => handleChange(selectedLeafHaloSymptomOption, 'select10')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField2" style={labelStyles}>Wilting:</label>
                <Select
                  options={wilting_options}
                  styles={customStyles}
                  value={selectedWiltingSymptomOption}
                  onChange={(selectedWiltingSymptomOption) => handleChange(selectedWiltingSymptomOption, 'select11')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField3" style={labelStyles}>Bad odor:</label>
                <Select
                  options={bad_odor_symptom_options}
                  styles={customStyles}
                  value={selectedBadOdorSymptomOption}
                  onChange={(selectedBadOdorSymptomOption) => handleChange(selectedBadOdorSymptomOption, 'select12')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
            </div>

            <div style={containerStyles}>
              <div>
                <label htmlFor="selectField1" style={labelStyles}>Ooze liquid presence:</label>
                <Select
                  options={options}
                  styles={customStyles}
                  value={selectedOozeLiquidPresenceSymptomOption}
                  onChange={(selectedOozeLiquidPresenceSymptomOption) => handleChange(selectedOozeLiquidPresenceSymptomOption, 'select13')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField2" style={labelStyles}>Cross section of stem symptom:</label>
                <Select
                  options={options}
                  styles={customStyles}
                  value={selectedCrossSectionOfStemSymptomOption}
                  onChange={(selectedCrossSectionOfStemSymptomOption) => handleChange(selectedCrossSectionOfStemSymptomOption, 'select14')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
              <div>
                <label htmlFor="selectField3" style={labelStyles}>Curling:</label>
                <Select
                  options={options}
                  styles={customStyles}
                  value={selectedCurlingSymptomOption}
                  onChange={(selectedCurlingSymptomOption) => handleChange(selectedCurlingSymptomOption, 'select15')}
                  isClearable={true}
                // other props and styles for the Select component
                />
              </div>
            </div>

            <div style={containerStyles2}>
              <button onClick={handleSubmit} style={buttonStyles}>Submit</button>
            </div>

          </Grid>}

          {data && selectedTab === 1 &&
            <Grid item className={classes.buttonGrid} >

              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                Clear
              </ColorButton>
            </Grid>}

          {disease && selectedTab === 1 &&
            <Grid item className={classes.buttonGrid} >

              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                {disease}
              </ColorButton>
            </Grid>}

          {possibleDiseases && selectedTab === 1 &&
            <Grid item className={classes.buttonGrid} >

              <ColorButton variant="contained" className={classes.clearButton} color="primary" component="span" size="large" onClick={clearData} startIcon={<Clear fontSize="large" />}>
                {possibleDiseases.map((disease, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && ', '}
                    {disease}
                  </React.Fragment>
                ))}
              </ColorButton>
            </Grid>}

          {selectedTab === 2 && <Guide />}

          {selectedTab === 3 && <Questions />}

        </Grid >
      </Container >
      }
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Website Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </footer>
    </React.Fragment >
  );
};





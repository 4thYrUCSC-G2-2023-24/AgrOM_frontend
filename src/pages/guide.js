import { Container, Grid } from "@material-ui/core";
import { GuideCard } from "../components/guide/guideCard";
import { cardData } from "../constants/guideCard";
import { useState } from "react";

import './../assets/styles/guide.css';

export const Guide = ()=>{

    const [searchval, Setsearchval] = useState("");
    console.log(searchval);

    const handleSearchChange = e => {
        Setsearchval(e.target.value);
        console.log(e.target.value);
    }

    return (
      <div className="guideLayout">
        <textarea className="guideSearch" onChange={handleSearchChange} />
        <div className="guideCardContainer" >
          <Grid container spacing={2}>
            {console.log(cardData)}
            {cardData.map((card) => (
              card.title.toLowerCase().includes(searchval.toLowerCase()) && <GuideCard props={card} />
            ))}
          </Grid>
        </div>
      </div>
    );
}
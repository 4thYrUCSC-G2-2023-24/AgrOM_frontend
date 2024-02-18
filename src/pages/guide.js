import { Container } from "@material-ui/core";
import { GuideCard } from "../components/guide/guideCard";

import { cardData } from "../constants/guideCard";
import { useState } from "react";

export const Guide = ()=>{

    const [searchval, Setsearchval] = useState("");
    console.log(searchval);

    const handleSearchChange = e => {
        Setsearchval(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div style={{ height: '100%', overflowY: 'hidden', width: '90%', textAlign:"center" }}>
                <textarea onChange={handleSearchChange} style={{alignSelf: "center", padding: "5px", marginBottom: "10px"}}/>
              <Container>
                {console.log(cardData)}
                {cardData.map((card) => (
                    card.title.toLowerCase().includes(searchval.toLowerCase()) && <GuideCard props={card} />
                ))}
              </Container>
            </div>
    );
}
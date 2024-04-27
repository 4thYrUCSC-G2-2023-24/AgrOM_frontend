import axios from "axios";

export const sendFileAndExtraSymptoms = async (sympom_set) => {

    const image = false;

    let ress = await axios({
        method: "post",
        url: 'http://localhost:8000/extra_symptoms',
        headers: {
            "Content-type": "application/json"
        },
        data: sympom_set,
    });

    if (ress && ress.status === 200) {
        if (image) {
            let formData = new FormData();
            formData.append("file", selectedFile);
            let res = await axios({
                method: "post",
                mode: 'no-cors',
                url: "http://localhost:8000/image_upload",
                data: formData,

            });
            if (res && res.status === 200) {
                console.log(res.data)
                setDisease(res.data.disease)
            }

        } else {
            let res = await axios({
                method: "get",
                mode: 'no-cors',
                url: "http://localhost:8000/ontology_detection",
            });
            if (res && res.status === 200) {
                return res.status
            }

        }

    }




}
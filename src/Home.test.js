import { sendFileAndExtraSymptoms } from "./utils/sendFileAndExtraSymptoms";

it('Works with prediction function using ontology', async () => {
    var sympom_set = { "hasLeafSymptom": "rings" }

    const data = await sendFileAndExtraSymptoms(sympom_set);
    expect(data).toBe(200);
});


it('Works with prediction function with image', async () => {
    var sympom_set = { "hasLeafSymptom": "rings" }


    var selectedFile = new File([""], "C:\\Users\\USER\\Desktop\\Test Images\\Late_blight_2.jpg");

    console.log(selectedFile)
    const data = await sendFileAndExtraSymptoms(sympom_set);
    expect(data).toBe(200);
});
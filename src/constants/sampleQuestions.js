import crack from './../noimage.png'
import noimage from './../noimage.png'
import curl from './../noimage.png'
import wilt from './../noimage.png'
import gray_fungus from './../noimage.png'
import stem_lesions from './../noimage.png'
import stem_spot from './../noimage.png'
import fruit_spot from './../noimage.png'
import fruit_ring from './../noimage.png'
import fruit_lesion from './../noimage.png'

export const sampleQuestions = [{
    id: 1,
    question: 'What is the type of Leaf symptom?',
    options: ['Lesion', 'Spot', 'Concentric ring'],
    labels: ['lesions', 'spot', 'rings'],
    images: ["./images/Lesion.PNG", './images/Spots.PNG', './images/rings.jpg'],
},
{
    id: 2,
    question: 'What is the color of Leaf symptom?',
    options: ['Black', 'Brown'],
    labels: ['black', 'brown'],
},
{
    id: 3,
    question: 'Are there halos in the leaf?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: ['./images/Spots.PNG', noimage],

},
{
    id: 4,
    question: 'What is the type of stem symptom? (You can use the guide and based on that select the option)',
    options: ['Lesion', 'Spot', 'Concentric ring'],
    labels: ['lesions', 'spot', 'rings'],
    images: [stem_lesions, stem_spot, "./images/stem_rings.PNG"],
},
{
    id: 5,
    question: 'What is the color of Stem symptom?',
    options: ['Black', 'Brown'],
    labels: ['black', 'brown'],
},
{
    id: 6,
    question: 'What is the type of fruit symptom? (You can use the guide to get better understanding)',
    options: ['Lesion', 'Spot', 'Concentric ring'],
    labels: ['lesions', 'spot', 'rings'],
    images: [fruit_lesion, fruit_spot, fruit_ring],
},
{
    id: 7,
    question: 'What is the color of Fruit symptom?',
    options: ['Black', 'Brown'],
    labels: ['black', 'brown'],
},
{
    id: 8,
    question: 'Are there any halos in the fruit?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: ['./images/halo.png', noimage],
},
{
    id: 9,
    question: 'Is there a bad odor coming out from the plant?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
},
{
    id: 10,
    question: 'Is there any cross section of symptoms appearing when you cut stems?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: ['./images/cross_section.png', noimage]
},
{
    id: 11,
    question: 'Is there any ooze liquid presence in tomato fruit',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: ['./images/ooze.png', noimage]
},
{
    id: 12,
    question: 'Are there any cracks in the middle of the spots?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: [crack, noimage],
},
{
    id: 13,
    question: 'Is your plant showing wilting',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: [wilt, noimage]
},
{
    id: 14,
    question: 'Are most of tomato leaves showing curling symptom?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: [curl, noimage],
},
{
    id: 15,
    question: 'Are there any fluffy fungus symptom?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: ['./images/Fungus.png', noimage],
}];
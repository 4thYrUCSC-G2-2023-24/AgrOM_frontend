import crack from './../cracks.png'
import noimage from './../noimage.png'
import curl from './.././curl.png'
import wilt from './../wilt.png'
import gray_fungus from './../noimage.png'
import stem_lesions from './../stem_lesion.jpg'
import stem_spot from './../stem_spot.png'
import fruit_spot from './../fruit_spot.jpg'
import fruit_ring from './../fruit_rings.jpg'
import fruit_lesion from './../fruit_lesion.jpg'
import ring_crack from './../crack_center.png'

export const sampleQuestions = [{
    id: 1,
    question: 'What is the type of Leaf symptom?',
    options: ['Lesion', 'Spots', 'Concentric ring'],
    labels: ['lesions', 'spots', 'rings'],
    images: ["./images/Lesion.PNG", './images/Spots.PNG', './images/rings.jpg'],
},
{
    id: 2,
    question: 'What is the color of Leaf symptom?',
    options: ['Black', 'Brown', 'Yellow', 'Gray'],
    labels: ['black', 'brown', 'yellow', 'grey'],
},
{
    id: 3,
    question: 'Are there halos in the leaf?',
    options: ['Yellow', 'White', 'No'],
    labels: ['yellow', 'white', 'no'],
    images: ['./images/Spots.PNG', './images/white_halo.jpg'],

},
{
    id: 4,
    question: 'What is the type of stem symptom? (You can use the guide and based on that select the option)',
    options: ['Lesion', 'Spots', 'Concentric ring'],
    labels: ['lesions', 'spots', 'rings'],
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
    options: ['Lesion', 'Spots', 'Concentric ring', 'Rings with crack center'],
    labels: ['lesions', 'spots', 'rings', 'rings_with_crack'],
    images: [fruit_lesion, fruit_spot, fruit_ring, ring_crack],
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
    options: ['Yellow', 'No'],
    labels: ['yellow', 'no'],
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
    labels: ['wilting', 'No'],
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
    question: 'Are there any fungus symptom?',
    options: ['White fluffy fungus', 'White Powdery fungus on leafs', 'Black/Brown fungus on leaves', 'Olive coloured fungus', 'No'],
    labels: ['white', 'powdery', 'black', 'olive', 'No'],
    images: ['./images/Fungus.png', './images/powdery.png', './images/black.jpg', './images/olive.png', noimage],
}];




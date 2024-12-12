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
import yellowing from './../yellowing.jpg'
import tan_center from './../tan_center_spot.jpg'

export const sampleQuestions = [{
}]

export const sampleLeafQuestions = [{
    uid: 1,
    question: 'What is the type of Leaf symptom?',
    options: ['Lesion', 'Spots', 'Concentric ring', 'Yellowing', 'Spot with tan center'],
    labels: ['lesions', 'spots', 'rings', 'yellowing', 'tan_center_spots'],
    images: ["./images/Lesion.PNG", './images/Spots.PNG', './images/rings.jpg', yellowing, tan_center],
},
{
    uid: 2,
    question: 'What is the color of Leaf symptom?',
    options: ['Black', 'Brown', 'Yellow', 'Gray'],
    labels: ['black', 'brown', 'yellow', 'grey'],
},
{
    uid: 3,
    question: 'Are there halos in the leaf?',
    options: ['Yellow', 'White', 'No'],
    labels: ['yellow', 'white', 'no'],
    images: ['./images/Spots.PNG', './images/white_halo.jpg'],

},
{
    uid: 12,
    question: 'Are there any cracks in the middle of the spots?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: [crack],
},
{
    uid: 14,
    question: 'Are most of tomato leaves showing curling symptom?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: [curl],
},

]


export const sampleStemQuestions = [{
    uid: 4,
    question: 'What is the type of stem symptom? (You can use the guide and based on that select the option)',
    options: ['Lesion', 'Spots', 'Concentric ring'],
    labels: ['lesions', 'spots', 'rings'],
    images: [stem_lesions, stem_spot, "./images/stem_rings.PNG"],
},
{
    uid: 5,
    question: 'What is the color of Stem symptom?',
    options: ['Black', 'Brown'],
    labels: ['black', 'brown'],
}]

export const sampleFruitQuestions = [{
    uid: 6,
    question: 'What is the type of fruit symptom? (You can use the guide to get better understanding)',
    options: ['Lesion', 'Spots', 'Concentric ring', 'Rings with crack center'],
    labels: ['lesions', 'spots', 'rings', 'ring_with_crack'],
    images: [fruit_lesion, fruit_spot, fruit_ring, ring_crack],
},
{
    uid: 7,
    question: 'What is the color of Fruit symptom?',
    options: ['Black', 'Brown'],
    labels: ['black', 'brown'],
},
{
    uid: 8,
    question: 'Are there any halos in the fruit?',
    options: ['Yellow', 'No'],
    labels: ['yellow', 'no'],
    images: ['./images/halo.png'],
}]

export const sampleSpecialQuestions = [{
    uid: 9,
    question: 'Is there a bad odor coming out from the plant?',
    options: ['Yes', 'No'],
    labels: ['odor', 'no'],
},
{
    uid: 11,
    question: 'Is there any ooze liquid presence?',
    options: ['Yes', 'No'],
    labels: ['ooze', 'No'],
    images: ['./images/ooze.jpg']
},
{
    uid: 13,
    question: 'Is your plant showing wilting',
    options: ['Yes', 'No'],
    labels: ['wilting', 'No'],
    images: [wilt]
},
{
    uid: 15,
    question: 'Are there any fungus symptom?',
    options: ['White fungus', 'Black/Brown fungus on leaves', 'Olive coloured fungus', 'No'],
    labels: ['white', 'black', 'olive', 'No'],
    images: ['./images/Fungus.png', './images/black.jpg', './images/olive.png'],
},
{
    uid: 16,
    question: 'Is there any webbing?',
    options: ['Yes', 'No'],
    labels: ['Yes', 'No'],
    images: ['./images/webbing.png',],
}
]


export const sampleFlowerQuestions = [{
    uid: 17,
    question: 'Is there flower dropping observed?',
    options: ['Yes', 'No'],
    labels: ['dropping', 'no'],
}
]


export const initialQuestion = {
    question: 'What kind of Symptom you are observing? (Select one or more)',
    options: ['Leaf symptom', 'Stem symptom', 'Fruit symptom', 'Flower symptom', 'Special symptom (Fungal Symptom, Odor symptom, Webbing, Wilting)'],
    labels: ['leaf_symp', 'stem_symp', 'fruit_symp', 'flower_symp', 'special_symp'],
}
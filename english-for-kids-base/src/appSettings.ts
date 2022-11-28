// export const categoryNameList = ['Food', 'Colors', 'Nature', 'Animals'];

export interface Category {
  name: string,
  link: string,
  image: string,
  categoryNo: number,
}

export interface Card {
  word: string,
  translation: string,
  image: string,
  audioSrc: string,
}

export interface Settings {
  gameMode: string
}

export const settings: Settings = {
  gameMode: 'train',
};

export const gameData = {
  currentCategory: 0,
  currentCard: 0,
  guessCounter: 0,
  mistakesCounter: 0,
  cardsInCategory: 8,
  currentStep: 0,
  shuffledCardsOrder: [1, 2],
};

// 8 categories
export const categoriesList = [
  {
    name: 'Action (set A)',
    link: '#action-a',
    image: 'img/dance.jpg',
    categoryNo: 0,
  },
  {
    name: 'Action (set B)',
    link: '#action-b',
    image: 'img/swim.jpg',
    categoryNo: 1,
  },
  {
    name: 'Animals (set A)',
    link: '#animals-a',
    image: 'img/cat.jpg',
    categoryNo: 2,
  },
  {
    name: 'Animals (set B)',
    link: '#animals-b',
    image: 'img/bird.jpg',
    categoryNo: 3,
  },
  {
    name: 'Clothes',
    link: '#clothes',
    image: 'img/shoe.jpg',
    categoryNo: 4,
  },
  {
    name: 'Emotions',
    link: '#emotions',
    image: 'img/sad.jpg',
    categoryNo: 5,
  },
  {
    name: 'Food',
    link: '#food',
    image: 'img/banana.jpg',
    categoryNo: 6,
  },
  {
    name: 'Colors',
    link: '#colors',
    image: 'img/black.jpg',
    categoryNo: 7,
  },
];

export const cardsList = [
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: 'img/cry.jpg',
      audioSrc: 'audio/cry.mp3',
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'img/dance.jpg',
      audioSrc: 'audio/dance.mp3',
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'img/dive.jpg',
      audioSrc: 'audio/dive.mp3',
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'img/draw.jpg',
      audioSrc: 'audio/draw.mp3',
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'img/fish.jpg',
      audioSrc: 'audio/fish.mp3',
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'img/fly.jpg',
      audioSrc: 'audio/fly.mp3',
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'img/hug.jpg',
      audioSrc: 'audio/hug.mp3',
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'img/jump.jpg',
      audioSrc: 'audio/jump.mp3',
    },
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: 'img/open.jpg',
      audioSrc: 'audio/open.mp3',
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'img/play.jpg',
      audioSrc: 'audio/play.mp3',
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'img/point.jpg',
      audioSrc: 'audio/point.mp3',
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'img/ride.jpg',
      audioSrc: 'audio/ride.mp3',
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'img/run.jpg',
      audioSrc: 'audio/run.mp3',
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'img/sing.jpg',
      audioSrc: 'audio/sing.mp3',
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'img/skip.jpg',
      audioSrc: 'audio/skip.mp3',
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'img/swim.jpg',
      audioSrc: 'audio/swim.mp3',
    },
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'img/cat.jpg',
      audioSrc: 'audio/cat.mp3',
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'img/chick.jpg',
      audioSrc: 'audio/chick.mp3',
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'img/chicken.jpg',
      audioSrc: 'audio/chicken.mp3',
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'img/dog.jpg',
      audioSrc: 'audio/dog.mp3',
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'img/horse.jpg',
      audioSrc: 'audio/horse.mp3',
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'img/pig.jpg',
      audioSrc: 'audio/pig.mp3',
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'img/rabbit.jpg',
      audioSrc: 'audio/rabbit.mp3',
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'img/sheep.jpg',
      audioSrc: 'audio/sheep.mp3',
    },
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'img/bird.jpg',
      audioSrc: 'audio/bird.mp3',
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'img/fish1.jpg',
      audioSrc: 'audio/fish.mp3',
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'img/frog.jpg',
      audioSrc: 'audio/frog.mp3',
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'img/giraffe.jpg',
      audioSrc: 'audio/giraffe.mp3',
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'img/lion.jpg',
      audioSrc: 'audio/lion.mp3',
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'img/mouse.jpg',
      audioSrc: 'audio/mouse.mp3',
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'img/turtle.jpg',
      audioSrc: 'audio/turtle.mp3',
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'img/dolphin.jpg',
      audioSrc: 'audio/dolphin.mp3',
    },
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'img/skirt.jpg',
      audioSrc: 'audio/skirt.mp3',
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'img/pants.jpg',
      audioSrc: 'audio/pants.mp3',
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'img/blouse.jpg',
      audioSrc: 'audio/blouse.mp3',
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'img/dress.jpg',
      audioSrc: 'audio/dress.mp3',
    },
    {
      word: 'boot',
      translation: 'ботинок',
      image: 'img/boot.jpg',
      audioSrc: 'audio/boot.mp3',
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'img/shirt.jpg',
      audioSrc: 'audio/shirt.mp3',
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'img/coat.jpg',
      audioSrc: 'audio/coat.mp3',
    },
    {
      word: 'shoe',
      translation: 'туфли',
      image: 'img/shoe.jpg',
      audioSrc: 'audio/shoe.mp3',
    },
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'img/sad.jpg',
      audioSrc: 'audio/sad.mp3',
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'img/angry.jpg',
      audioSrc: 'audio/angry.mp3',
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'img/happy.jpg',
      audioSrc: 'audio/happy.mp3',
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'img/tired.jpg',
      audioSrc: 'audio/tired.mp3',
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'img/surprised.jpg',
      audioSrc: 'audio/surprised.mp3',
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'img/scared.jpg',
      audioSrc: 'audio/scared.mp3',
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'img/smile.jpg',
      audioSrc: 'audio/smile.mp3',
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'img/laugh.jpg',
      audioSrc: 'audio/laugh.mp3',
    },
  ],
  // Food
  [
    {
      word: 'apple',
      translation: 'яблоко',
      image: 'img/apple.jpg',
      audioSrc: 'audio/apple.mp3',
    },
    {
      word: 'banana',
      translation: 'банан',
      image: 'img/banana.jpg',
      audioSrc: 'audio/banana.mp3',
    },
    {
      word: 'avocado',
      translation: 'авокадо',
      image: 'img/avocado.jpg',
      audioSrc: 'audio/avocado.mp3',
    },
    {
      word: 'bread',
      translation: 'хлеб',
      image: 'img/bread.jpg',
      audioSrc: 'audio/bread.mp3',
    },
    {
      word: 'cheese',
      translation: 'сыр',
      image: 'img/cheese.jpg',
      audioSrc: 'audio/cheese.mp3',
    },
    {
      word: 'tomato',
      translation: 'томат',
      image: 'img/tomato.jpg',
      audioSrc: 'audio/tomato.mp3',
    },
    {
      word: 'cabbage',
      translation: 'капуста',
      image: 'img/cabbage.jpg',
      audioSrc: 'audio/cabbage.mp3',
    },
    {
      word: 'carrot',
      translation: 'морковь',
      image: 'img/carrot.jpg',
      audioSrc: 'audio/carrot.mp3',
    },
  ],
  // Colors
  [
    {
      word: 'white',
      translation: 'белый',
      image: 'img/white.jpg',
      audioSrc: 'audio/white.mp3',
    },
    {
      word: 'yellow',
      translation: 'желтый',
      image: 'img/yellow.jpg',
      audioSrc: 'audio/yellow.mp3',
    },
    {
      word: 'orange',
      translation: 'оранжевый',
      image: 'img/orange.jpg',
      audioSrc: 'audio/orange.mp3',
    },
    {
      word: 'red',
      translation: 'красный',
      image: 'img/red.jpg',
      audioSrc: 'audio/red.mp3',
    },
    {
      word: 'blue',
      translation: 'синий',
      image: 'img/blue.jpg',
      audioSrc: 'audio/blue.mp3',
    },
    {
      word: 'green',
      translation: 'зеленый',
      image: 'img/green.jpg',
      audioSrc: 'audio/green.mp3',
    },
    {
      word: 'black',
      translation: 'черный',
      image: 'img/black.jpg',
      audioSrc: 'audio/black.mp3',
    },
    {
      word: 'pink',
      translation: 'розовый',
      image: 'img/pink.jpg',
      audioSrc: 'audio/pink.mp3',
    },
  ],
];
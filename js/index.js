// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
          let newFruit = document.createElement("li");
          let fruitClassColor;
	          switch(fruits[i].color) {
	          	case "фиолетовый":
	          		fruitClassColor = "violet";
	          	break;
	          	case "зеленый":
	          		fruitClassColor = "green";
	          	break;
	          	case "розово-красный":
	          		fruitClassColor = "carmazin";
	          	break;
	          	case "желтый":
	          		fruitClassColor = "yellow";
	          	break;
	          	case "светло-коричневый":
	          		fruitClassColor = "lightbrown";
	          	break;
	          	default:
	          		fruitClassColor = "black";
	          	break;
	          }
              newFruit.className = `fruit__item fruit_${fruitClassColor}`;
          let fruitInfo = document.createElement("div");
              fruitInfo.className = "fruit__info";
          let fruitIndex = document.createElement("div");
              fruitIndex.innerHTML = `index: ${i}`;
          let fruitKind = document.createElement("div");
              fruitKind.innerHTML = `kind: ${fruits[i].kind}`;
          let fruitColor = document.createElement("div");
              fruitColor.innerHTML = `color: ${fruits[i].color}`;
          let fruitWeight = document.createElement("div");
              fruitWeight.innerHTML = `weight (кг): ${fruits[i].weight}`;    
          fruitsList.appendChild(newFruit).appendChild(fruitInfo).appendChild(fruitIndex).appendChild(fruitKind).appendChild(fruitColor).appendChild(fruitWeight);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];

  /* вспомогательный массив для проверки на совпадение со старым массивом */
  let tempArrayOfFruits = [];
  /* вспомогательный массив для проверки на совпадение со старым массивом */

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    
    let indexOfMovingFruit = getRandomInt(0,fruits.length-1);
    result.push(fruits[indexOfMovingFruit]);
    tempArrayOfFruits.push(fruits[indexOfMovingFruit]);
    fruits.splice(indexOfMovingFruit, 1);
  }

  /* проверка на неизменение порядка в ходе перемешивания */
  if(fruits.length == tempArrayOfFruits.length && fruits.every((v, i) => tempArrayOfFruits[i] == v)) alert("Порядок не изменился!");
  /* проверка на неизменение порядка в ходе перемешивания */

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits.filter((item) => {
    // TODO: допишите функцию
    let minFilterValue = parseInt(document.getElementsByClassName("minweight__input")[0].value);
    let maxFilterValue = parseInt(document.getElementsByClassName("maxweight__input")[0].value);
    for (let i = 0; i < fruits.length; i++) {
    	if(fruits[i].weight < minFilterValue || fruits[i].weight > maxFilterValue) {
    		fruits.splice(i, 1);
    	}
    }
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  return (a > b) ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком

	/*функция сортировки "пузырьком" чтобы работал метод sortAPI.startSort в листенере для sortActionButton*/
	   const n = arr.length;
	   for (let i = 0; i < n; i++) { 
	       // внутренняя итерация для перестановки элемента в конец массива
	       for (let j = 0; j < n-1-i; j++) { 
	           // сравниваем элементы
	           if (comparation(arr[j].color, arr[j+1].color)) { 
	               // делаем обмен элементов
	               let temp = arr[j+1]; 
	               arr[j+1] = arr[j]; 
	               arr[j] = temp; 
	           }
	       }
	   }  
	/*функция сортировки "пузырьком" чтобы работал метод sortAPI.startSort в листенере для sortActionButton*/
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки

		/* функция самой сортировки */
		function sortQuick(arr, left, right, comparation) {
		    let i;
		    if (arr.length > 1) {
		        i = partition(arr, left, right, comparation);
		        if (left < i - 1) {
		            sortQuick(arr, left, i - 1, comparation);
		        }
		        if (i < right) {
		            sortQuick(arr, i, right, comparation);
		        }
		    }
		    return arr;
		}
		/* функция самой сортировки */

		/* функция разделитель */
		function partition(arr, left, right, comparation) {
		    const pivot = arr[Math.floor((right, left) / 2)];
		    let i = left;
		    let j = right;
		    while (i <= j) {
		        while (comparation(arr[i], pivot)) {
		            i++;
		        }
		        while (comparation(arr[j], pivot)) {
		            j--;
		        }
		        if (i <= j) {
				    let temp = arr[i];
				    arr[i] = arr[j];
				    arr[j] = temp;
		            i++;
		            j--;
		        }
		    }
		    return i;
		}
		/* функция разделитель */

	    return sortQuick(arr, 0, arr.length - 1, comparation);
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    /* вывод времени сортировки в span.sort__time */
    sortTimeLabel.innerHTML = sortTime; 
    /* вывод времени сортировки в span.sort__time */
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  if(sortKind == 'bubbleSort') {
  	sortKind = 'quickSort';
  } else {
  	sortKind = 'bubbleSort';
  }
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  let standartColorsOfFruit = ['желтый', 'зеленый', 'розово-красный', 'светло-коричневый', 'фиолетовый'];

  /* проверка на существующий цвет */
  let colorOfNewFruit = standartColorsOfFruit.includes(colorInput.value) ? colorInput.value : 'черный';
  /* проверка на существующий цвет */

  /* проверка на незаполненность одного из полей, не проверяем цвет, т.к. по умолчанию будет черный */
  if(!kindInput.value || !weightInput.value) {
  	alert("Не заполнено обязательное поле фрукта!");
  } else {
	let newFruitInFruits = {"kind": kindInput.value, "color": colorOfNewFruit, "weight": weightInput.value};
	fruits.push(newFruitInFruits);
	display();
  }
  /* проверка на незаполненность одного из полей, не проверяем цвет, т.к. по умолчанию будет черный */

});
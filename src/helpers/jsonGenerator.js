const fs = require('fs');
const fileName = 'dictionary.json';

const dictionary = {
  id: Math.ceil(Math.random(Date.now()) * 100),
  Name: {
    RU: "Русский справочник",
    EN: "English dictionary",
    ES: "Guia en español"
  },
  columns: [],
  items: [],
  isActive: true,
};


for (let i = 0; i < 100; i += 1) {
  dictionary.columns.push({
    RU: `${i} колонка`,
    EN: `${i} column`,
    ES: `Spanish ${i} column`
  });
}

for (let i = 0; i < 10; i += 1) {
  const item = {};
  dictionary.columns.forEach((el, idx) => {
    item[el.EN] = {
      RU: `Контент ${i}-${idx}`,
      EN: `Content ${i}-${idx}`,
      ES: `Contenido ${i}-${idx}`,
    }
  });
  dictionary.items.push(
    {
      id: i,
      content: item,
      isActive: true,
    }
  );
}

fs.writeFile(fileName, JSON.stringify(dictionary), 'utf8', () => {console.log('successfully written')});
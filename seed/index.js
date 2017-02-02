const fs = require('fs');
const characters = require('./characters');
const datas = characters.map(c => {
  const obj = {
    "id": "",
    "username": c.username,
    "name": c.name,
    "description": c.description,
    "online": false,
    "currentUserChat": "",
    "notifications": []
  };
  return JSON.stringify(obj) + "\n";
}).join('');
fs.writeFileSync('characters.json', datas, 'utf-8', err => console.log(err));
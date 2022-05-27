const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');

let k = 0;

app.use(express.static('high'))


    
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, './')
    },
    filename:  (req, file, cb) => {
      cb(null,file.originalname)// 파일 원본이름 저장
    }
  })

const upload = multer({ storage: storage }); // 미들웨어 생성

app.get('', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/uploadFile', upload.single('userfile'), (req, res, next) => {

    res.sendFile(__dirname + '/high/uploadFile.html');

    })
    //파일 읽기
try {
  var data = fs.readFileSync('inputFile.txt', 'utf8');
  let arr = data.match(/\d+/g);
   for(let i = 0; i< arr.length; i++){
  if (arr[i] ==='1' || arr[i] ==='2'|| arr[i]==='3'|| arr[i] ==='4'|| arr[i] ==='5'){
    arr.splice(i,1);
    i--;
  }

}

let coretask_value = [
  [[], [], [], [], []],
  [[], [], [], [], []],
  [[], [], [], [], []],
  [[], [], [], [], []],
  [[], [], [], [], []]
];


for (let j = 0; j < 10; j++) {
  let newArr = arr.slice(j * 25, j * 25 + 25);
  for (let i = 0; i < 25; i++) {
    if (i % 5 === 0) {
      coretask_value[parseInt(i / 5)][0].push(newArr[i]);
    }
    if (i % 5 === 1) {
      coretask_value[parseInt(i / 5)][1].push(newArr[i]);
    }
    if (i % 5 === 2) {
      coretask_value[parseInt(i / 5)][2].push(newArr[i]);
    }
    if (i % 5 === 3) {
      coretask_value[parseInt(i / 5)][3].push(newArr[i]);
    }
    if (i % 5 === 4) {
      coretask_value[parseInt(i / 5)][4].push(newArr[i]);
    }
  }
}

let arr_max = [];
for (let i = 0; i <5; i++){
  for(let j = 0; j < 5; j++){
    let a = Math.max.apply(null,coretask_value[i][j]);
    arr_max.push(a);
  }
}
console.log(arr_max);
//        task1	task2	task3	  task4	  task5
// core1	886	  749	  849	    909	    352	
// core2	959	  849	  788	    1053	  324	
// core3	942	  867	  930	    1064	  365	
// core4	820	  817	  816	    929	   336	
// core5	803	  786	  929	    958	   329	


  
   
  

}
catch(err) {
  console.log(err);
}
//배열정리






  
 



    

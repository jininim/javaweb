const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
app.use(express.static('high'))
nunjucks.configure('high', {
  autoescape: true,
  express: app
});
let arr_max = [];
    let arr_avg = [];
    let arr_min = [];
    let coretask_value = [
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []]
    ];
    let coretask_result = [
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []]
    ];






    
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
    try {
      var data = fs.readFileSync('inputFile.txt', 'utf8');
      let arr = data.match(/\d+/g);
       for(let i = 0; i< arr.length; i++){
      if (arr[i] ==='1' || arr[i] ==='2'|| arr[i]==='3'|| arr[i] ==='4'|| arr[i] ==='5'){
        arr.splice(i,1);
        i--;
      }
    
    }
    
   
    
    
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
    
    
    for (let i = 0; i <5; i++){
      for(let j = 0; j < 5; j++){
        let a = Math.max.apply(null,coretask_value[i][j]);
        let b = Math.min.apply(null,coretask_value[i][j]);
        let c = avg(coretask_value[i][j]);
        arr_max.push(a);
        arr_min.push(b);
        arr_avg.push(c);
        coretask_result[i][j].push(a,b,c);
      }
    }

    
    function avg(arr1) {
      let avg = 0;
      let sum = 0;
      for (let i = 0; i<arr1.length; i ++) {
        sum += parseInt(arr1[i]);
      }
      avg = sum / arr1.length;
      return Math.floor(avg);
     
    }

    }
    catch(err) {
      console.log(err);
    }
    res.render('uploadFile.html', {coretask_result} );

    })
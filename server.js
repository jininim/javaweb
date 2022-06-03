const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const fs = require('fs');
const nunjucks = require('nunjucks');
const { sort } = require('nunjucks/src/filters');
app.use(express.static('high'))
nunjucks.configure('high', {
  autoescape: true,
  express: app
});
    //배열선언
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

const upload = multer({ storage: storage });

app.get('', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/uploadFile', upload.single('userfile'), (req, res, next) => {

    res.sendFile(__dirname + '/high/uploadFile.html');
    try {
      let data = fs.readFileSync('inputFile.txt', 'utf8');
      let arr = data.match(/\d+/g); // 숫자값만 받아옴.

      //core1 <-에 붙은 숫자 제거
       for(let i = 0; i< arr.length; i++){
      if (arr[i] ==='1' || arr[i] ==='2'|| arr[i]==='3'|| arr[i] ==='4'|| arr[i] ==='5'){
        arr.splice(i,1);
        i--;
      }
    
    }
    
   
    
    
    for (let j = 0; j < 10; j++) {
      let new_arr = arr.slice(j * 25, j * 25 + 25);
      for (let i = 0; i < 25; i++) {
        if (i % 5 === 0) {
          coretask_value[parseInt(i / 5)][0].push(new_arr[i]);
        }
        if (i % 5 === 1) {
          coretask_value[parseInt(i / 5)][1].push(new_arr[i]);
        }
        if (i % 5 === 2) {
          coretask_value[parseInt(i / 5)][2].push(new_arr[i]);
        }
        if (i % 5 === 3) {
          coretask_value[parseInt(i / 5)][3].push(new_arr[i]);
        }
        if (i % 5 === 4) {
          coretask_value[parseInt(i / 5)][4].push(new_arr[i]);
        }
      }
    }
    
    
    for (let i = 0; i <5; i++){
      for(let j = 0; j < 5; j++){
        let a = Math.max.apply(null,coretask_value[i][j]);
        let b = Math.min.apply(null,coretask_value[i][j]);
        let c = avg(coretask_value[i][j]);
        let d = standard_deviation(coretask_value[i][j]);
        let e = median(coretask_value[i][j]);
        coretask_result[i][j].push(a,b,c,d,e);
      }
    }
    console.log(coretask_value[0][0]);
    console.log(coretask_result[0][0]);
    
    
    function avg(arr1) {
      let avg = 0;
      let sum = 0;
      for (let i = 0; i<arr1.length; i ++) {
        sum += parseInt(arr1[i]);
      }
      avg = sum / arr1.length;
      return Math.floor(avg);
     
    }
    function standard_deviation(arr1){
      let mean = avg(arr1);
      let total = 0;
      for(let i =0; i <arr1.length; i++){
        let deviation = arr1[i]- mean;
        total = deviation ** 2;
      }
      let a = Math.sqrt((total/(arr1.length-1)));
      return Math.floor(a);
    }
    function median(arr1){

      arr1.sort(function(a,b){
        return a-b;
      });
      return parseInt(arr1[4])
      
    }
    }
    
    catch(err) {
      console.log(err);
      
    }
    //넌적스사용 uploadfile.html에 coratask_result값 전달
    res.render('uploadFile.html', {coretask_result} );

    })
import express from 'express' // json 모듈로 import로 전환
import multer  from 'multer'
import fs  from 'fs'
import path from 'path';
import nunjucks from 'nunjucks'

const app = express();
app.set('view engine', 'html'); 

nunjucks.configure('views', { //넌적스 연결
  autoescape: true,
  express: app,
  watch: true
});

const port = 3000;
app.use(express.static('high'))
const coretask_value = new Array(50);
const __dirname = path.resolve(); //dirname 변수로 전환

let k = 0;

for ( var i = 0; i < 50; i++){ // 받은 데이터 값 배열
  coretask_value[i] = new Array(5);
}
    
app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`); // 대기서버
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
  // res.render('index.html')
    res.sendFile(__dirname + '/index.html')
})
app.post('/uploadFile', upload.single('userfile'), (req, res, next) => {
  // res.render('uploadFile.html')
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
let arr_avg = [];
let arr_min = [];
for (let i = 0; i <5; i++){
  for(let j = 0; j < 5; j++){
    let a = Math.max.apply(null,coretask_value[i][j]);
    let b = Math.min.apply(null,coretask_value[i][j]);
    let c = avg(coretask_value[i][j]);
    arr_max.push(a);
    arr_min.push(b);
    arr_avg.push(c);
  }
}
console.log(arr_max);
console.log(arr_min);
console.log(arr_avg);

function avg(arr1) {
  let avg = 0;
  let sum = 0;
  for (let i = 0; i<arr1.length; i ++) {
    sum += parseInt(arr1[i]);
  }
  avg = sum / arr1.length;
  return Math.floor(avg);
 
}

// console.log(Max_num)
// console.log(Avg_num)  //값 찍기
// console.log(Min_num)
// console.log(coretask_value)

}
catch(err) {
  console.log(err);
}


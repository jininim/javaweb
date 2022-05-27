const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const coretask_value = new Array(50);
let k = 0;

for ( var i = 0; i < 50; i++){
  coretask_value[i] = new Array(5);
}


    
app.listen(port, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
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
app.post('/user', upload.single('userfile'), (req, res, next) => {
    res.status(201).send({
        message: "텍스트 저장 성공",
        fileInfo: req.file
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
for(let i = 0; i < 50; i++){
  for(let j = 0; j<5; j++){
    coretask_value[i][j] = arr[k];
    k++;
  }
  
}
console.log(coretask_value)

}
catch(err) {
  console.log(err);
}
});


// //db연결
// mongoose
//   .connect(
//     'mongodb+srv://leejin:12887587@cluster0.sfrhl.mongodb.net/?retryWrites=true&w=majority',
//     {
    
//     }
//   )
//   .then(() => console.log('MongoDB conected'))
//   .catch((err) => {
//     console.log(err);
//   });
  
 



    

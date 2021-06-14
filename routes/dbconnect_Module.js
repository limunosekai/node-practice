const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// mysql 서버 접속 정보
const connection = mysql.createConnection({
  host: 'node-test.cikkio2zzjwp.us-east-2.rds.amazonaws.com',
  port: '3306',
  database: 'react',
  user: 'admin',
  password: '1q1q1q1q',
});

router.post('/', (req, res) => {
  const mybatisMapper = require('mybatis-mapper');

  let param = req.body;

  // mybatis mapper 경로 설정
  mybatisMapper.createMapper(['./models/' + param.mapper + '.xml']);
  let time = new Date();
  console.log(`####` + time + '####');
  console.log('\n called Mapper Name = ' + param.mapper);

  let format = { language: 'sql', indent: '  ' };
  // mysql 쿼리 정보 세팅
  let query = mybatisMapper.getStatement(
    param.mapper,
    param.mapper_id,
    param,
    format
  );
  console.log('\n ======== Node Mybatis Log Start ========');
  console.log(
    '* mapper namespace : ' + param.mapper + '.' + param.mapper_id + ' *\n'
  );

  connection.query(query, (err, results) => {
    if (err) console.log('db error : ' + err);
    let time2 = new Date();
    console.log('####' + time2 + '####');
    console.log('#### RESULT DATA LIST #### : \n', results);
    string = JSON.stringify(results);
    let json = JSON.parse(string);
    res.send({ json });
    console.log('========= Node Mybatis Query Log End ========');
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

// mysql 서버 접속 정보
const pool = mysql.createPool({
  connectionLimit: 66,
  waitForConnections: true,
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

  pool.getConnection((err, connection) => {
    connection.query(query, (error, results) => {
      if (error) console.log('db error : ' + error);
      let time2 = new Date();
      console.log('####' + time2 + '####');
      console.log('#### RESULT DATA LIST #### : \n', results);
      if (results !== undefined) {
        string = JSON.stringify(results);
        let json = JSON.parse(string);
        if (req.body.crud === 'select') {
          res.send({ json });
        } else {
          res.send('succ');
        }
      } else {
        res.send('error');
      }
      connection.release();
      console.log('========= Node Mybatis Query Log End ========');
    });
  });
});

module.exports = router;

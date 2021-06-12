const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res, next) => {
  let type = req.query.type;
  if (type === 'list') {
    // Swtool 리스트 조회
    try {
      // Mysql Api 모듈
      const dbconnect_Module = require('./dbconnect_Module');

      // Mysql 쿼리 호출 정보 입력
      req.body.mapper = 'SwToolsMapper'; // mybatis xml 파일명
      req.body.crud = 'select'; // select, insert, update, delete
      req.body.mapper_id = 'selectSwToolsList';

      router.use('/', dbconnect_Module);
      next('route');
    } catch (error) {
      console.log('Module > dbconnect error : ' + error);
    }
  }
});

module.exports = router;

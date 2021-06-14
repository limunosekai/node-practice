import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SoftwareList() {
  const [responseSwtoolList, setResponseSwtoolList] = useState('');
  const [appendSwtoolList, setAppendSwtoolList] = useState('');

  useEffect(() => {
    getSwToolList();
  }, []);

  const getSwToolList = async () => {
    axios
      .post('/api/Swtool?type=list')
      .then((res) => {
        try {
          setResponseSwtoolList(res);
          setAppendSwtoolList(SwToolListAppend());
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SwToolListAppend = () => {
    let result = [];
    const SwToolList = responseSwtoolList.data;

    for (let i = 0; i < SwToolList.json.length; i++) {
      let data = SwToolList.json[i];

      let date = data.reg_date;
      let year = date.substr(0, 4);
      let month = date.substr(4, 2);
      let day = date.substr(6, 2);
      let reg_date = `${year}.${month}.${day}`;

      result.push(
        <tr className='hidden_type'>
          <td>{data.swt_toolname}</td>
          <td>{data.swt_function}</td>
          <td>{reg_date}</td>
          <td>
            <Link
              to={'/AdminSoftwareView/' + data.swt_code}
              className='bt_c1 bt_c2 w50_b'
            >
              수정
            </Link>
            <a href='#n' className='bt_c1 w50_b'>
              삭제
            </a>
          </td>
        </tr>
      );
    }
    return result;
  };
  return (
    <section class='sub_wrap'>
      <article class='s_cnt mp_pro_li ct1 mp_pro_li_admin'>
        <div class='li_top'>
          <h2 class='s_tit1'>Software Tools 목록</h2>
          <div class='li_top_sch af'>
            <Link to={'/AdminSoftwareView/register'} className='sch_bt2 wi_au'>
              Tool 등록
            </Link>
          </div>
        </div>

        <div class='list_cont list_cont_admin'>
          <table class='table_ty1 ad_tlist'>
            <tr>
              <th>툴 이름</th>
              <th>기능</th>
              <th>등록일</th>
              <th>기능</th>
            </tr>
          </table>
          <table class='table_ty2 ad_tlist'>{appendSwtoolList}</table>
        </div>
      </article>
    </section>
  );
}

export default SoftwareList;

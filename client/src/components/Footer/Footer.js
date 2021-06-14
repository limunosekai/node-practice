import React from 'react';

function Footer(props) {
  return (
    <footer className='footer'>
      <ul>
        <li className='priv'>
          <a href='#n'>개인정보처리방침</a>
        </li>
        <li className='em_bt'>
          <a href='#n'>이메일주소무단수집거부</a>
        </li>
      </ul>
      <div className='ft_p'>
        <span>주소 : 서울시 관악구 신림동</span>
        <span>Tel : 02-1234-4252</span>
      </div>
      <p>COPYRIGHT &copy; React 200, ALL RIGHTS RESERVED.{props.name}</p>
    </footer>
  );
}

export default Footer;

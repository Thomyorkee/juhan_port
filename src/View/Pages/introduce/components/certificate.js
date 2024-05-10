const Certificate = () => {
  return (
    <div className="profile">
      <div className="cert_card" data-aos="fade-up" data-aos-duration={500}>
        <p className="cert_title">워드프로세서 1급</p>
        <div>
          <p>대한상공회의소</p>
          <p>2007, 02</p>
        </div>
      </div>
      <div className="cert_card" data-aos="fade-up" data-aos-duration={500}>
        <p className="cert_title">1종보통 운전면허</p>
        <div>
          <p>경찰청(운전면허시험관리단)</p>
          <p>2011, 09</p>
        </div>
      </div>
      <div className="cert_card" data-aos="fade-up" data-aos-duration={500}>
        <p className="cert_title">ACU(Autodesk Certified User)</p>
        <div>
          <p>Autodesk</p>
          <p>2019, 01</p>
        </div>
      </div>
      <div className="cert_card" data-aos="fade-up" data-aos-duration={500}>
        <p className="cert_title">정보처리기사</p>
        <div>
          <p>한국산업인력공단</p>
          <p>2019, 09</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;

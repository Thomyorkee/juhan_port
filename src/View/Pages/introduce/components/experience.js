const Experience = () => {
  return (
    <div className="profile">
      <div className="ex_card" data-aos="fade-up" data-aos-duration={500}>
        <div className="ex_title">
          <span>밴드동아리 회장</span>
          <span>2012, 03 ~ 2012, 12</span>
        </div>
        <p>
          교내 밴드동아리의 회장역을 맡으며 악기교육 및 매 학기 축제에 공연을
          주최하여, 다른 사람에게 내가 아는 무언가를 알려주는 즐거움, 책임감,
          리더십을 배울 수 있었습니다.
        </p>
      </div>
      <div className="ex_card" data-aos="fade-up" data-aos-duration={500}>
        <div className="ex_title">
          <span>중국 서안 어학연수</span>
          <span>2017, 06 ~ 2018, 08</span>
        </div>
        <p>
          중국 서안 어학연수를 통해 많은 나라의 친구들과 교류하며 좀 더 넓은
          시각을 가질 수 있었고, 외국인에 대한 두려움을 극복할 수 있었습니다.
          또한 가장 큰 성과로는 비약적으로 발전한 중국어 실력이라고 할 수
          있겠습니다.
        </p>
      </div>
    </div>
  );
};

export default Experience;

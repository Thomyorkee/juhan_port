import CapaCard from "View/Component/capaCard";

const Capability = () => {
  return (
    <div className="profile">
      <span className="card_title" data-aos="fade-in" data-aos-duration="500">
        능숙합니다
      </span>
      <div className="card_list">
        <CapaCard
          duration={100}
          imgSrc="/img/stack/react-svgrepo-com.svg"
          name="React.js"
        />
        <CapaCard
          duration={200}
          imgSrc="/img/stack/javascript.svg"
          name="JavaScript(ES6+)"
        />
        <CapaCard duration={300} imgSrc="/img/stack/html.svg" name="HTML5" />
        <CapaCard
          duration={400}
          imgSrc="/img/stack/sass-svgrepo-com.svg"
          name="SASS"
        />
        <CapaCard
          duration={500}
          imgSrc="/img/stack/ant-design-svgrepo-com.svg"
          name="Ant design"
        />
        <CapaCard
          duration={600}
          imgSrc="/img/stack/gitlab-svgrepo-com.svg"
          name="Gitlab"
        />
        <CapaCard
          duration={700}
          imgSrc="/img/stack/git-svgrepo-com.svg"
          name="Git"
        />
        <CapaCard
          duration={800}
          imgSrc="/img/stack/redux-svgrepo-com.svg"
          name="Redux"
        />
        <CapaCard
          duration={900}
          imgSrc="/img/stack/recoil-js-seeklogo.svg"
          name="Recoil"
        />
        <CapaCard
          duration={1000}
          imgSrc="/img/stack/react-query-seeklogo.svg"
          name="React query"
        />
        <CapaCard
          duration={1100}
          imgSrc="/img/stack/node-svgrepo-com.svg"
          name="Node.js"
        />
        <CapaCard
          duration={1200}
          imgSrc="/img/stack/postman-icon-svgrepo-com.svg"
          name="Postman"
        />
      </div>
      <span className="card_title" data-aos="fade-in" data-aos-duration="500">
        어느정도 다룰 수 있습니다
      </span>
      <div className="card_list">
        <CapaCard
          duration={100}
          imgSrc="/img/stack/nginx-svgrepo-com.svg"
          name="Nginx"
        />
        <CapaCard
          duration={200}
          imgSrc="/img/stack/docker-svgrepo-com.svg"
          name="Docker"
        />
        <CapaCard
          duration={300}
          imgSrc="/img/stack/jenkins-svgrepo-com.svg"
          name="Jenkins"
        />
        <CapaCard
          duration={400}
          imgSrc="/img/stack/python-svgrepo-com.svg"
          name="Python"
        />
        <CapaCard
          duration={500}
          imgSrc="/img/stack/elasticsearch-svgrepo-com.svg"
          name="Elastic search"
        />
        <CapaCard
          duration={600}
          imgSrc="/img/stack/logstash-svgrepo-com.svg"
          name="Logstash"
        />
        <CapaCard
          duration={700}
          imgSrc="/img/stack/mariadb-svgrepo-com.svg"
          name="MariaDB"
        />
        <CapaCard
          duration={800}
          imgSrc="/img/stack/mysql-svgrepo-com.svg"
          name="MySQL"
        />
        <CapaCard
          duration={900}
          imgSrc="/img/stack/swagger-svgrepo-com.svg"
          name="Swagger"
        />
      </div>
      <span className="card_title" data-aos="fade-in" data-aos-duration="500">
        경험해봤습니다
      </span>
      <div className="card_list">
        <CapaCard
          duration={100}
          imgSrc="/img/stack/three.svg"
          name="Three.js"
        />
        <CapaCard
          duration={200}
          imgSrc="/img/stack/typescript-official-svgrepo-com.svg"
          name="Typescript"
        />
        <CapaCard
          duration={300}
          imgSrc="/img/stack/android-icon-svgrepo-com.svg"
          name="Android"
        />
        <CapaCard
          duration={400}
          imgSrc="/img/stack/webpack-svgrepo-com.svg"
          name="Webpack"
        />
        <CapaCard
          duration={500}
          imgSrc="/img/stack/centos-icon-svgrepo-com.svg"
          name="CentOS"
        />
        <CapaCard
          duration={600}
          imgSrc="/img/stack/jira-svgrepo-com.svg"
          name="Jira"
        />
        <CapaCard
          duration={700}
          imgSrc="/img/stack/spring-svgrepo-com.svg"
          name="Springboot"
        />
        <CapaCard
          duration={800}
          imgSrc="/img/stack/amazonaws-svgrepo-com.svg"
          name="Amazon EC2"
        />
        <CapaCard
          duration={900}
          imgSrc="/img/stack/figma-svgrepo-com.svg"
          name="Figma"
        />
        <CapaCard
          duration={1100}
          imgSrc="/img/stack/react-svgrepo-com.svg"
          name="React Native"
        />
      </div>
    </div>
  );
};

export default Capability;

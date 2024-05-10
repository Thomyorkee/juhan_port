import "View/css/introduce.css";

const CapaCard = props => {
    const {name, imgSrc, duration} = props;
    
    return (
        <div className="capa_card" data-aos="fade-up" data-aos-duration={duration}>
            <img src={imgSrc} alt="N"/>
            {name}
        </div>
    )
}

export default CapaCard;
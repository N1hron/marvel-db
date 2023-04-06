import './appBanner.scss';
import avengers from "../../resources/img/avengers.png";
import avengersLogo from "../../resources/img/avengers-logo.png";

export default function AppBanner() {
    return (
        <section className="banner">
            <img src={avengers} alt="avengers" className="banner__bg-img"/>
            <div className="banner__text">
                New comics every week! <br/>
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="avengers-logo" className="banner__logo"/>
        </section>
    );
}
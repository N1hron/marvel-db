import './skeleton.scss';

function Skeleton() {
    return (
        <div className="about__skeleton">
            <p>Please select a character to see information</p>
            <div className="skeleton pulse">
                <div className="skeleton__row">
                    <div className="skeleton__circle"></div>
                    <div className="skeleton__line skeleton__line_thin"></div>
                </div>
                <div className="skeleton__row">
                    <div className="skeleton__line"></div>
                </div>
                <div className="skeleton__row">
                    <div className="skeleton__line"></div>
                </div>
                <div className="skeleton__row">
                    <div className="skeleton__line"></div>
                </div>
            </div>
        </div>
    );
}

export default Skeleton;
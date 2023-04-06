import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import './singleComicLayout.scss';

export default function SingleComicLayout({data}) {
    return (
        <section className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`Page with ${data.title} comic book`}
                />
                <title>{data.title}</title>
            </Helmet>
            <div className="single-comic__info">
                <img src={data.thumbnail} alt={data.title} className="single-comic__img"/>
                <div className="single-comic__text">
                    <p className="single-comic__text-title">{data.title}</p>
                    <p className="single-comic__text-description">
                        {data.description}
                    </p>
                    <p className="single-comic__text-pages">{data.pages ? data.pages + ' pages' : null}</p>
                    <p className="single-comic__text-language"> {data.language ? 'Language: ' + data.language : null}</p>
                    <p className="single-comic__text-price">{data.price ? data.price + '$' : 'NOT AVAILABLE'}</p>
                </div>
            </div>
            <div>
                <Link to='/comics' className="single-comic__back">Back to all</Link>
            </div>
        </section>
    )
}
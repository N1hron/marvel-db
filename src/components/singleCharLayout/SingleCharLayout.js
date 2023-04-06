import Helmet from 'react-helmet';

import './singleCharLayout.scss';

export default function SingleCharLayout({data}) {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content={`Page with ${data.name} info`}
                />
                <title>{data.name}</title>
            </Helmet>
            <section className="single-character">
                <img src={data.thumbnail} alt={data.name} className="single-character__img"/>
                <div className="single-character__text">
                    <p className="single-character__text-name">{data.name}</p>
                    <p className="single-character__text-description">
                        {data.description}
                    </p>
                </div>
            </section>
        </>
    )
}
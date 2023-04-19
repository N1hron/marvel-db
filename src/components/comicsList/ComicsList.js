import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import useMarvelServices from '../../services/MarvelServices';
import setListContent from '../../utils/setListContent';
import ReactLoading from 'react-loading';

import './comicsList.scss';
import '../../style/animations.scss';

export default function ComicsList() {
    const [comics, setComics] = useState([]),
          [initialLoading, setInitialLoading] = useState(true),
          [offset, setOffset] = useState(0);

    const {getComics, process, setProcess} = useMarvelServices();

    useEffect(() => {
        if (initialLoading) {
            updateComics();
        } 
    }, [])

    function updateComics() {
        getComics(offset)
            .then(result => {
                setComics([...comics, ...result]);
                setOffset(offset + 8);
                setInitialLoading(false);
            })
            .then(() => setProcess('confirmed'))
    }

    function renderComics(comics) {
        return comics.map((comic, i) => (
            <CSSTransition key={i} in={process === 'confirmed'} appear={true} timeout={300} classNames="appear">
                <Link tabIndex={0} to={`/comics/${comic.id}`}>
                        <img src={comic.thumbnail} alt={comic.title} className="catalog__product-image"/>
                        <div>
                            <p className="catalog__product-title">{comic.title}</p>
                            <p className="catalog__product-price">{comic.price ? comic.price + '$' : 'NOT AVAILABLE'}</p>
                        </div>
                </Link>
            </CSSTransition>
        ))
    }

    useEffect(() => {
        if (comics.length > 8 && process === 'confirmed') {
            window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [process])

    const content = useMemo(() => {
        return setListContent(process, () => renderComics(comics), initialLoading)
    }, [process])

    return(
        <section className="catalog">
            <div className="catalog__container">
                {content}
            </div>
            {initialLoading || process === 'error' ? null : 
            <button className="button button_red"
                    disabled={process === 'loading'}
                    onClick={updateComics}>
                    {process === 'loading' ? <ReactLoading type='cylon' width='50px' height='50px'/> : 'Load more'}
            </button>}
        </section>
    );
}
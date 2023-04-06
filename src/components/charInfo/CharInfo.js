import { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group'; 
import PropTypes from 'prop-types';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';
import SearchForm from '../searchForm/SearchForm';
import useMarvelServices from '../../services/MarvelServices';

import './charInfo.scss';

function setContent(process, Component, data) {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <Error/>;
        default:
    }
}

function CharInfo(props) {
    const [character, setCharacter] = useState(null);
          
    const {getCharacterById, process, setProcess} = useMarvelServices();

    useEffect(() => {
        updateChar();
    }, []) 

    useEffect(() => {
        updateChar();
    }, [props.charId]) 

    function updateChar() {
        const {charId} = props;
        if (!charId) {
            return;
        }

        getCharacterById(charId).then(character => setCharacter(character)).then(() => setProcess('confirmed'));
    }
    
        return (
            <div className="about">
                <div className="about__content">
                        <CSSTransition in={process === 'confirmed'} timeout={300} classNames="appear">
                            <div className="about__container">
                                {setContent(process, View, character)}
                            </div>
                        </CSSTransition>
                    <SearchForm/>
                </div>
            </div>
        );
}

function View({data}) {
    const {name, description, thumbnail, wiki, homepage} = data,
          comics = data.comics.slice(0, 15);
    
    return (
        <>
            <div className="about__header">
                <img src={thumbnail} alt={name} className="about__img"/>
                <div className="about__info">
                    <div className="about__name">{name}</div>
                    <div className="about__btns">
                        <a tabIndex={-1} href={homepage}><button className="button button_red">Homepage</button></a>
                        <a tabIndex={-1} href={wiki}><button className="button">Wiki</button></a>
                    </div>
                </div>
            </div>

            <div className="about__description">
                {description}
            </div>

            <h2>Comics:</h2>
            <div className="about__comics">
                <ul>
                    {comics.length > 0 ? 
                    comics.map((comic, i) => {
                        return <li key={i} className="comic">{comic.name}</li>;
                    }) 
                    : 'There is no comics here. Yet...'}
                </ul>
            </div>
        </>
    );
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;
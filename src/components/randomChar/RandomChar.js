import { useState, useEffect, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import useMarvelServices from '../../services/MarvelServices';
import ReactLoading from 'react-loading';
import setContent from '../../utils/setContent';

import './randomChar.scss';
import hammer from '../../resources/img/hammer-and-shield.png'


function RandomChar() {
    const [character, setCharacter] = useState({});
    const nodeRef = useRef(null);
    const {getCharacterById, process, setProcess} = useMarvelServices();

    useEffect(() => {
        updateCharacter();
    }, [])

    function updateCharacter() {
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        getCharacterById(id).then(character => setCharacter(character)).then(() => setProcess('confirmed'));
    }

    const charElement = useMemo(() => {
        return (
            <div ref={nodeRef} className="random-info__block">
                {setContent(process, View, character)}
            </div>
        )
    }, [process])
               
    return (
        <section className="random-info">
            <CSSTransition nodeRef={nodeRef} in={process === 'confirmed'} appear={true} timeout={300} classNames="appear">
                {charElement}
            </CSSTransition>
     
            <div className="random-info__static">
                <div className="random-info__static-text">
                    <p>
                        Random character for today! <br/>
                        Do you want to get to know him better?
                    </p>
                    <p>Or choose another one</p>
                </div>
                <button className="button button_red" disabled={process === 'loading'} onClick={updateCharacter}>
                    {process === 'loading' ? <ReactLoading type='cylon' width='50px' height='50px'/> : 'Try it'}
                </button>
                <img src={hammer} alt="hammer-and-shiled"/>
            </div>
        </section>
    );  
}

function View({data}) {
    const {name, description, thumbnail, homepage, wiki} = data;

    return (
        <>
            <div className="random-info__image">
            <img src={thumbnail} alt={name}/>
            </div>
            <div className="random-info__info">
                <div className="random-info__text">
                    <p className="random-info__name">{name}</p>
                    <p className="random-info__description">
                        {description ? (description.length > 220 ? description + '...' : description) : null}
                    </p>
                </div>
                <div className="random-info__btns">
                    <a className="button button_red" href={homepage}>Homepage</a>
                    <a className="button" href={wiki}>Wiki</a>
                </div>
            </div>
        </>
    )
}

export default RandomChar;
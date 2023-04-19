import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import setListContent from '../../utils/setListContent';
import useMarvelServices from '../../services/MarvelServices';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './charList.scss';
import '../../style/animations.scss';

function CharList({onCharSelected}) {
    const [characters, setCharacters] = useState([]),
          [offset, setOffset] = useState(210),
          [initialLoading, setInitialLoading] = useState(true),
          [charsEnded, setCharsEnded] = useState(false);

    const {getCharacters, process, setProcess} = useMarvelServices();

    const cardsRefs = useRef([]);
          
    useEffect(() => {
        if (initialLoading) {
            updateCharacters();
        }
    }, []) 

    function updateCharacters(offset) {
        getCharacters(offset)
            .then(characters => characters.map(character => {
                return {
                    name: character.name,
                    thumbnail: character.thumbnail,
                    id: character.id
                }
            }))
            .then(onLoaded);
    }

    async function onLoaded(newCharacters) {
        setCharacters([...characters, ...newCharacters]);
        setInitialLoading(false);
        setOffset(offset + 9);
        setCharsEnded(newCharacters.length < 9 ? true : false);
        setProcess('confirmed')
    }

    function setFocus(id) {
        cardsRefs.current.forEach(card => {
            card.style.transform = 'none';
            card.style.boxShadow = 'none';
        });
        cardsRefs.current[id].style.transition = 'all 0.15s';
        cardsRefs.current[id].style.transform = 'translateY(-6px)';
        cardsRefs.current[id].style.boxShadow = '0px 5px 20px #9F0013';
        cardsRefs.current[id].focus();
    }

    function renderCharacters(characters) {
        return characters.map((character, i) => {
            const {name, thumbnail, id} = character;
            return (
                <CSSTransition nodeRef={cardsRefs.current[i]} key={id} in={process === 'confirmed'} appear={true} timeout={300} classNames="appear">
                    <li className="cards__card"
                        ref={element => cardsRefs.current[i] = element}
                        tabIndex={0}  
                        onClick={() => {
                            onCharSelected(id);
                            setFocus(i);
                        }}
                        onKeyDown={(event) => {
                            if (event.key.match(/Enter/)) {
                                event.preventDefault();
                                onCharSelected(id);
                                setFocus(i);
                            }
                        }}>
                        
                        <img src={thumbnail} alt={name} className="card__img"/>
                        <p className="card__name">{name}</p>
                    </li>
                </CSSTransition>
            )
                   
        })
    }

    useEffect(() => {
        if (characters.length > 9 && process === 'confirmed') {
            window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [process])
    
    const content = useMemo(() => {
        return setListContent(process, () => renderCharacters(characters), initialLoading);
    }, [process])
    
    return (
        <div className="cards">
            <TransitionGroup className="cards__container" component="ul">
                {content}
            </TransitionGroup>
            {initialLoading || process === 'error' ? null :
            <button 
                className="button button_red" 
                disabled={process === 'loading'} 
                onClick={() => updateCharacters(offset)}
                style={{display: charsEnded ? 'none' : 'flex'}}>
                {process === 'loading' ? <ReactLoading type='cylon' width='50px' height='50px'/> : 'Load more'}
            </button>}
        </div>
    );
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;
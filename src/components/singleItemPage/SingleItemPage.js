import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useMarvelServices from '../../services/MarvelServices';
import SingleCharLayout from '../singleCharLayout/SingleCharLayout';
import SingleComicLayout from '../singleComicLayout/SingleComicLayout';
import setContent from '../../utils/setContent';
import { CSSTransition } from 'react-transition-group';

export default function Info({type}) {
    const [data, setData] = useState(null);
    const {getCharacterByName, getComicById, process, setProcess} = useMarvelServices();
    const {id} = useParams();

    function updateData() {
        switch(type) {
            case "character":
                return getCharacterByName(id);
            case "comic":
                return getComicById(id);
            default:
        }
    }

    useEffect(() => {
        updateData()
            .then(data => setData(data))
            .then(() => setProcess('confirmed'))
            .catch(() => setProcess('error'));
    }, [])

    function renderData() {
        switch(type) {
            case "character":
                return (<SingleCharLayout data={data}/>)
            case "comic":
                return (<SingleComicLayout data={data}/>)
            default:
        }
    }
    
    return (
        <CSSTransition in={process === 'confirmed'} appear={true} timeout={300} classNames="appear">
            {setContent(process, () => renderData(), data)}
        </CSSTransition>
    )
}
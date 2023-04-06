import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import AppBanner from '../appBanner/AppBanner';
import SingleItemPage from '../singleItemPage/SingleItemPage';

export default function SingleComicPage() { 
    const [inProp, setInProp] = useState(false);

    return (
        <>
            <AppBanner/>
            <CSSTransition in={inProp} timeout={300} classNames='appear-animated'>
                <SingleItemPage type='comic' setInProp={setInProp}/>
            </CSSTransition>
        </>
    );
}


import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import SingleItemPage from "../singleItemPage/SingleItemPage";
import AppBanner from "../appBanner/AppBanner";

export default function SingleCharPage() {
    const [inProp, setInProp] = useState(false);

    return (
        <>
            <AppBanner/>
            <CSSTransition in={inProp} timeout={300} classNames='animated'>
                <SingleItemPage type="character" setInProp={setInProp}/>
            </CSSTransition>
        </>
    )
}
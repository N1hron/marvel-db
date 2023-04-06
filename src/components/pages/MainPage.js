import { useState } from 'react';
import Helmet from 'react-helmet';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import visionBg from '../../resources/img/vision-bg.png';

export default function MainPage() {
    const [character, setCharacter] = useState(null);

    const onCharSelected = (id) => {
        setCharacter(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Web site created using create-react-app"
                />
                <title>Marvel DB</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <section className='characters'>
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={character} />
                </ErrorBoundary>
                <img className="background-img" src={visionBg} alt="vision" />
            </section>
        </>
        
    )
}
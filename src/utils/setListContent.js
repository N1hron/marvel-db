import Error from '../components/error/Error';
import Spinner from '../components/spinner/Spinner';

export default function setListContent(process, Component, initial) {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return initial ? <Spinner/> : <Component/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <Error/>;
        default:
    }
}
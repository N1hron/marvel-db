import Error from '../components/error/Error';
import Spinner from '../components/spinner/Spinner';

export default function setContent(process, Component, data) {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <Error/>;
        default:
    }
}
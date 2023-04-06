import { useState } from 'react';
import useMarvelServices from "../../services/MarvelServices";
import ReactLoading from 'react-loading';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import './searchForm.scss';

export default function SearchForm() {
    const [character, setCharacter] = useState(null);
    const {process, setProcess, getCharacterByName} = useMarvelServices();

    function findChar(name) {
        getCharacterByName(name)
            .then(onSuccess)
            .catch(() => setProcess('error'));
    }

    function onSuccess(result) {
        setCharacter(result);
        setProcess('confirmed')
    }

    return (
        <Formik
            initialValues={{name: ''}}
            validationSchema={Yup.object({
                name: Yup.string().required('This field is required')
            })}
            onSubmit={(values) => {
                findChar(values.name);
            }}>

            <Form className={"search " + (process === 'error' ? 'search_failure' : (process === 'confirmed' ? 'search_success' : ''))}>
                <p>Or find a character by name:</p>
                <div className="search__input">
                    <Field name="name" type="text" id="search" placeholder="Enter name"/>
                    <button 
                        type="submit" 
                        className="button button_red" 
                        disabled={process === 'loading'}>
                        {process === 'loading' ? <ReactLoading type='cylon' width='50px' height='50px'/> : 'Find'}
                    </button>
                </div>
                <ErrorMessage name="name" className="error" component='p'/>
                <div className="search-message">
                    <p>
                        {process === 'error' ? 'The character was not found. Check the name and try again' : 
                        (process === 'confirmed' ? `There is! Visit ${character.name} page?` : '')}
                    </p>
                    <Link to={character ? `/characters/${character.name}` : ''} className="button">To page</Link>
                </div>
            </Form>
        </Formik>
    )
}
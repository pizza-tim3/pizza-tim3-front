import {useState} from 'react';

const useForm = (callback) => {
    const [inputs, setInputs] = useState({});
    
    const handleSubmit = (e) => {
        if(e) {
            e.preventDefault();
        };
        // console.log(inputs, ':from')
        console.log('from useForm: ', inputs)
        callback();
    };

    const handleInputChange = (e) => {
        e.persist();
        setInputs(inputs => ( {...inputs, [e.target.name]: e.target.value} ));
    };

    return {
        handleSubmit,
        handleInputChange,
        inputs
    };
};

export default useForm
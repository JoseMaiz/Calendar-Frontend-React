import { useEffect, useMemo, useState } from "react";

export const useForm = (inicialForm = {}, formValidations = {}) => {


    const [formState, setFormState] = useState(inicialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    useEffect(() => {
        setFormState(inicialForm);
    }, [inicialForm]);

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys(formValidation)) {
            if(formValidation[formValue] !== null) return false;
        }

        return true;

    }, [formValidation])
    
    const onInputChange = ({target})=>{

        const {name,value} = target;
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const onResetForm = ()=>{
        setFormState(inicialForm);
    }

    const createValidators = ()=>{

        const formCheckedValues ={};

        Object.keys(formValidations).forEach(formField => {
            const [fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        });
    
        setFormValidation(formCheckedValues);
    }


    return{
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    }
}

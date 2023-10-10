import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import MotionGuestForms from "../components/MotionGuestForms";


const Signup = () => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$/;

  const [formInputValue, setFormInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  })

  const [entryError, setEntryError] = useState({
    emailError: "",
    passwordError: "",
    passwordConfirmationError: ""
  })

  const [signupError, setSignupError] = useState('');

  const {setUser, setToken} = useStateContext();

  const firstNameHandler = e => {
    setFormInputValue({
      ...formInputValue,
      firstName: e.target.value
    })
  }

  const lastNameHandler = e => {
    setFormInputValue({
      ...formInputValue,
      lastName: e.target.value
    })
  }

  const emailHandler = e => {
    setFormInputValue({
      ...formInputValue,
      email: e.target.value
    })
  }

    const emailErrorHandler = e => {
      setEntryError({
        ...entryError,
        emailError: (!emailRegex.test(e.target.value) && e.target.value.length > 0) &&
        "Adresse e-mail invalide"
      }) 
    }
          
  const passwordHandler = e => {
    setFormInputValue({
      ...formInputValue,
      password: e.target.value
    })
  }

    const passwordErrorHandler = e => {
      setEntryError({
        ...entryError,
        passwordError: (!passwordRegex.test(e.target.value) && e.target.value.length > 0) &&
        "Mot de passe: au moin une majuscule et > 8 caractères"
      })
    }

  const passwordConfirmationHandler = e => {
    setFormInputValue({
      ...formInputValue,
      passwordConfirmation: e.target.value
    })

    setEntryError({
      ...entryError,
      passwordConfirmationError: (e.target.value !== formInputValue.password && e.target.value.length > 0) &&
      "Le mot de passe doit être identique"
    })  
  }
  
  const signupSubmit = e => {
    e.preventDefault();
    const payload = {
      firstName: formInputValue.firstName,
      lastName: formInputValue.lastName,
      email: formInputValue.email,
      password: formInputValue.password
    }

    axiosClient.post("/signup", payload)
      .then(({data}) => {
        setUser(`${data.firstName}_${data.lastName}`);
        setToken(data.token);
      })
      .catch(error => {
        const response = error.response;
        if (response && response.status === 422) {
          if (response.data.errors.email) {
            setSignupError("Erreur lors de l'envoi du formulaire");
          }
        }
      })
    }

  return (
    <MotionGuestForms>
      <form 
        className="flex w-full py-4 px-8 flex-col gap-4 border-4 border-opacity-50 rounded-2xl border-b-violet-600 border-r-violet-600 border-l-cyan-400 border-t-cyan-400 bg-gray-700 bg-opacity-40 shadow-md"
        onSubmit={ signupSubmit }
      >
        <legend className="text-2xl text-zinc-50">
          Inscription
        </legend>
        <div className="text-xs h-1 text-red-700 mb-3">
            { signupError }
          </div>
        <div className="mb-2">
          <div className="mb-1 block">
            <Label
              className="text-zinc-50 text-xs"
              htmlFor="last-name"
              value="Nom"
            />
          </div>
          <TextInput
            id="last-name"
            required
            type="text"
            sizing="sm"
            value={ formInputValue.lastName }
            onChange={ lastNameHandler }
          />
        </div>
        <div className="mb-2">
          <div className="mb-1 block">
            <Label
              className="text-zinc-50 text-xs"
              htmlFor="first-name"
              value="Prénom"
            />
          </div>
          <TextInput
            id="first-name"
            required
            type="text"
            sizing="sm"
            value={ formInputValue.firstName }
            onChange={ firstNameHandler }
          />
        </div>
        <div className="mb-1">
          <div className="mb-1 block">
            <Label
              className="text-zinc-50 text-xs"
              htmlFor="email1"
              value="Adresse e-mail"
            />
          </div>
          <TextInput
            id="email1"
            placeholder="nom.prenom@taskplanner.com"
            required
            type="email"
            sizing="sm"
            value={ formInputValue.email }
            onChange={ emailHandler }
            onBlur={ emailErrorHandler }
          />
          <div className="text-xs h-1 text-red-700">
            { entryError.emailError }
          </div>
        </div>
        <div className="mb-1">
          <div className="mb-1 block">
            <Label
              className="text-zinc-50 text-xs"
              htmlFor="password1"
              value="Mot de passe"
            />
          </div>
          <div className="relative">
            <TextInput
              id="password1"
              required
              type="password"
              sizing="sm"
              value={ formInputValue.password }
              onChange={ passwordHandler }
              onBlur={ passwordErrorHandler }
            />
            <div className="text-xs h-1 text-red-700">
            { entryError.passwordError }
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-1 block">
            <Label
              className="text-zinc-50 text-xs"
              htmlFor="password2"
              value="Confirmer le mot de passe"
            />
          </div>
          <div className="relative">
            <TextInput
              id="password2"
              required
              type="password"
              sizing="sm"
              value={ formInputValue.passwordConfirmation }
              onChange={ passwordConfirmationHandler }
            />
            <div className="text-xs h-1 text-red-700">
            { entryError.passwordConfirmationError }
            </div>
          </div>
        </div>
        <div className="mb-7">
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            className="w-32 float-right bg-transparent">
            S'inscrire
          </Button>
        </div>
        <Link className="text-zinc-50 underline underline-offset-2 text-center" to="/login">Déjà inscrit? Connexion</Link>
      </form>
    </MotionGuestForms>
  )
}

export default Signup;
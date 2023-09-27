import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ShowPasswordIcon } from "../components/icons";
import MotionGuestForms from "../components/MotionGuestForms";


const Login = () => {

  const [passwordShow, setPasswordShow] = useState(false);

  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  }

  return (
    <>
      <MotionGuestForms>
        <form className="py-5 px-8 flex flex-col gap-4 border-4 border-opacity-50 rounded-2xl border-b-violet-600 border-r-violet-600 border-l-cyan-400 border-t-cyan-400 bg-gray-700 bg-opacity-40">
          <div>
            <img src="/logo/brand-logo.png"></img>
          </div>
          <div className="mb-10">
            <div className="mb-2 mt-5 block">
              <Label
                className="text-zinc-50"
                htmlFor="email1"
                value="Adresse e-mail"
              />
            </div>
            <TextInput
              id="email1"
              placeholder="nom.prenom@taskplanner.com"
              required
              type="email"
            />
          </div>
          <div className="mb-10">
            <div className="mb-2 block">
              <Label
                className="text-zinc-50"
                htmlFor="password1"
                value="Mot de passe"
              />
            </div>
            <div className="relative">
              <TextInput
                id="password1"
                required
                type={ passwordShow ? "text" : "password" }
              />
              <ShowPasswordIcon 
                onMouseEnter={ togglePassword }
                onMouseLeave={ togglePassword }
              />
            </div>
          </div>
          <div className="mb-10">
            <Button
              type="submit"
              gradientDuoTone="purpleToBlue"
              outline
              className="w-32 float-right">
              Connexion
            </Button>
          </div>
          <Link className="text-zinc-50 underline underline-offset-2 text-center" to="/signup">Créer un compte</Link>
        </form>
      </MotionGuestForms>
    </>
  )
}

export default Login;
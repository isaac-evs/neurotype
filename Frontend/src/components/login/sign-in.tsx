import { motion } from "motion/react";

interface ChildProps {
    onChange: () => void;
}

const SignIn: React.FC<ChildProps> = ({ onChange }) => {
    return (
        <motion.div
            className="h-full flex flex-col justify-around"
            initial={{ opacity: 0, x: -100 }} // Empieza invisible y desplazado a la izquierda
            animate={{ opacity: 1, x: 0 }} // Termina completamente visible y en su posición original
            transition={{
                duration: 0.8, // Duración de la animación en segundos
                ease: "easeOut", // Tipo de transición
            }}
        >
            <form action="" className="basis-1/2">
                <div className="text-[70px] m-2 text-black font-medium">
                    <p>Welcome Back</p>
                </div>
                <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 m-2"
                    autoComplete="off"
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 m-2"
                    autoComplete="off"
                    placeholder="Password"
                />
            </form>
            <div>
                <button className="bg-black hover:bg-gray-300 hover:text-black text-white text-base font-bold rounded-2xl py-2.5 px-5 transition-colors w-2/4 text-[19px] mb-4">
                    Log In
                </button>
                <p className="text-[19px] text-gray-400">
                    Don't have an Account?
                    <span className="text-black" onClick={onChange}>
                        Sign Up
                    </span>
                </p>
            </div>
        </motion.div>
    );
};

export default SignIn;

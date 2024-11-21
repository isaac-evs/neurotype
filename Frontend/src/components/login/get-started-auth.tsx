import { motion } from "motion/react";


interface ChildProps {
    onChange: () => void;
}

const GetStartedAuth: React.FC<ChildProps> = ({ onChange }) =>{
    return (
        <motion.div className="h-full flex flex-col justify-around"
            initial={{ opacity: 0, x: -100 }} // Empieza invisible y desplazado a la izquierda
            animate={{ opacity: 1, x: 0 }}   // Termina completamente visible y en su posición original
            transition={{
            duration: 0.8, // Duración de la animación en segundos
            ease: "easeOut", // Tipo de transición
            }}
        >
            <div className="">
                <button
                    type="button"
                    className="flex break-inside m-2 text-gray-400 text-2xl"
                    onClick={onChange}
                >
                    <div className="flex items-center justify-between flex-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-9"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.75 19.5 8.25 12l7.5-7.5"
                            />
                        </svg>
                        <span className="font-medium mx-3">Go Back</span>
                    </div>
                </button>
            </div>
            <form action="" className="basis-1/2">
                <div className="text-[70px] m-2 text-black font-medium">
                    <p>Get Started</p>
                </div>
                <div className="flex justify-start">
                    <input
                        type="text"
                        maxLength={1}
                        data-focus-input-init
                        data-focus-input-next="code-2"
                        id="code-1"
                        className="block h-40 w-24 m-2 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-full focus:ring-primary-500 focus:border-primary-500"
                        required
                    />
                    <input
                        type="text"
                        maxLength={1}
                        data-focus-input-init
                        data-focus-input-next="code-2"
                        id="code-2"
                        className="block h-40 w-24 m-2 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-full focus:ring-primary-500 focus:border-primary-500"
                        required
                    />
                    <input
                        type="text"
                        maxLength={1}
                        data-focus-input-init
                        data-focus-input-next="code-2"
                        id="code-3"
                        className="block h-40 w-24 m-2 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-full focus:ring-primary-500 focus:border-primary-500"
                        required
                    />
                    <input
                        type="text"
                        maxLength={1}
                        data-focus-input-init
                        data-focus-input-next="code-2"
                        id="code-4"
                        className="block h-40 w-24 m-2 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-full focus:ring-primary-500 focus:border-primary-500"
                        required
                    />
                </div>
                <p className="text-[19px] text-gray-400 my-4">
                    We send a code to your Email
                </p>
                <p className="text-[19px] text-gray-400 my-4">
                    Don't see it? Check your{" "}
                    <span className="text-black">Spam</span>
                </p>
            </form>
            <div>
                <button className="bg-black hover:bg-gray-300 hover:text-black text-white text-base font-bold rounded-2xl py-2.5 px-5 transition-colors w-2/4 text-[19px] mb-4">
                    Create Your Account
                </button>
                <p className="text-[19px] text-gray-400">
                    Already have an account?
                    <a href="/signup" className="text-black">
                        Log In
                    </a>
                </p>
            </div>
        </motion.div>
    );
}

export default GetStartedAuth;

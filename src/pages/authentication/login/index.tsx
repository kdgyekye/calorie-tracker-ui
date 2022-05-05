/* eslint-disable jsx-a11y/anchor-is-valid */
import { ApolloError, useMutation } from "@apollo/client";
import React, { Fragment, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LOGIN } from "../../../services/graphql/auth/mutations";
import {
	LoginInputProps,
	LoginOutputProps,
} from "../../../services/graphql/auth/types";
import _ from "lodash";
import { useAuthProvider } from "../../../services/context";
import logo from "../../../assets/images/logo.jpg";

const bgImage =
	"https://images.unsplash.com/photo-1590931510971-48d5bbc73ba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80";

const appName = process.env.REACT_APP_NAME;
const Login = () => {
	const [{ signIn, signOut }] = useAuthProvider();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loginInvoker, { loading }] = useMutation<
		LoginOutputProps,
		LoginInputProps
		>(LOGIN);

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			document.title = `Login | ${appName}`;
		}
		signOut();
		return () => {
			isMounted = false;
		};
	}, [signOut]);

	const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginInvoker({
			variables: {
				input: {
					email,
					password,
				}
			},
		})
			.then(async ({ data }) => {
				await signIn(data?.loginUser);
				return (window.location.pathname = "/");
			})
			.catch((e: ApolloError) => {
				toast.error(_.startCase(_.lowerCase(e?.graphQLErrors[0]?.message)));
			});
	};

	return (
		<Fragment>
			<div className="min-h-screen bg-white flex">
				<div className="hidden border-r-4 sm:hidden md:flex lg:block relative w-0 flex-1 focus:outline-none">
					<div className="flex flex-col">
						<img
							className="absolute inset-0  h-full w-full object-cover"
							src={bgImage}
							alt="backImage"
						/>
					</div>
				</div>

				<div className="flex-1 relative flex flex-col justify-center py-16 sm:px-2 w-3/12 lg:flex-none lg:mx-24 xl:mx-36">
					<div className="w-full">
						<div>
							<div className={"justify-center flex"}>
								<img className="h-32 w-auto mr-3" src={logo} alt="Workflow" />
							</div>
							<div className={`flex mt-8 flex-col space-y-2`}>
								<h2 className="text-3xl font-bold text-blue-800">
									Sign in to your account
								</h2>
							</div>
						</div>

						<div className="mt-4">
							<div className="mt-4">
								<form className={`space-y-7`} onSubmit={handleSubmit}>
									<div>
										<div className="mt-1 relative rounded-md shadow-sm">
											<div className="absolute inset-y-0 space-x-2 top-0 h-1/2 mt-2 flex w-full pl-3  items-center pointer-events-none">
                        <span className="text-sm font-light text-gray-400">
                          Email address
                        </span>
											</div>
											<input
												type="email"
												name="email"
												id="email"
												value={email}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => setEmail(event.target.value)}
												required
												className="focus:ring-blue-500 pl-3 p-3 rounded-md focus:border-blue-500 block focus:ring-0 w-full pt-9 sm:text-sm border-gray-300"
												placeholder="eg. johndoe@something.com"
											/>
										</div>
									</div>

									<div>
										<div className="mt-1 relative rounded-md shadow-sm">
											<div className="absolute inset-y-0 space-x-2 top-0 mt-2 h-1/2 flex w-full pl-3  items-center pointer-events-none">
                        <span className="text-sm font-light text-gray-400">
                          Password
                        </span>
											</div>
											<input
												type="password"
												required
												value={password}
												onChange={(
													event: React.ChangeEvent<HTMLInputElement>
												) => setPassword(event.target.value)}
												name="password"
												className="focus:ring-blue-500 pl-3 p-3 focus:ring-0 rounded-md focus:border-blue-500 block w-full pt-9 sm:text-sm border-gray-300"
												placeholder="eg. *******"
											/>
										</div>
									</div>

									<div className="flex items-center justify-between my-6">
										<div className="flex items-center">
											<input
												id="remember_me"
												name="remember_me"
												type="checkbox"
												className="h-4 w-4 text-blue-800 focus:ring-blue-800 border-gray-300 rounded"
											/>
											<label
												htmlFor="remember_me"
												className="ml-2 block text-sm text-gray-900"
											>
												Remember me
											</label>
										</div>

										<div className="text-sm">
											<Link
												to="/forgotpassword"
												className="font-light text-blue-800 hover:text-blue-900"
											>
												Forgot your password?
											</Link>
										</div>
									</div>

									<button
										type="submit"
										disabled={loading}
										className="px-20 font-light flex rounded-md  justify-center float-right h-12 py-3 border border-transparent  shadow-sm text-sm  text-white bg-blue-800 hover:bg-blue-900 focus:outline-none  focus:ring-offset-2 focus:ring-blue-700"
									>
										{loading ? "Logging in..." : "Login"}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;

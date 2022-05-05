export interface LoginInputProps {
	input: {
		email: string;
		password: string;
	};
}

export interface LoginOutputProps {
	loginUser: {
		token: string;
		admin: Admin;
	};
}

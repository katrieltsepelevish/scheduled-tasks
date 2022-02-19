import React, { FC } from 'react';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
	type: string;
	name: string;
	placeholder?: string;
	error: string;
	required?: boolean;
	rest?: Object;
}

const Input: FC<Props> = React.forwardRef(
	({ type, name, placeholder, error, ...rest }, ref: any) => {
		return (
			<div className='block text-left w-full'>
				<input
					className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
					type={type}
					name={name}
					placeholder={placeholder}
					ref={ref}
					{...rest}
				/>
				{error && (
					<p className='tw-block text-red-500 text-sm mt-1'>
						{error}
					</p>
				)}
			</div>
		);
	},
);

export default Input;

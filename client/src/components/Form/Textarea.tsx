import React, { FC } from 'react';

interface Props extends React.HTMLAttributes<HTMLTextAreaElement> {
	name: string;
	placeholder: string;
	error: string;
	required?: boolean;
	value?: string;
	rest?: Object;
}

const Textarea: FC<Props> = React.forwardRef(
	({ value, name, placeholder, error, ...rest }, ref: any) => {
		return (
			<div className='block w-full text-left'>
				<textarea
					className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
					name={name}
					placeholder={placeholder}
					ref={ref}
					{...rest}
				>
					{value}
				</textarea>
				{error && (
					<p className='tw-block text-red-500 text-sm mt-1'>
						{error}
					</p>
				)}
			</div>
		);
	},
);

export default Textarea;

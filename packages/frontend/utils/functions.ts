import { EMediaQuery } from "./enum";


export const mq = (mq: EMediaQuery, children: string, minOrMax = "max") => {
	return `@media only screen and (${minOrMax}-width: ${mq}) {
		${children}
	}`;
};
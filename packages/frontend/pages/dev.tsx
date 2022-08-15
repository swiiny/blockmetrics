import { FC } from 'react';
import Flex from '../styles/layout/Flex';
import Main from '../styles/layout/Main';
import Spacing from '../styles/layout/Spacing';
import BMBlockPattern from '../styles/theme/components/BMBlockPattern';
import BMButton from '../styles/theme/components/BMButton';
import BMCardContainer from '../styles/theme/components/BMCardContainer';
import BMGradientSeparator from '../styles/theme/components/BMGradientSeparator';
import BMHeading from '../styles/theme/components/BMHeading';
import BMHivePattern from '../styles/theme/components/BMHivePattern';
import BMIcon from '../styles/theme/components/BMIcon';
import BMLink from '../styles/theme/components/BMLink';
import BMText from '../styles/theme/components/BMText';
import { EFlex, EIcon, ESize, ETextType } from '../styles/theme/utils/enum';

const Dev: FC = () => {
	return (
		<>
			<Main noPaddingBottom>
				<Flex fullWidth direction={EFlex.column} vertical={EFlex.center} style={{ height: '80vh' }}>
					<Flex fullWidth horizontal={EFlex.start} vertical={EFlex.start} style={{ width: '50%' }}>
						<BMIcon type={EIcon.gas} size={ESize.l} />
						<Spacing size={ESize.s} />
						<BMIcon type={EIcon.gas} size={ESize.m} />
						<Spacing size={ESize.s} />
						<BMIcon type={EIcon.gas} size={ESize.s} />
						<Spacing size={ESize.xl} />
						<BMIcon type={EIcon.gas} size={ESize.l} backgroundVisible />
						<Spacing size={ESize.s} />
						<BMIcon type={EIcon.gas} size={ESize.m} backgroundVisible />
						<Spacing size={ESize.s} />
						<BMIcon type={EIcon.gas} size={ESize.s} backgroundVisible />
						<Spacing size={ESize.s} />
					</Flex>

					<Spacing size={ESize.s} />
					<Flex fullWidth horizontal={EFlex.start} vertical={EFlex.start} style={{ width: '50%' }}></Flex>
				</Flex>
			</Main>
		</>
	);
};

export default Dev;
